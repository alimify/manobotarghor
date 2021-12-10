import React, {useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    ImageBackground,
    TouchableOpacity,
    Linking
} from "react-native";
import {inject, observer} from "mobx-react";

import DefaultStyles from '../../constants/DefaultStyles'
import Config from '../../services/config'
import Spinner from '../../components/helpers/Spinner'
import {Colors} from "react-native/Libraries/NewAppScreen";
import {LinearGradient} from "expo-linear-gradient";

const ViewScreen = props => {


    const requestParam = props.navigation.getParam('request'),
        [getLoading, setLoading] = useState(false),
        [request, setRequest] = useState(requestParam),
        {money, user} = props.store;


    if (getLoading) {
        return (<Spinner/>);
    }


    let bottomTextButton = (
        <View
            style={{
                alignItems: 'flex-end',
                marginHorizontal: 25,
                marginVertical: 30,
            }}>
            <TouchableOpacity onPress={async () => {
                // setLoading(true)
                // await money.fetchUpdateMoneyProvider({
                //     request_id: request.id
                // })
                // setLoading(false)

                Linking.openURL(Config.apiURI + `api/payment/shurjopay?amount=${request.amount}&id=${request.id}&type=food&uid=${user.USER?.id}`)


            }} style={{
                backgroundColor: 'green',
                padding: 10,
                paddingHorizontal: 30
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 17,
                    fontStyle: 'normal',
                    fontWeight: 'bold'
                }}>
                    সাহায্য প্রদান করতে চাই
                </Text>
            </TouchableOpacity>
        </View>
    );


    if (user.USER.role_id == 5) {
        bottomTextButton = (<Text></Text>)
    }

    if (request.money_provider_id) {
        bottomTextButton = (
            <View style={{
                alignItems: 'center',
                backgroundColor: 'green',
                padding: 10,
                margin: 10,
            }}>
                <Text style={{
                    color: 'white'
                }}>
                    {request.money_provider_id == user.USER.id ?
                        'আপনি সাহায্য প্রদান করেছেন।' :
                        `${request.money_provider?.name} (${request.money_provider?.phone}) সাহায্য প্রদান করেছেন`
                    }
                </Text>
            </View>
        )
    }


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <ImageBackground style={{width: '100%'}}
                             source={require('../../assets/img/bottom_inner_title_bg.png')}>
                <View style={{
                    ...DefaultStyles.halfBody, ...DefaultStyles.halfBodySemi, marginBottom: 60
                }}>
                    <View>
                        <TouchableOpacity style={{padding: 10}} onPress={async () => {
                            setLoading(true)
                            await money.fetchRequestPublish({
                                request_id: request.id
                            })
                            await money.fetchMoneyRequestDetails({
                                id: request.id
                            })
                            await setRequest(money.MONEY_REQUEST_DETAILS)
                            setLoading(false)
                        }}>
                            <View style={{flex: 1, ...DefaultStyles.w100}}>
                                <LinearGradient style={{flex: 1, borderRadius: 5}}
                                                colors={['#21a81b', '#99d151']}
                                                start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}>
                                    <Text style={{...DefaultStyles.gradientBtn, textAlign: 'center'}}>
                                        {!request.published ? 'পাবলিশ করুন' : 'আন-পাবলিশ করুন'}
                                    </Text>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{...DefaultStyles.flexContainer, ...styles.row}}>
                        <Text style={{...DefaultStyles.w40}}>নামঃ</Text>
                        <Text style={{...DefaultStyles.w60}}>{request.name}</Text>
                    </View>
                    <View style={{...DefaultStyles.flexContainer, ...styles.row}}>
                        <Text style={{...DefaultStyles.w40}}>ফোনঃ</Text>
                        <Text>{request.phone}</Text>
                    </View>
                    <View style={{...DefaultStyles.flexContainer, ...styles.row}}>
                        <Text style={{...DefaultStyles.w40}}>পেশাঃ</Text>
                        <Text>{request.income_source}</Text>
                    </View>
                    <View style={{...DefaultStyles.flexContainer, ...styles.row}}>
                        <Text style={{...DefaultStyles.w40}}>পরিবারের সদস্য সংখ্যাঃ</Text>
                        <Text>{request.family_member} জন</Text>
                    </View>
                    <View style={{...DefaultStyles.flexContainer, ...styles.row}}>
                        <Text style={{...DefaultStyles.w40}}>অর্থের পরিমানঃ</Text>
                        <Text>৳ {request.amount}</Text>
                    </View>

                    <View style={{...DefaultStyles.flexContainer, ...styles.row}}>
                        <Text style={{...DefaultStyles.w40}}>ঠিকানাঃ</Text>
                        <Text>
                            {request.union}, {request.location?.thana},{request.location?.district},{request.location?.division}
                        </Text>
                    </View>
                    <View style={{...DefaultStyles.flexContainer, ...styles.row}}>
                        <Text style={{...DefaultStyles.w40}}>কারনঃ</Text>
                        <Text>{request.seeking_reason}</Text>
                    </View>
                    <View style={{...styles.row}}>
                        <View>
                            <Text>রেফারেন্স ১</Text>
                        </View>
                        <View style={{...DefaultStyles.flexContainer, paddingHorizontal: 10}}>
                            <Text style={{...DefaultStyles.w40}}>নামঃ</Text>
                            <Text>{request.reference1_name}</Text>
                        </View>
                        <View style={{...DefaultStyles.flexContainer, paddingHorizontal: 10}}>
                            <Text style={{...DefaultStyles.w40}}>ফোনঃ</Text>
                            <Text>{request.reference1_phone}</Text>
                        </View>
                    </View>
                    <View style={{...styles.row}}>
                        <View>
                            <Text>রেফারেন্স ২</Text>
                        </View>
                        <View style={{...DefaultStyles.flexContainer, paddingHorizontal: 10}}>
                            <Text style={{...DefaultStyles.w40}}>নামঃ</Text>
                            <Text>{request.reference2_name}</Text>
                        </View>
                        <View style={{...DefaultStyles.flexContainer, paddingHorizontal: 10}}>
                            <Text style={{...DefaultStyles.w40}}>ফোনঃ</Text>
                            <Text>{request.reference2_phone}</Text>
                        </View>
                    </View>
                    <View style={{...DefaultStyles.flexContainer, ...styles.row}}>
                        <Text style={{...DefaultStyles.w40}}> বিস্তারিতঃ </Text>
                        <Text>
                            {request.description}
                        </Text>
                    </View>
                    <View style={{...DefaultStyles.p3, alignItems: 'center'}}>
                        {request?.user?.nid_img && (
                            <Image source={{uri: Config.assetURI + request?.user?.nid_img}}
                                   style={{
                                       height: 350,
                                       width: 480,
                                       flex: 1
                                   }} resizeMode={'cover'}/>
                        )}
                    </View>

                    {bottomTextButton}
                </View>

            </ImageBackground>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    row: {
        padding: 10,
        borderBottomColor: Colors.baseColor2,
        borderBottomWidth: 1
    }
});
ViewScreen.navigationOptions = navData => {
    return {
        headerTitle: () => (
            <Text style={DefaultStyles.headerTitle}>অর্থ আবেদনের বিস্তারিত </Text>
        )
    };
};

export default inject("store")(observer(ViewScreen));
