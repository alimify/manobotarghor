import axios from 'axios'
import storage from './asyncStorage'
import Constants from "expo-constants";
import Config from './config'


const access_token = '',
    self_token = Constants.deviceId


var axiosInstance = axios.create({
    baseURL: Config.apiURI,
    headers: {
        Accept: 'application/json',
        //  'Content-Type': 'multipart/form-data; boundary=---------------------------974767299852498929531610575'
    }
});

// axiosInstance.defaults.headers.common["Content-Type"] = "multipart/form-data";


class axioInstance {

    private axios
    private self_token
    private params
    private method

    constructor(axios, self_token) {
        this.axios = axios
        this.self_token = self_token
    }

    async get(uri, info) {
        this.params = info
        this.method = 'get'
        const params = this.mergeParams()

        const token = await storage.get('token')
        this.axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        console.log(uri, params, 'thegetmethod')


        let res = await this.axios.get(uri, params);

        // console.log(res,'thegetresult')

        return res
    }

    async post(uri, info) {
        this.params = info
        this.method = 'post'
        const params = this.mergeParams()

        const token = await storage.get("token");
        this.axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        console.log(uri, params, info, 'thepostmethod')

        const result = await this.axios.post(uri, params)
        // console.log(result.data,'thepostresult')

        return result;
    }

    mergeParams() {
        let params
        if (this.method == 'get') {

            const exitingParams = this.params && this.params.params ? this.params.params : {}

            params = {
                params: {
                    ...exitingParams,
                    ...{
                        self_token: this.self_token
                    }
                }
            }
        } else if (this.method == 'post') {
            params = {
                ...this.params,
                ...{
                    self_token: this.self_token
                }
            }
        }
        return params
    }


}


export default new axioInstance(axiosInstance, self_token);