import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

import {config} from '../../config';
import * as colors from '../styling/Colors';

import BluetoothModule from '../bluetooth/BluetoothModule';

// Request to be set discoverable for 300 seconds
// BluetoothModule.setDiscoverable(300);
// Get the bluetooth mac address of this device
// BluetoothModule.getMAC(function(mac) {console.log(mac);});
// Scan for nearby bluetooth devices (takes ~12 seconds)
// BluetoothModule.getNearbyDevices(function(devices) {console.log(devices);});

export class BluetoothTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      mac: "0"
    };

    this.pressed = this.pressed.bind(this);
    this.pressed2 = this.pressed2.bind(this);
  }

  componentWillMount () {
    BluetoothModule.setDiscoverable(300);
  }

  pressed() {
    BluetoothModule.getMAC((mac)=>{
      this.setState({mac});
    });
  }

  pressed2() {
    BluetoothModule.getNearbyDevices((devices)=>{
      this.setState({devices});
    });
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>
          This is bluetooth test.
        </Text>
        <Text>
          mac: {this.state.mac}
        </Text>
        <Text>
          devices:
        </Text>
        {
          this.state.devices.map((e, i)=><Text>
            {e}
          </Text>)
        }
        <TouchableOpacity style={{width: 100, height: 100, backgroundColor: 'red'}} onPress={this.pressed}/>
        <TouchableOpacity style={{width: 100, height: 100, backgroundColor: 'blue'}} onPress={this.pressed2}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
