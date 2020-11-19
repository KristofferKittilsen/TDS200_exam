import nhost from "nhost-js-sdk";
import { isPlatform } from "@ionic/react";
import { Plugins } from "@capacitor/core";
import configData from "../config.json";

//Inpired by lectures

const { Storage } = Plugins;

let config;

if (isPlatform('capacitor')) {
  config = {
    base_url: configData.BASE_URL,
    use_cookies: false,
    client_storage: Storage,
    client_storage_type: "capacitor"
  };
} else {
  config = {
    base_url: configData.BASE_URL,
    use_cookies: false, //This is usually true, but I ran into a problem
    client_storage_type: "web"
  };
}

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };