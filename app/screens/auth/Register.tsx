import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Picker,
    Button,
    ActivityIndicator,
    ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";
import {inject, observer} from "mobx-react";
import Constants from "expo-constants";
import DefaultStyles from "../../constants/DefaultStyles"
import storage from "../../services/asyncStorage";
import * as Location from 'expo-location';
import Spinner from '../../components/helpers/Spinner'
import Colors from "../../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";

const RegisterScreen = props => {

    const [getName, setName] = useState(''),
        [getPhone, setPhone] = useState(''),
        [getOrganisation, setOrganisation] = useState(''),
        [getPassword, setPassword] = useState(''),
        [getPassword2, setPassword2] = useState(''),
        [getRole, setRole] = useState(3),
        [getLoading, setLoading] = useState(false),
        {user} = props.store,
        [selfLocation, setSelfLocation] = useState({}),
        [getInputColor1, setInputColor1] = useState("#e8e8e8"),
        [getInputColor2, setInputColor2] = useState("#e8e8e8"),
        [formSubmit, setFormSubmit] = useState(false);


    useEffect(() => {
        (async () => {

            setLoading(true)
            try {
                await user.fetchUser()

            } catch {
                await storage.clear('token')
            }
            setLoading(false)

            const loationServiceEnable = await Location.hasServicesEnabledAsync();

            if (loationServiceEnable) {
                const locationPermission = await Location.getPermissionsAsync(),
                    locationCanAsk = locationPermission.hasOwnProperty('canAskAgain') ? locationPermission : false;
                //    locationGranted = locationPermission.hasOwnProperty('granted') ? locationPermission.granted : false

                if (locationCanAsk) {
                    let {status} = await Location.requestPermissionsAsync();
                    if (status !== 'granted') {

                    }
                    let location = await Location.getCurrentPositionAsync({});
                    await storage.set("location", JSON.stringify(location));
                    const storageLocation = await storage.get('location')
                    setSelfLocation(JSON.parse(storageLocation))
                }
            }


        })();
    }, [setLoading, user]);


    if (getLoading) {
        return (<Spinner/>);
    } else if (!getLoading && user.REGISTER && user.USER) {

        setTimeout(() => {
            user.setRegister(false)
            props.navigation.navigate('EditProfile')
        }, 100)

        return (<View style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size="large"
                               color="#FBA939"/>
            <Text>{user.REGISTER.messages}</Text>
        </View>)

    }

    return (
        <KeyboardAvoidingView behavior={'height'}>

            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{...DefaultStyles.halfBody}}>
                    <View style={{marginTop: 5, marginHorizontal: 20}}>
                        <Text style={{...DefaultStyles.inputTitle }}>নাম</Text>
                        <TextInput
                            onChangeText={setName}
                            style={{
                                borderColor: (formSubmit && !getName) || user.REGISTER
                                && user.REGISTER.type != 'missing'
                                && user.REGISTER.messages.hasOwnProperty('name')
                                    ? 'red' : 'white',
                                ...DefaultStyles.inputFieldSam
                            }}
                            placeholder="  নাম  "
                            autoCompleteType="off"
                            value={getName}
                        />

                        <Text style={{...DefaultStyles.inputTitle }}>ফোন </Text>
                        <TextInput onChangeText={setPhone}
                                   placeholder="  ফোন  "
                                   style={{
                                       borderColor: (formSubmit && !getPhone) || user.REGISTER
                                       && user.REGISTER.type != 'missing'
                                       && user.REGISTER.messages.hasOwnProperty('phone')
                                           ? 'red' : 'white',
                                       ...DefaultStyles.inputFieldSam
                                   }}
                                   value={getPhone}/>

                        <Text style={{...DefaultStyles.inputTitle }}>অর্গানাইজেশন /  রেফারেন্স  </Text>
                        <TextInput onChangeText={setOrganisation}
                                   placeholder="  অর্গানাইজেশন /  রেফারেন্স   "
                                   style={{
                                       borderColor: (formSubmit && !getOrganisation) || user.REGISTER
                                       && user.REGISTER.type != 'missing'
                                       && user.REGISTER.messages.hasOwnProperty('organisation')
                                           ? 'red' : 'white',
                                       ...DefaultStyles.inputFieldSam
                                   }}
                                   value={getOrganisation}/>

                        <Text style={{...DefaultStyles.inputTitle }}>পাসওয়ার্ড </Text>
                        <TextInput onChangeText={setPassword}
                                   placeholder="  পাসওয়ার্ড  "
                                   style={{
                                       borderColor: (formSubmit && !getPassword) || user.REGISTER
                                       && user.REGISTER.type != 'missing'
                                       && user.REGISTER.messages.hasOwnProperty('password')
                                           ? 'red' : 'white',
                                       ...DefaultStyles.inputFieldSam
                                   }}
                                   secureTextEntry={true}
                                   value={getPassword}/>

                        <Text style={{...DefaultStyles.inputTitle }}>পাসওয়ার্ড  নিশ্চিতকরণ </Text>
                        <TextInput onChangeText={setPassword2}
                                   placeholder="  পাসওয়ার্ড  নিশ্চিতকরণ "
                                   style={{
                                       // borderWidth: 1,
                                       borderColor: formSubmit && getPassword && getPassword != getPassword2 ? 'red' : 'white',
                                       ...DefaultStyles.inputFieldSam
                                   }}
                                   secureTextEntry={true}
                                   value={getPassword2}/>

                        <Text style={{...DefaultStyles.inputTitle }}>কি  হিসেবে  নিবন্ধন  করতে  চান?  </Text>
                        <Picker
                            selectedValue={getRole}
                            style={{height: 50, width: 150, marginBottom: 30}}
                            onValueChange={(itemValue, itemIndex) => {
                                setRole(itemValue)
                            }}
                            itemStyle={{
                                backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17
                            }}
                        >
                            <Picker.Item label="সেচ্ছাসেবক" value="3"/>
                            <Picker.Item label="সাহায্যকারী/ডাক্তার" value="4"/>
                            <Picker.Item label="সাহায্যপ্রার্থী" value="5"/>
                        </Picker>

                        <TouchableOpacity onPress={async () => {
                            setFormSubmit(true)

                            const usr = {
                                name: getName,
                                phone: getPhone,
                                password: getPassword,
                                password_confirmation: getPassword2,
                                organisation: getOrganisation,
                                role_id: getRole,
                                device_name: Constants.deviceName,
                                lng: selfLocation.hasOwnProperty('coords') ? selfLocation.coords.longitude : null,
                                lat: selfLocation.hasOwnProperty('coords') ? selfLocation.coords.latitude : null
                            }


                            const isEmpty = !Object.values(usr).some(x => (x !== null && x !== ''));

                            if (!isEmpty) {
                                setLoading(true)
                                await user.fetchRegister(usr)

                                if (user.REGISTER && user.REGISTER.type == 'success') {
                                    await storage.set('token', user.REGISTER.token)
                                    await user.fetchUser()
                                }
                                setLoading(false)
                            }

                        }} style={{width: 150, alignItems: 'center', alignContent: 'center', textAlign: 'center'}}>

                            <View style={{flex: 1, ...DefaultStyles.w150}}>
                                <LinearGradient style={{flex: 1, borderRadius: 5}}
                                                colors={['#21a81b', '#99d151']}
                                                start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}>
                                    <Text style={{...DefaultStyles.gradientBtn, textAlign: 'center'}}>
                                         নিবন্ধন  করুন
                                    </Text>
                                </LinearGradient>
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    );
};


RegisterScreen.navigationOptions = navData => {
    return {
        headerTitle: () => (
            <Text style={DefaultStyles.headerTitle}>নিবন্ধন</Text>
        )
    };
};

const styles = StyleSheet.create({
    errorNotification: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 5,
        marginTop: -8
    }

});

export default inject("store")(observer(RegisterScreen));
