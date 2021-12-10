import {decorate, action, observable} from "mobx";
import axios from "../services/axios";

class Food {

    ///STATES
    PROJECT_LISTS = [];
    STORE_FOOD_DONATION = null
    STORE_MONEY_DONATION = null
    SELF_DONATION = []


    //SETTERS
    setProjectLists(state) {
        this.PROJECT_LISTS = state

        return this.PROJECT_LISTS
    }


    setStoreFoodDonation(state) {
        this.STORE_FOOD_DONATION = state

        return this.STORE_FOOD_DONATION
    }


    setStoreMoneyDonation(state) {
        this.STORE_MONEY_DONATION = state

        return this.STORE_MONEY_DONATION
    }


    setSelfDonation(state) {

        this.SELF_DONATION = state

        return this.SELF_DONATION
    }


    //GETTERS
    async fetchProjectLists(info = {}) {
        const response = await axios.get('api/food/projectList', {
            params: info
        })

        return this.setProjectLists(response.data)
    }


    async fetchStoreFoodDonation(info = {}) {
        const response = await axios.post('api/food/storeFoodDonation', info)

        return this.setStoreFoodDonation(response.data)
    }


    async fetchStoreMoneyDonation(info = {}) {
        const response = await axios.post('api/food/storeMoneyDonation', info)

        return this.setStoreMoneyDonation(response.data)
    }


    async fetchSelfDonation(info = {}) {
        const response = await axios.get('api/food/selfDonation', {
            params: info
        })

        return this.setSelfDonation(response.data)
    }

}

decorate(Food, {

    ///STATE
    PROJECT_LISTS: observable,
    STORE_FOOD_DONATION: observable,
    STORE_MONEY_DONATION: observable,
    SELF_DONATION: observable,

    ///SETTERS
    setProjectLists: action,
    setStoreFoodDonation: action,
    setStoreMoneyDonation: action,
    setSelfDonation: action,

    //GETTERS
    fetchProjectLists: action,
    fetchStoreFoodDonation: action,
    fetchStoreMoneyDonation: action,
    fetchSelfDonation: action
});

export default new Food();
