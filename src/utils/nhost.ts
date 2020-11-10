import nhost from "nhost-js-sdk";
import configData from "../config.json"

const config = {
    base_url: configData.BASE_URL
};

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export {auth, storage};


