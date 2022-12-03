import AsyncStorage from "@react-native-async-storage/async-storage";

const setData = async (key: KEYS, value: string) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log("setData", e);
    }
};


const getData = async (key: KEYS) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (e) {
        console.log("getData===>>", e);
    }
};



enum KEYS {
    API = '@API'
};


const STORAGE = {
    setData,
    getData,
    KEYS
};


export default STORAGE;