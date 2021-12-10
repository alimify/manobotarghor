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
    TouchableOpacity
} from "react-native";
import {inject, observer} from "mobx-react";

import DefaultStyles from '../../constants/DefaultStyles'
import Spinner from '../../components/helpers/Spinner'
import Colors from '../../constants/Colors'
import {LinearGradient} from "expo-linear-gradient";


const ListScreeen = props => {


    const [getLoading, setLoading] = useState(false),
        [viewListType, setViewListType] = useState(0),
        {money, user, common} = props.store,
        [moneyListQuery, setMoneyListQuery] = useState({}),
        [getDivision, setDivision] = useState(user.USER.location ? user.USER.location.division : ''),
        [getDistrict, setDistrict] = useState(user.USER.location ? user.USER.location.district : ''),
        [getLocation, setLocation] = useState(user.USER.location ? user.USER.location_id.toString() : (0).toString());


    useEffect(() => {
        const roleDonor = user.USER.role_id == 5
        const loading = async (setLoading, money, roleDonor) => {
            setLoading(true)
            if (roleDonor) {
                setViewListType(1)
            }
            await money.fetchLists({
                viewListType: roleDonor ? 1 : 0
            })
            await common.fetchDivisions()
            setLoading(false)
        }
        loading(setLoading, money, roleDonor)
    }, [setLoading, money, user, setViewListType])


    let donorLinkButton = (
        <View style={DefaultStyles.w30}>
            <TouchableOpacity onPress={async () => {
                setLoading(true)
                setViewListType(1)
                let query = {
                    ...moneyListQuery,
                    viewListType: 1
                }
                await setMoneyListQuery(query)
                await money.fetchLists(query)
                setLoading(false)
            }} style={{
                backgroundColor: viewListType == 1 ? Colors.baseColor1 : Colors.baseColor,
            }}>
                <Text style={{...DefaultStyles.allButton, ...DefaultStyles.btnPadding}}>
                    আমার আবেদন
                </Text>
            </TouchableOpacity>
        </View>
    )


    if (user.USER.role_id == 4) {
        donorLinkButton = (
            <View style={DefaultStyles.w30}>
                <TouchableOpacity onPress={async () => {
                    setLoading(true)
                    setViewListType(2)
                    let query = {
                        ...moneyListQuery,
                        viewListType: 2
                    }
                    await setMoneyListQuery(query)
                    await money.fetchLists(query)
                    setLoading(false)
                }} style={{
                    backgroundColor: viewListType == 2 ? Colors.baseColor1 : Colors.baseColor,
                }}>
                    <Text style={{...DefaultStyles.allButton, ...DefaultStyles.btnPadding}}>
                        আমার সাহায্য
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    let locationChooseElement;
    if (viewListType == 0) {
        locationChooseElement = (
            <View>
                <View style={{
                    ...DefaultStyles.flexContainer,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{...DefaultStyles.w30, ...DefaultStyles.m2, ...DefaultStyles.pickerDesign}}>
                        <Picker
                            selectedValue={getDivision}
                            style={{...DefaultStyles.pickerHeight}}
                            onValueChange={async (itemValue, itemIndex) => {
                                setDivision(itemValue)
                                setLoading(true)
                                if (itemValue) {
                                    await common.fetchDistrictByDivision({
                                        division: itemValue
                                    })
                                }
                                await money.fetchLists({
                                    division: itemValue
                                })
                                setLoading(false)
                            }}>
                            <Picker.Item label="বিভাগ" value=""/>
                            {common.DIVISIONS.map((item, index) => {
                                return <Picker.Item key={index.toString()}
                                                    label={item.division}
                                                    value={item.division}
                                />
                            })}
                        </Picker>

                    </View>
                    <View style={{...DefaultStyles.w30, ...DefaultStyles.m2, ...DefaultStyles.pickerDesign}}>
                        <Picker
                            selectedValue={getDistrict}
                            style={{...DefaultStyles.pickerHeight}}
                            onValueChange={async (itemValue, itemIndex) => {
                                setDistrict(itemValue)
                                setLoading(true)

                                if (itemValue) {
                                    await common.fetchThanaByDistrict({
                                        district: itemValue
                                    })
                                }
                                await money.fetchLists({
                                    district: itemValue
                                })
                                setLoading(false)

                            }}>
                            <Picker.Item label="জেলা" value=""/>
                            {common.DISTRICT_BY_DIVISION.map((item, index) => {
                                return <Picker.Item key={index.toString()}
                                                    label={item.district}
                                                    value={item.district}
                                />
                            })}
                        </Picker>
                    </View>
                    <View style={{...DefaultStyles.w30, ...DefaultStyles.m2, ...DefaultStyles.pickerDesign}}>
                        <Picker
                            selectedValue={getLocation}
                            style={{...DefaultStyles.pickerHeight}}
                            onValueChange={async (itemValue, itemIndex) => {
                                setLocation(itemValue)
                                setLoading(true)
                                await money.fetchLists({
                                    location: itemValue
                                })
                                setLoading(false)
                            }}>
                            <Picker.Item label="থানা" value=""/>
                            {common.THANA_BY_DISTRICT.map((item, index) => {
                                return <Picker.Item key={index.toString()}
                                                    label={item.thana}
                                                    value={item.id}
                                />
                            })}
                        </Picker>
                    </View>
                </View>
            </View>
        )
    }

    let moneyRequestLink;
    if (user.USER.role_id == 5) {
        moneyRequestLink = (
            <View style={DefaultStyles.w30}>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('MoneyRequest')
                }} style={{
                    backgroundColor: viewListType == 0 ? Colors.baseColor1 : Colors.baseColor,
                }}>
                    <Text style={{...DefaultStyles.allButton, ...DefaultStyles.btnPadding}}>
                        অর্থের আবেদন
                    </Text>
                </TouchableOpacity>
            </View>)
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{flex: 1}}>
                <View style={{
                    ...DefaultStyles.flexContainer,
                    ...DefaultStyles.p5,
                    ...DefaultStyles.m5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {moneyRequestLink}
                    <View style={{alignItems: 'center', marginRight: 5, marginLeft: 5}}>
                        {user.USER.role_id != 5 && (<TouchableOpacity onPress={async () => {
                            setLoading(true)
                            setViewListType(0)
                            let query = {
                                ...moneyListQuery,
                                viewListType: 0
                            }
                            await setMoneyListQuery(query)
                            await money.fetchLists(query)
                            setLoading(false)
                        }} style={{
                            backgroundColor: viewListType == 0 ? Colors.baseColor1 : Colors.baseColor,
                        }}>
                            <Text style={{...DefaultStyles.allButton, ...DefaultStyles.btnPadding}}>
                                সাহায্যের আবেদন
                            </Text>
                        </TouchableOpacity>)}
                    </View>
                    {donorLinkButton}
                </View>

                {getLoading ? (
                    <Spinner/>
                ) : (
                    <View style={{
                        borderTopRightRadius: 5,
                        borderTopLeftRadius: 5,
                    }}>
                        {locationChooseElement}
                        <ScrollView style={{padding: 5, margin: 5}}>
                            {money.LISTS.map((request, index) => {
                                return (<View key={index.toString()}
                                              style={{
                                                  ...DefaultStyles.flexContainer,
                                                  padding: 10,
                                                  backgroundColor: Colors.fontColor1,
                                                  borderWidth: 1,
                                                  borderColor: Colors.baseColor1,
                                                  borderRadius: 3,
                                                  marginBottom: 15,
                                                  shadowColor: 'rgba(0, 0, 0, 0.7)',
                                                  shadowOpacity: 0.8,
                                                  shadowRadius: 15,
                                                  shadowOffset: {width: 1, height: 13},
                                              }}>

                                        <View style={{...DefaultStyles.w100}}>
                                            <Text>
                                                <Text style={{...DefaultStyles.labelStyle}}>আবেদনকারীর নামঃ </Text>
                                                <Text>{request.name}</Text>
                                            </Text>

                                            {Boolean(user.USER?.modaretor_role) && !Boolean(request.published) && (
                                                <View style={{
                                                    backgroundColor: Colors.baseColor,
                                                    borderRadius: 10,
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{color: 'white'}}>
                                                        ড্রাফট
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                        <View style={{...DefaultStyles.w70}}>
                                            <Text>
                                                <Text style={{...DefaultStyles.labelStyle}}>জেলাঃ </Text>
                                                <Text>{request?.location?.district} </Text>
                                            </Text>
                                            <Text>
                                                <Text style={{...DefaultStyles.labelStyle}}>পেশাঃ </Text>
                                                <Text>{request.income_source}</Text>
                                            </Text>
                                            <Text>
                                                <Text style={{...DefaultStyles.labelStyle}}>টাকার পরিমাণঃ </Text>
                                                <Text>৳ {request.amount}</Text>
                                            </Text>
                                        </View>
                                        <View style={DefaultStyles.w30}>
                                            <TouchableOpacity onPress={() => {
                                                props.navigation.navigate('MoneyView', {
                                                    request
                                                })
                                            }}>

                                                <View style={{flex: 1, ...DefaultStyles.w100}}>
                                                    <LinearGradient style={{flex: 1, borderRadius: 5}}
                                                                    colors={['#21a81b', '#99d151']}
                                                                    start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}>
                                                        <Text style={{...DefaultStyles.gradientBtn, textAlign: 'center'}}>
                                                            বিস্তারিত
                                                        </Text>
                                                    </LinearGradient>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                )}

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({});


ListScreeen.navigationOptions = navData => {
    return {
        headerTitle: () => (
            <Text style={{...DefaultStyles.headerTitle}}> অর্থের সহায়তার আবেদনসমুহ </Text>
        )
    };
};

export default inject("store")(observer(ListScreeen));
