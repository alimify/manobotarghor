import {decorate, action, observable} from "mobx";
import axios from "../services/axios";

class Money {

    ///STATES
    LISTS = [];
    MONEY_REQUEST = false;
    UPDATE_MONEY_PROVIDER = false;
    MONEY_REQUEST_DETAILS = null;
    REQUEST_PUBLISH = null


    //SETTERS
    setLists(state) {
        this.LISTS = state

        return this.LISTS
    }

    setMoneyRequest(state) {
        return this.MONEY_REQUEST = state
    }

    setUpdateMoneyProvider(state) {
        return this.UPDATE_MONEY_PROVIDER = state
    }

    setMoneyRequestDetails(state) {
        this.MONEY_REQUEST_DETAILS = state

        return this.MONEY_REQUEST_DETAILS
    }

    setRequestPublish(state) {
        this.REQUEST_PUBLISH = state

        return this.REQUEST_PUBLISH
    }


    //GETTERS
    async fetchLists(info = {}) {
        const response = await axios.get('api/money/list', {
            params: info
        })

        return this.setLists(response.data)
    }


    async fetchMoneyRequest(info = {}) {

        const response = await axios.post('api/money/request', info)

        console.log(response.data)

        return this.setMoneyRequest(response.data)
    }


    async fetchUpdateMoneyProvider(info) {

        const response = await axios.post('api/money/request/providerUpdate', info)

        return this.setUpdateMoneyProvider(response.data)
    }


    async fetchMoneyRequestDetails(info = {}) {
        const response = await axios.get('api/money/requestDetails', {
            params: info
        })

        // console.log(response.data,'requestDetails')

        return await this.setMoneyRequestDetails(response.data)
    }

    async fetchRequestPublish(info = {}) {
        const response = await axios.post('api/money/request/publish', info)


        // console.log(response.data,'published')

        return await this.setRequestPublish(response.data)
    }


}

decorate(Money, {

    ///STATE
    LISTS: observable,
    MONEY_REQUEST: observable,
    UPDATE_MONEY_PROVIDER: observable,
    MONEY_REQUEST_DETAILS: observable,
    REQUEST_PUBLISH: observable,

    ///SETTERS
    setLists: action,
    setMoneyRequest: action,
    setUpdateMoneyProvider: action,
    setMoneyRequestDetails: action,
    setRequestPublish: action,

    //GETTERS
    fetchLists: action,
    fetchMoneyRequest: action,
    fetchUpdateMoneyProvider: action,
    fetchMoneyRequestDetails: action,
    fetchRequestPublish: action

});

export default new Money();
