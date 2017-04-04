package com.flses;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothClass;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;

import java.util.Map;
import java.util.HashMap;

public class BluetoothModule extends ReactContextBaseJavaModule {

  private final BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

  public BluetoothModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "BluetoothModule";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    return constants;
  }

  private void initReceiver(final Callback callback) {
    // Request COURSE_LOCATION permissions
    int MY_PERMISSIONS_REQUEST_ACCESS_COARSE_LOCATION = 1;
    ActivityCompat.requestPermissions(getCurrentActivity(),
            new String[]{Manifest.permission.ACCESS_COARSE_LOCATION},
            MY_PERMISSIONS_REQUEST_ACCESS_COARSE_LOCATION);

    // Enable bluetooth
    if (!mBluetoothAdapter.isEnabled()) {
        mBluetoothAdapter.enable();
    }

    // Create the broadcast receiver
    BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
      private WritableArray mNearbyDevices = Arguments.createArray();

      @Override
      public void onReceive(Context context, Intent intent) {
        final String action = intent.getAction();

        if (action.equals(BluetoothAdapter.ACTION_DISCOVERY_STARTED)) {
          Log.i(getName(), "Starting discovery");

          // When discovery starts, clear the nearby devices array
          mNearbyDevices = Arguments.createArray();
        } else if (action.equals(BluetoothAdapter.ACTION_DISCOVERY_FINISHED)) {
          Log.i(getName(), "Finished discovery, calling callback");

          // When discovery is finished, call the callback with the nearby devices
          // and then unregister the receiver
          callback.invoke(mNearbyDevices);
          getReactApplicationContext().unregisterReceiver(this);
        } else if (action.equals(BluetoothDevice.ACTION_FOUND)) {
          BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
          BluetoothClass clazz = intent.getParcelableExtra(BluetoothDevice.EXTRA_CLASS);

          // Gather the bluetooth info
          String macAddress = device.getAddress();
          String deviceName = device.getName();
          String classString = clazz.toString();
          String name = intent.getStringExtra(BluetoothDevice.EXTRA_NAME);
          short RSSI = intent.getShortExtra(BluetoothDevice.EXTRA_RSSI, (short) -1);

          // Add the mac address to the list to be returned
          mNearbyDevices.pushString(macAddress);

          Log.i(getName(), "Found device: " + macAddress);
        }
      }
    };

    IntentFilter filter = new IntentFilter();
    filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_STARTED);
    filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
    filter.addAction(BluetoothDevice.ACTION_FOUND);
    getReactApplicationContext().registerReceiver(broadcastReceiver, filter);
  }

  @ReactMethod
  public void setDiscoverable(int seconds) {
    Log.i(getName(), "setDiscoverable");

    // Request permission to make this device discoverable for some time
    Intent discoverableIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
    discoverableIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    discoverableIntent.putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, seconds);
    getReactApplicationContext().startActivity(discoverableIntent);
  }

  @ReactMethod
  public void getMAC(Callback callback) {
    Log.i(getName(), "getMAC");

    // Get the MAC address of this device and return it
    String MAC = android.provider.Settings.Secure.getString(
            getReactApplicationContext().getContentResolver(),
            "bluetooth_address");
    callback.invoke(MAC);
  }

  @ReactMethod
  public void getNearbyDevices(Callback callback) {
    Log.i(getName(), "getNearbyDevices");

    // Must cancel any previous discovery before we can start
    mBluetoothAdapter.cancelDiscovery();
    // Register a receiver to listen for bluetooth events
    initReceiver(callback);
    mBluetoothAdapter.startDiscovery();
  }

  @ReactMethod
  public void cancelScan() {
    mBluetoothAdapter.cancelDiscovery();
  }
}
