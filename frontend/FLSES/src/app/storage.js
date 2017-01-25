import {AsyncStorage} from "react-native";


export const storage = {
  keys: {
    apiToken: "apiToken",
  },
  getApiToken: () => AsyncStorage.getItem(storage.keys.apiToken),
  setApiToken: token => AsyncStorage.setItem(storage.keys.apiToken, token),
  clearApiToken: () => AsyncStorage.removeItem(storage.keys.apiToken),
};