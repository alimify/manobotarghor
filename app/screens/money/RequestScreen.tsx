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
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import {inject, observer} from "mobx-react";

import storage from "../../services/asyncStorage";
import Spinner from '../../components/helpers/Spinner'
import DefaultStyles from '../../constants/DefaultStyles'
import Colors from "../../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";

const RequestScreen = props => {

    const {common, user, money} = props.store;

    const [getLoading, setLoading] = useState(false),
        [getName, setName] = useState(user.USER.name),
        [getPhone, setPhone] = useState(user.USER.phone),
        [getDivision, setDivision] = useState(user.USER.location ? user.USER.location.division : ''),
        [getDistrict, setDistrict] = useState(user.USER.location ? user.USER.location.district : ''),
        [getLocation, setLocation] = useState(user.USER.location ? user.USER.location_id.toString() : (0).toString()),
        [getUnion, setUnion] = useState(''),
        [getIncomeSource, setIncomeSource] = useState(''),
        [getFamilyMember, setFamilyMember] = useState(''),
        [getAmount, setAmount] = useState(''),
        [getReason, setReason] = useState(''),
        [getRefer1Name, setRefer1Name] = useState(''),
        [getRefer1Phone, setRefer1Phone] = useState(''),
        [getRefer2Name, setRefer2Name] = useState(''),
        [getRefer2Phone, setRefer2Phone] = useState(''),
        [getDescription, setDescription] = useState(''),
        [selfLocation, setSelfLocation] = useState({}),
        [formSubmit, setFormSubmit] = useState(false),
        [haveError, setHaveError] = useState(false);
    useEffect(() => {
        const loadingData = async () => {
            setLoading(true)
            await common.fetchDivisions()
            const storageLocation = await storage.get('location')
            setSelfLocation(storageLocation ? JSON.parse(storageLocation) : {})

            if (getDivision) {
                await common.fetchDistrictByDivision({
                    division: getDivision
                })
            }
            if (getDistrict) {
                await common.fetchThanaByDistrict({
                    district: getDistrict
                })
            }
            setLoading(false)
            console.log('getLoading -', JSON.stringify(getLoading))
        }

        loadingData()
    }, [setLoading, getDivision, getDistrict]);


    if (getLoading) {
        return (<Spinner/>);
    }

    if (money.MONEY_REQUEST && money.MONEY_REQUEST.type == 'success') {

        const message = money.MONEY_REQUEST.messagess
        money.setMoneyRequest(false)
        setTimeout(() => {
            props.navigation.navigate('MoneyList')
        }, 1000)

        return (
            <View style={{
                ...DefaultStyles.flex,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color="#FBA939"/>
                <Text>{message}</Text>
            </View>
        )
    }


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{
                ...DefaultStyles.halfBody, ...DefaultStyles.halfBodySemi
            }}>
                <View style={{padding: 10}}>
                    <View style={DefaultStyles.flexContainer}>
                        <View style={{
                            ...DefaultStyles.w48,
                            ...DefaultStyles.mr2
                        }}>
                            <Text style={{...DefaultStyles.inputTitle}}>নাম</Text>
                            <TextInput onChangeText={setName}
                                       value={getName}
                                       style={{
                                           borderWidth: 1,
                                           borderColor: haveError && money.MONEY_REQUEST.messages.hasOwnProperty('name') ? 'red' : 'white',
                                           ...DefaultStyles.inputField,
                                           ...DefaultStyles.inputFieldBordered
                                       }}
                                       placeholder="নাম"/>
                        </View>
                        <View style={{
                            ...DefaultStyles.w48,
                            ...DefaultStyles.ml2
                        }}>
                            <Text style={{...DefaultStyles.inputTitle}}>ফোন</Text>
                            <TextInput onChangeText={setPhone}
                                       value={getPhone}
                                       style={{
                                           borderWidth: 1,
                                           borderColor: haveError && money.MONEY_REQUEST.messages.hasOwnProperty('phone') ? 'red' : 'white',
                                           ...DefaultStyles.inputField,
                                           ...DefaultStyles.inputFieldBordered
                                       }}
                                       keyboardType={'numeric'}
                                       placeholder="ফোন"/>
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
                                    selectedValue={getDivision}
                                    style={{...DefaultStyles.pickerHeight}}
                                    onValueChange={async (itemValue, itemIndex) => {
                                        setDivision(itemValue)
                                        if (itemValue) {
                                            await common.fetchDistrictByDivision({
                                                division: itemValue
                                            })
                                        }
                                    }}>
                                    <Picker.Item
                                        label="বিভাগ"
                                        value=""/>
                                    {common.DIVISIONS.map((item, index) => {
                                        return <Picker.Item key={index.toString()}
                                                            label={item.division}
                                                            value={item.division}/>
                                    })}
                                </Picker>
                            </View>
                            <View style={{...DefaultStyles.w30, ...DefaultStyles.pickerDesign}}>
                                <Picker
                                    selectedValue={getDistrict}
                                    style={{...DefaultStyles.pickerHeight}}
                                    onValueChange={async (itemValue, itemIndex) => {
                                        setDistrict(itemValue)
                                        if (itemValue) {
                                            await common.fetchThanaByDistrict({
                                                district: itemValue
                                            })
                                        }
                                    }}>
                                    <Picker.Item
                                        label="জেলা"
                                        value=""/>
                                    {common.DISTRICT_BY_DIVISION.map((item, index) => {

                                        return <Picker.Item key={index.toString()}
                                                            label={item.district}
                                                            value={item.district}/>
                                    })}
                                </Picker>
                            </View>
                            <View style={{...DefaultStyles.w30, ...DefaultStyles.pickerDesign}}>
                                <Picker
                                    selectedValue={getLocation}
                                    style={{...DefaultStyles.pickerHeight}}
                                    onValueChange={async (itemValue, itemIndex) => {
                                        setLocation(itemValue)
                                    }}>
                                    <Picker.Item
                                        label="থানা"
                                        value=""/>
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
                                <TextInput onChangeText={setUnion}
                                           value={getUnion}
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
                    <View style={DefaultStyles.flexContainer}>
                        <View style={{...DefaultStyles.w48, ...DefaultStyles.mr2}}>
                            <Text style={{
                                ...DefaultStyles.inputTitle
                            }}>পরিবারের সদস্য সংখ্যা</Text>
                            <TextInput onChangeText={setFamilyMember}
                                       value={getFamilyMember}
                                       keyboardType={'numeric'}
                                       style={{
                                           borderWidth: 1,
                                           borderColor: haveError && money.MONEY_REQUEST.messages.hasOwnProperty('family_member') ? 'red' : 'white',
                                           ...DefaultStyles.inputField,
                                           ...DefaultStyles.inputFieldBordered
                                       }}
                                       placeholder="পরিবারের সদস্য সংখ্যা"/>
                        </View>
                        <View style={{...DefaultStyles.w48, ...DefaultStyles.ml2}}>
                            <Text style={{
                                ...DefaultStyles.inputTitle
                            }}>অর্থের পরিমান</Text>
                            <TextInput
                                onChangeText={setAmount}
                                value={getAmount}
                                keyboardType={'numeric'}
                                style={{
                                    borderWidth: 1,
                                    borderColor: haveError && money.MONEY_REQUEST.messages.hasOwnProperty('amount') ? 'red' : 'white',
                                    ...DefaultStyles.inputField,
                                    ...DefaultStyles.inputFieldBordered
                                }}
                                placeholder="অর্থের পরিমান"/>
                        </View>
                    </View>
                    <View style={{...DefaultStyles.flexContainer, alignItems: 'center'}}>
                        <View style={{...DefaultStyles.w98, ...DefaultStyles.mr2}}>
                            <Text style={{...DefaultStyles.inputTitle}}>পেশা</Text>
                            <TextInput
                                onChangeText={setIncomeSource}
                                value={getIncomeSource}
                                style={{
                                    borderWidth: 1,
                                    borderColor: haveError && money.MONEY_REQUEST.messages.hasOwnProperty('income_source') ? 'red' : 'white',
                                    ...DefaultStyles.inputField,
                                    ...DefaultStyles.inputFieldBordered
                                }}
                                placeholder="পেশা"/>
                        </View>
                        <View style={{...DefaultStyles.w95}}>
                            <Text style={{...DefaultStyles.inputTitle}}>আবেদনের কারণ</Text>
                            <View style={{...DefaultStyles.w100, ...DefaultStyles.pickerDesign, marginTop: 5, marginLeft: 2, marginBottom: 10}}>
                                <View style={{
                                    borderWidth: haveError && money.MONEY_REQUEST?.messages?.seeking_reason ? 1 : 0,
                                    borderColor: haveError && money.MONEY_REQUEST?.messages?.seeking_reason ? 'red' : 'white',
                                }}>

                                    <Picker
                                        selectedValue={getReason}
                                        style={{...DefaultStyles.pickerHeight}}
                                        onValueChange={async (itemValue, itemIndex) => {
                                            setReason(itemValue)
                                        }}>
                                        <Picker.Item
                                            label="আবেদনের কারণ"
                                            value={null}/>

                                        <Picker.Item
                                            label="দৈনন্দিন খরচের জন্য"
                                            value="দৈনন্দিন খরচের জন্য"/>

                                        <Picker.Item
                                            label="চিকিৎসার জন্য"
                                            value="চিকিৎসার জন্য"/>

                                        <Picker.Item
                                            label="পড়ালেখার জন্য"
                                            value="পড়ালেখার জন্য"/>

                                    </Picker>

                                </View>
                            </View>
                        </View>

                    </View>
                    <View>
                        <View style={{...DefaultStyles.fieldSet, ...DefaultStyles.w98}}>
                            <Text style={{...DefaultStyles.legend}}>রেফারেন্স ১</Text>
                            <Text></Text>
                            <View style={DefaultStyles.flexContainer}>
                                <View style={{...DefaultStyles.w48, ...DefaultStyles.mr2}}>
                                    <Text style={{...DefaultStyles.inputWithoutBorderTitle}}>নাম</Text>
                                    <TextInput
                                        onChangeText={setRefer1Name}
                                        value={getRefer1Name}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: haveError && money.MONEY_REQUEST.messages.hasOwnProperty('reference1_name') ? 'red' : 'white',
                                            ...DefaultStyles.inputField,

                                            marginHorizontal: 10,
                                            paddingHorizontal: 10
                                        }}
                                        placeholder="নাম"/>
                                </View>
                                <View style={{...DefaultStyles.w48, ...DefaultStyles.ml2}}>
                                    <Text style={{...DefaultStyles.inputWithoutBorderTitle}}>ফোন</Text>
                                    <TextInput
                                        onChangeText={setRefer1Phone}
                                        value={getRefer1Phone}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: haveError && money.MONEY_REQUEST.messages.hasOwnProperty('reference1_phone') ? 'red' : 'white',
                                            ...DefaultStyles.inputField,
                                            marginHorizontal: 10,
                                            paddingHorizontal: 10
                                        }}
                                        placeholder="ফোন"/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{...DefaultStyles.fieldSet, ...DefaultStyles.w98}}>
                            <Text style={{...DefaultStyles.legend}}>রেফারেন্স ২</Text>
                            <Text></Text>
                            <View style={DefaultStyles.flexContainer}>
                                <View style={{...DefaultStyles.w48, ...DefaultStyles.mr2}}>
                                    <Text style={{...DefaultStyles.inputWithoutBorderTitle}}>নাম</Text>
                                    <TextInput
                                        onChangeText={setRefer2Name}
                                        value={getRefer2Name}
                                        style={{
                                            ...DefaultStyles.inputField, marginHorizontal: 10,
                                            paddingHorizontal: 10
                                        }}
                                        placeholder="নাম"/>
                                </View>
                                <View style={{...DefaultStyles.w48, ...DefaultStyles.ml2}}>
                                    <Text style={{...DefaultStyles.inputWithoutBorderTitle}}>ফোন</Text>
                                    <TextInput
                                        onChangeText={setRefer2Phone}
                                        value={getRefer2Phone}
                                        style={{
                                            borderColor: 'white', ...DefaultStyles.inputField, marginHorizontal: 10,
                                            paddingHorizontal: 10
                                        }}
                                        placeholder="ফোন"/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ ...DefaultStyles.inputTitle }}>বিস্তারিত</Text>
                        <TextInput style={{
                            borderWidth: 1,
                            borderColor: 'white',
                            textAlignVertical: 'top',
                            paddingHorizontal: 10,
                            paddingTop: 5,
                            height: 100,
                            ...DefaultStyles.inputField,
                            ...DefaultStyles.w98
                        }} onChangeText={setDescription} value={getDescription} placeholder="বিস্তারিত লিখুন"/>
                    </View>
                </View>
                <View style={{marginBottom: 80}}>
                    <TouchableOpacity onPress={async () => {
                        const request = {
                            name: getName,
                            phone: getPhone,
                            income_source: getIncomeSource,
                            family_member: getFamilyMember,
                            amount: getAmount,
                            seeking_reason: getReason,
                            reference1_name: getRefer1Name,
                            reference1_phone: getRefer1Phone,
                            reference2_name: getRefer2Name,
                            reference2_phone: getRefer2Phone,
                            location_id: getLocation,
                            description: getDescription,
                            lng: selfLocation.hasOwnProperty('coords') ? selfLocation.coords.longitude : null,
                            lat: selfLocation.hasOwnProperty('coords') ? selfLocation.coords.latitude : null
                        }
                        setFormSubmit(true)
                        setLoading(true)
                        await money.fetchMoneyRequest(request)
                        await money.fetchLists()
                        setLoading(false)
                        setHaveError((money.MONEY_REQUEST && money.MONEY_REQUEST.type == 'missing'))

                    }} style={{marginLeft: 10}}>

                        <View style={{width: 150}}>
                            <View style={{flex: 1, ...DefaultStyles.w100}}>
                                <LinearGradient style={{flex: 1, borderRadius: 5}}
                                                colors={['#21a81b', '#99d151']}
                                                start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}>
                                    <Text style={{...DefaultStyles.gradientBtn, textAlign: 'center'}}>
                                        আবেদন করুন
                                    </Text>
                                </LinearGradient>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({});


RequestScreen.navigationOptions = navData => {
    return {
        headerTitle: () => (
            <Text style={DefaultStyles.headerTitle}>অর্থের সহায়তার আবেদন</Text>
        )
    };
};

export default inject("store")(observer(RequestScreen));
