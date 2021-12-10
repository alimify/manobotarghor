import {decorate, action, observable} from "mobx";
import axios from "../services/axios";

class Food {

    ///STATES
    SHURJOPAY_REQUEST = [];


    //SETTERS
    setShurjopayRequest(state) {
        this.SHURJOPAY_REQUEST = state

        return this.SHURJOPAY_REQUEST
    }


    //GETTERS
    async fetchShurjopayRequest(info = {}) {
        const response = await axios.post('api/payment/shurjopay', info)

        return this.setShurjopayRequest(response.data)
    }


}

decorate(Food, {

    ///STATE
    SHURJOPAY_REQUEST: observable,

    ///SETTERS
    setShurjopayRequest: action,

    //GETTERS
    fetchShurjopayRequest: action,
});

export default new Food();
