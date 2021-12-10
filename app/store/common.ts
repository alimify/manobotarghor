import {decorate, action, observable} from "mobx";
import axios from "../services/axios";

class Common {
    ///STATES
    DIVISIONS = [];
    DISTRICT_BY_DIVISION = [];
    THANA_BY_DISTRICT = [];
    DOCTOR_HELP_TITLES = [];
    BLOOD_GROUPS = []


    //SETTERS
    setDivisions(data) {
        this.DIVISIONS = data;
        return this.DIVISIONS;
    }


    setDistrictByDivision(data) {
        this.DISTRICT_BY_DIVISION = data

        return this.DISTRICT_BY_DIVISION
    }


    setThanaByDistrict(data) {
        this.THANA_BY_DISTRICT = data
        return this.THANA_BY_DISTRICT
    }


    setDoctorHelpTitles(data) {
        this.DOCTOR_HELP_TITLES = data

        return this.DOCTOR_HELP_TITLES
    }

    setBloodGroups(data) {
        this.BLOOD_GROUPS = data
        return this.BLOOD_GROUPS
    }

    ///GETTERS

    async fetchDivisions(info = {}) {
        const response = await axios.get("api/common/divisions", {
                params: info
            }),
            data = response.data;
        return await this.setDivisions(data);
    }


    async fetchDistrictByDivision(info = {}) {

        const response = await axios.get("api/common/districtByDivision", {
                params: info
            }),
            data = response.data.type == 'success' ? response.data.results : [];

        return await this.setDistrictByDivision(data);
    }


    async fetchThanaByDistrict(info = {}) {

        const response = await axios.get("api/common/thanaByDistrict", {
                params: info
            }),
            data = response.data.type == 'success' ? response.data.results : [];

        return await this.setThanaByDistrict(data);
    }


    async fetchDoctorHelpTitles(info = {}) {
        const response = await axios.get('api/common/doctorHelpTitles', {
                params: info
            }),
            data = response.data

        return await this.setDoctorHelpTitles(data)
    }


    async fetchBloodGroups(info = {}) {
        const response = await axios.get('api/common/bloodGroups', {
            params: info
        })

        return await this.setBloodGroups(response.data)
    }

}

decorate(Common, {
    //STATES
    DIVISIONS: observable,
    DISTRICT_BY_DIVISION: observable,
    THANA_BY_DISTRICT: observable,
    DOCTOR_HELP_TITLES: observable,
    BLOOD_GROUPS: observable,

    //SETTERS
    setDivisions: action,
    setDistrictByDivision: action,
    setThanaByDistrict: action,
    setDoctorHelpTitles: action,
    setBloodGroups: action,

    ///GETTERS
    fetchDivisions: action,
    fetchDistrictByDivision: action,
    fetchThanaByDistrict: action,
    fetchDoctorHelpTitles: action,
    fetchBloodGroups: action

});

export default new Common();
