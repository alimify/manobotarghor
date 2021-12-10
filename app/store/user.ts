import {decorate, action, observable} from "mobx";
import axios from "../services/axios";

class User {
    ///STATES
    REGISTER = false;
    LOGIN = false;
    LOGOUT = false;
    USER = false;
    CHANGE_PASSWORD = false;
    CHANGE_IMAGE = false;
    DOCTOR_LISTS = []
    UPDATE_DOCTOR_TELEMEDICINE = null
    DOCTOR_TELEMEDICINE_DATA = null
    UPDATE_GENERAL_INFORMATION = null

    //SETTERS
    setRegister(data) {
        this.REGISTER = data

        return this.REGISTER
    }

    setLogin(data) {
        this.LOGIN = data;
        return this.LOGIN;
    }

    setLogout(data) {
        this.LOGOUT = data
        return this.LOGOUT
    }


    setUser(data) {
        this.USER = data
        return this.USER
    }


    setChangePassword(data) {
        this.CHANGE_PASSWORD = data
        return this.CHANGE_PASSWORD
    }


    setChangeImage(data) {
        this.CHANGE_IMAGE = data

        return this.CHANGE_IMAGE
    }

    setDoctorLists(data) {
        this.DOCTOR_LISTS = data

        return this.DOCTOR_LISTS
    }


    setUpdateTelemedicine(data) {
        this.UPDATE_DOCTOR_TELEMEDICINE = data

        return this.UPDATE_DOCTOR_TELEMEDICINE
    }


    setDoctorTelemedicineData(data) {
        this.DOCTOR_TELEMEDICINE_DATA = data
        return this.DOCTOR_TELEMEDICINE_DATA
    }


    setUpdateGeneralInformation(data) {
        this.UPDATE_GENERAL_INFORMATION = data

        return this.UPDATE_GENERAL_INFORMATION
    }

    ///GETTERS

    async fetchRegister(info) {
        const response = await axios.post('api/register', info),
            data = response.data

        return this.setRegister(data)
    }

    async fetchLogin(info) {
        const response = await axios.post("api/login", info),
            data = response.data;
        return await this.setLogin(data);
    }


    async fetchLogout(info = {}) {
        const response = await axios.post('api/logout', info),
            data = response.data

        return await this.setLogout(data)
    }


    async fetchUser(info = {}) {
        const response = await axios.get('api/user', {
                params: info
            }),

            data = response.data;

        return await this.setUser(data)
    }


    async fetchChangePassword(info) {
        // changePassword
        const response = await axios.post('api/user/changePassword', info),

            data = response.data;

        return await this.setChangePassword(data)

    }


    async fetchChangeImage(info) {
        const response = await axios.post('api/user/changeImage', info),
            data = response.data;

        return await this.setChangeImage(data)
    }


    async fetchDoctorLists(info = {}) {

        const response = await axios.get('api/user/doctorLists', {
                params: info
            }),

            data = response.data;

        return await this.setDoctorLists(data)
    }


    async fetchUpdateTelemedicine(info = {}) {
        const response = await axios.post('api/user/updateTelemedicineStatus', info),
            data = response.data

        return await this.setUpdateTelemedicine(data)
    }

    async fetchDoctorTelemedicineData(info = {}) {
        const response = await axios.post('api/user/updateTelemedicineData', info),
            data = response.data

        return await this.setDoctorTelemedicineData(data)
    }


    async fetchUpdateGeneralInformation(info) {
        const response = await axios.post('api/user/updateProfile', info)

        return await this.setUpdateGeneralInformation(response.data)
    }

}

decorate(User, {
    //STATES
    REGISTER: observable,
    LOGIN: observable,
    LOGOUT: observable,
    USER: observable,
    CHANGE_PASSWORD: observable,
    CHANGE_IMAGE: observable,
    DOCTOR_LISTS: observable,
    UPDATE_DOCTOR_TELEMEDICINE: observable,
    DOCTOR_TELEMEDICINE_DATA: observable,
    UPDATE_GENERAL_INFORMATION: observable,

    //SETTERS
    setRegister: action,
    setLogin: action,
    setLogout: action,
    setUser: action,
    setChangePassword: action,
    setChangeImage: action,
    setDoctorLists: action,
    setUpdateTelemedicine: action,
    setDoctorTelemedicineData: action,
    setUpdateGeneralInformation: action,

    ///GETTERS
    fetchRegister: action,
    fetchLogin: action,
    fetchLogout: action,
    fetchUser: action,
    fetchChangePassword: action,
    fetchChangeImage: action,
    fetchDoctorLists: action,
    fetchUpdateTelemedicine: action,
    fetchDoctorTelemedicineData: action,
    fetchUpdateGeneralInformation: action

});

export default new User();
