import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    View,
    ScrollView,
    ImageBackground,
    Picker,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {AntDesign} from "@expo/vector-icons";
import Colors from '../../constants/Colors'
import storage from "../../services/asyncStorage";
import DefaultStyles from '../../constants/DefaultStyles'
import DefaultFunc from '../../constants/DefaultFunc'
import Spinner from "../../components/helpers/Spinner";
import DateTimePicker from '@react-native-community/datetimepicker';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Checkbox, RadioButton} from 'react-native-paper';
import * as Location from 'expo-location';
import {LinearGradient} from "expo-linear-gradient";

class EditProfile extends React.Component {
    state = {
        name: null,
        phone: null,
        email: null,
        fb_link: null,
        organisation: null,
        gender: null,
        birthday: null,
        blood_group: null,
        blood_donate: false,
        blood_donation_date: null,
        division: null,
        district: null,
        location: null,
        full_address: null,
        lat: null,
        lng: null,
        birthDatePickerShow: false,
        bloodhDatePickerShow: false,
        selfLocation: null,
        loading: false
    };
    constructor(props) {
        super(props);
    }
    render() {
        const {common, user} = this.props.store;
        if (this.state.loading) {
            return (<Spinner/>)
        }
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{}}>
                    <View style={{padding: 10}}>
                        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={40}>
                            {this.errorMSG(user.UPDATE_GENERAL_INFORMATION)}
                            <ScrollView style={{padding: 10}}>
                                <View style={{...DefaultStyles.fieldSet, ...DefaultStyles.w98, padding: 10}}>
                                    <Text style={{...DefaultStyles.legend}}> ব্যাক্তিগত অথ্যাদি পূরণ করুন</Text>
                                    <Text></Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: Colors.baseColor1,
                                        textAlign: "center", ...DefaultStyles.w80
                                    }}>
                                        আপনার সম্পর্কে জানতে ও সহজে যোগাযোগ করতে ব্যাক্তিগত তথ্য গুলো লিখুন
                                    </Text>
                                    <Text></Text>
                                    <View style={DefaultStyles.flexContainer}>
                                        <View style={{...DefaultStyles.w48, ...DefaultStyles.mr2}}>
                                            <Text style={{...DefaultStyles.inputTitle}}>নাম</Text>
                                            <TextInput
                                                onChangeText={(value) => {
                                                    this.setState({
                                                        name: value,
                                                    });
                                                }}
                                                value={this.state.name}
                                                style={{
                                                    borderColor: user.UPDATE_GENERAL_INFORMATION?.type == 'missing'
                                                    && user.UPDATE_GENERAL_INFORMATION?.messages?.name ? 'red' : "white",
                                                    borderWidth: 1,
                                                    ...DefaultStyles.inputField,
                                                    ...DefaultStyles.inputFieldBordered
                                                }}
                                                placeholder="নাম"
                                            />
                                        </View>
                                        <View style={{...DefaultStyles.w48, ...DefaultStyles.ml2}}>
                                            <Text style={{...DefaultStyles.inputTitle}}>ফোন</Text>
                                            <TextInput
                                                onChangeText={(value) => {
                                                    this.setState({
                                                        phone: value,
                                                    });
                                                }}
                                                value={this.state.phone}
                                                style={{
                                                    borderColor: user.UPDATE_GENERAL_INFORMATION?.type == 'missing'
                                                    && user.UPDATE_GENERAL_INFORMATION?.messages?.phone ? 'red' : "white",
                                                    borderWidth: 1,
                                                    ...DefaultStyles.inputField,
                                                    ...DefaultStyles.inputFieldBordered
                                                }}
                                                keyboardType={"numeric"}
                                                placeholder="ফোন"
                                            />
                                        </View>
                                    </View>
                                    <View style={{...DefaultStyles.mr2, ...DefaultStyles.w98}}>
                                        <Text style={{...DefaultStyles.inputTitle}}>ইমেইল</Text>
                                        <TextInput onChangeText={(value) => {
                                            this.setState({
                                                email: value,
                                            });
                                        }}
                                                   value={this.state.email}
                                                   style={{
                                                       borderColor: user.UPDATE_GENERAL_INFORMATION?.type == 'missing'
                                                       && user.UPDATE_GENERAL_INFORMATION?.messages?.email ? 'red' : "white",
                                                       borderWidth: 1,
                                                       ...DefaultStyles.inputField,
                                                       ...DefaultStyles.inputFieldBordered
                                                   }}
                                                   placeholder="ইমেইল"
                                        />
                                    </View>
                                    <View style={{...DefaultStyles.mr2, ...DefaultStyles.w98}}>
                                        <Text style={{...DefaultStyles.inputTitle}}>ফেসবুক লিংক</Text>
                                        <TextInput onChangeText={(value) => {
                                            this.setState({
                                                fb_link: value,
                                            });
                                        }}
                                                   value={this.state.fb_link}
                                                   style={{
                                                       borderWidth: 1,
                                                       ...DefaultStyles.inputField,
                                                       ...DefaultStyles.inputFieldBordered
                                                   }}
                                                   placeholder="ফেসবুক লিংক"
                                        />
                                    </View>
                                    <View style={{...DefaultStyles.mr2, ...DefaultStyles.w98}}>
                                        <Text style={{...DefaultStyles.inputTitle}}>অর্গানাইজেশন / রেফারেন্স</Text>
                                        <TextInput
                                            onChangeText={(value) => {
                                                this.setState({
                                                    organisation: value,
                                                });
                                            }}
                                            value={this.state.organisation}
                                            style={{
                                                borderColor: user.UPDATE_GENERAL_INFORMATION?.type == 'missing'
                                                && user.UPDATE_GENERAL_INFORMATION?.messages?.organisation ? 'red' : "white",
                                                borderWidth: 1,
                                                ...DefaultStyles.inputField,
                                                ...DefaultStyles.inputFieldBordered
                                            }}
                                            placeholder="অর্গানাইজেশন / রেফারেন্স"
                                        />
                                    </View>
                                    <View style={{...DefaultStyles.mr2, ...DefaultStyles.w98}}>
                                        <Text style={{...DefaultStyles.inputTitle}}>লিঙ্গ</Text>
                                        <View style={{
                                            ...DefaultStyles.mr2, ...DefaultStyles.w100, ...DefaultStyles.pickerDesign,
                                            borderColor: Colors.baseBlack, marginTop: 5, marginBottom: 5
                                        }}>
                                            <Picker
                                                selectedValue={this.state.gender}
                                                style={{...DefaultStyles.pickerHeight}}
                                                onValueChange={async (itemValue, itemIndex) => {
                                                    this.setState({
                                                        gender: itemValue
                                                    })
                                                }}
                                            >
                                                <Picker.Item label="পুরুষ" value="male"/>
                                                <Picker.Item label="মহিলা" value="female"/>
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={{...DefaultStyles.mr2, ...DefaultStyles.w98}}>
                                        <Text style={{...DefaultStyles.inputTitle}}>জন্মতারিখ</Text>
                                        <TextInput
                                            onFocus={() => {
                                                this.setState({
                                                    birthDatePickerShow: true,
                                                    bloodhDatePickerShow: false
                                                })

                                            }}
                                            onChangeText={(value) => {
                                                this.setState({
                                                    birthDatePickerShow: true,
                                                    bloodhDatePickerShow: false
                                                })
                                            }}
                                            value={DefaultFunc.humanReadableDate(this.state.birthday).toString()}
                                            style={{
                                                borderWidth: 1,
                                                ...DefaultStyles.inputField,
                                                ...DefaultStyles.inputFieldBordered
                                            }}
                                            placeholder="তারিখ"
                                            onBlur={() => {
                                                this.setState({
                                                    birthDatePickerShow: false,
                                                    bloodhDatePickerShow: false
                                                })
                                            }}
                                        />
                                    </View>
                                    <View style={{...DefaultStyles.mr2, ...DefaultStyles.w98}}>
                                        <Text style={{...DefaultStyles.inputTitle}}>রক্তের গ্রুপ</Text>
                                        <View style={{
                                            ...DefaultStyles.mr2, ...DefaultStyles.w100, ...DefaultStyles.pickerDesign,
                                            borderColor: Colors.baseBlack, marginTop: 5, marginBottom: 5
                                        }}>
                                            <Picker
                                                selectedValue={this.state.blood_group}
                                                style={{...DefaultStyles.pickerHeight}}
                                                onValueChange={async (itemValue, itemIndex) => {
                                                    this.setState({
                                                        blood_group: itemValue
                                                    })
                                                }}
                                            >
                                                <Picker.Item label="নির্বাচন করুন" value=""/>
                                                {common.BLOOD_GROUPS.map((item, index) => {
                                                    return <Picker.Item key={index.toString()}
                                                                        label={item.title}
                                                                        value={item.id}/>
                                                })}
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={{...DefaultStyles.mr2, ...DefaultStyles.w98}}>
                                        <Text style={{...DefaultStyles.inputTitle}}>রক্ত দিতে ইচ্ছুক ?</Text>

                                        <View style={{...DefaultStyles.flexContainer}}>
                                            <RadioButton
                                                value="true"
                                                status={this.state.blood_donate ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    this.setState({blood_donate: true});
                                                }}/>
                                            <Text>হ্যাঁ</Text>
                                            <RadioButton
                                                value="false"
                                                status={!this.state.blood_donate ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    this.setState({blood_donate: false});
                                                }}/>
                                            <Text>না</Text>
                                        </View>
                                    </View>
                                    <View style={{...DefaultStyles.mr2, ...DefaultStyles.w98}}>
                                        <Text style={{...DefaultStyles.inputTitle}}>রক্ত দেয়ার শেষ তারিখ</Text>
                                        <TextInput
                                            onChangeText={(value) => {
                                                this.setState({
                                                    bloodhDatePickerShow: true,
                                                    birthDatePickerShow: false
                                                })
                                            }}
                                            value={DefaultFunc.humanReadableDate(this.state.blood_donation_date).toString()}
                                            style={{
                                                borderWidth: 1,
                                                ...DefaultStyles.inputField,
                                                ...DefaultStyles.inputFieldBordered
                                            }}
                                            placeholder="তারিখ"
                                            onFocus={() => {
                                                this.setState({
                                                    bloodhDatePickerShow: true,
                                                    birthDatePickerShow: false,
                                                })
                                            }}
                                            onBlur={() => {
                                                this.setState({
                                                    bloodhDatePickerShow: false,
                                                    birthDatePickerShow: false,
                                                })
                                            }}
                                        />

                                    </View>
                                </View>
                                <View style={{...DefaultStyles.fieldSet, ...DefaultStyles.w98}}>
                                    <Text style={{...DefaultStyles.legend}}>ঠিকানা</Text>
                                    <Text></Text>
                                    <Text style={{fontSize: 12, color: Colors.baseColor1}}>
                                        বিভাগ, জেলা ও থানা নির্বাচন করে ইউনিয়নের নাম লিখুন
                                    </Text>
                                    <View style={DefaultStyles.flexContainer}>
                                        <View style={{...DefaultStyles.w30, ...DefaultStyles.pickerDesign}}>
                                            <Picker
                                                selectedValue={this.state.division}
                                                style={{}}
                                                onValueChange={async (itemValue, itemIndex) => {
                                                    this.setState({
                                                        division: itemValue
                                                    })
                                                    if (itemValue) {
                                                        await common.fetchDistrictByDivision({
                                                            division: itemValue
                                                        })
                                                    }
                                                }}>
                                                <Picker.Item label="বিভাগ নির্বাচন করুন" value=""/>
                                                {common.DIVISIONS.map((item, index) => {
                                                    return <Picker.Item key={index.toString()}
                                                                        label={item.division}
                                                                        value={item.division}/>
                                                })}
                                            </Picker>
                                        </View>
                                        <View style={{...DefaultStyles.w30, ...DefaultStyles.pickerDesign}}>
                                            <Picker
                                                selectedValue={this.state.district}
                                                style={{}}
                                                onValueChange={async (itemValue, itemIndex) => {
                                                    this.setState({
                                                        district: itemValue
                                                    })

                                                    if (itemValue) {
                                                        await common.fetchThanaByDistrict({
                                                            district: itemValue
                                                        })
                                                    }
                                                }}>
                                                <Picker.Item label="জেলা নির্বাচন করুন" value=""/>
                                                {common.DISTRICT_BY_DIVISION.map((item, index) => {

                                                    return <Picker.Item key={index.toString()}
                                                                        label={item.district}
                                                                        value={item.district}/>
                                                })}
                                            </Picker>
                                        </View>
                                        <View style={{...DefaultStyles.w30, ...DefaultStyles.pickerDesign}}>
                                            <Picker
                                                selectedValue={this.state.location}
                                                style={{}}
                                                onValueChange={async (itemValue, itemIndex) => {

                                                    this.setState({
                                                        location: itemValue
                                                    })

                                                }}
                                            >
                                                <Picker.Item label="থানা নির্বাচন করুন" value=""/>
                                                {common.THANA_BY_DISTRICT.map((item, index) => {

                                                    return <Picker.Item key={index.toString()}
                                                                        label={item.thana}
                                                                        value={item.id}/>
                                                })}
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={DefaultStyles.flexContainer}>
                                        <View style={{...DefaultStyles.w95}}>
                                            <TextInput onChangeText={(value) => {
                                                this.setState({
                                                    full_address: value
                                                })
                                            }}
                                                       value={this.state.full_address}
                                                       style={{
                                                           borderWidth: 1,
                                                           borderColor: 'white',
                                                           ...DefaultStyles.inputField,
                                                           ...DefaultStyles.inputFieldBordered
                                                       }}
                                                       placeholder="ইউনিয়নের নাম লিখুন"/>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        this.storeProfileInfo()
                                    }}>
                                        <View style={{width: 150}}>
                                            <View style={{flex: 1, ...DefaultStyles.w100}}>
                                                <LinearGradient style={{flex: 1, borderRadius: 5}}
                                                                colors={['#21a81b', '#99d151']}
                                                                start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}>
                                                    <Text style={{...DefaultStyles.gradientBtn, textAlign: 'center'}}>
                                                        পরিবর্তন করুন
                                                    </Text>
                                                </LinearGradient>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                                {this.birthDatePicker()}
                                {this.bloodDatePicker()}
                            </ScrollView>
                        </KeyboardAwareScrollView>
                    </View>
                </View>
            </ScrollView>
        );
    }
    async storeProfileInfo() {
        this.setState({
            loading: true
        })
        const info = {
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                fb_link: this.state.fb_link,
                organisation: this.state.organisation,
                gender: this.state.gender,
                birthday: this.state.birthday,
                blood_group_id: this.state.blood_group,
                blood_donate: this.state.blood_donate,
                last_blood_donation: this.state.blood_donation_date,
                location_id: this.state.location,
                address: this.state.full_address,
                lng: this.state.selfLocation?.coords?.longitude,
                lat: this.state.selfLocation?.coords?.latitude
            },
            {user} = this.props.store;
        await user.fetchUpdateGeneralInformation(info)
        this.setState({
            loading: false
        })
    }
    setBirthday(date) {
        this.setState({
            birthday: date.nativeEvent.timestamp,
            birthDatePickerShow: false,
            bloodhDatePickerShow: false
        })
    }
    setBloodDonationDate(date) {
        this.setState({
            blood_donation_date: date.nativeEvent.timestamp,
            bloodhDatePickerShow: false,
            birthDatePickerShow: false
        })
    }
    birthDatePicker() {
        return (
            <View>
                {this.state.birthDatePickerShow &&
                <View>
                    <DateTimePicker
                        testID="birthDatePicker"
                        timeZoneOffsetInMinutes={0}
                        value={this.state.birthday ? new Date(this.state.birthday) : new Date()}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={this.setBirthday.bind(this)}
                    />
                </View>}
            </View>
        )
    }

    bloodDatePicker() {
        return (
            <View>
                {this.state.bloodhDatePickerShow &&
                <View>
                    <DateTimePicker
                        testID={"bloodDatePicker"}
                        timeZoneOffsetInMinutes={0}
                        value={this.state.blood_donation_date ? new Date(this.state.blood_donation_date) : new Date()}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={this.setBloodDonationDate.bind(this)}
                    />
                </View>}
            </View>
        )
    }

    errorMSG(response) {
        return (
            <Text style={{
                color: response?.type == 'success' ? 'green' : 'red',
                textAlign: 'center'
            }}>
                {response && response?.type != 'missing' ? response?.messages : ''}
            </Text>
        )
    }
    async componentDidMount() {
        this.setState({
            loading: true
        })
        const {common, user} = this.props.store
        await common.fetchDivisions()
        await common.fetchBloodGroups()
        await user.fetchUser()
        await user.setUpdateGeneralInformation(false)
        this.setState({
            name: user.USER?.name,
            phone: user.USER?.phone,
            email: user.USER?.email,
            fb_link: user.USER?.fb_link,
            organisation: user.USER?.organisation,
            gender: user.USER?.gender,
            birthday: Number(user.USER?.birthday),
            blood_group: user.USER?.blood_group_id,
            blood_donate: user.USER?.blood_donate,
            blood_donation_date: Number(user.USER?.last_blood_donation),
            division: user.USER?.location?.division,
            district: user.USER?.location?.district,
            location: user.USER?.location_id,
            full_address: user.USER?.address
        });

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
                this.setState({
                    selfLocation: JSON.parse(storageLocation)
                })
            }
        }
        this.setState({
            loading: false
        })
    }
}

const styles = StyleSheet.create({});


EditProfile.navigationOptions = navData => {
    return {
        headerTitle: () => (
            <Text style={DefaultStyles.headerTitle}>
                প্রোফাইল পরিবর্তন করুন
            </Text>
        )
    };
};

export default inject("store")(observer(EditProfile));