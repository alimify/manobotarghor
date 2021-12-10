import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Button,
    Alert,
    AsyncStorage,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    ImageBackground,
    KeyboardAvoidingView
} from "react-native";
import {withNavigation} from "react-navigation";
import {inject, observer} from "mobx-react";
import storage from "../../services/asyncStorage";
import Constants from "expo-constants";
import DefaultStyles from "../../constants/DefaultStyles";
import Colors from "../../constants/Colors";
import Spinner from "../../components/helpers/Spinner";
import {LinearGradient} from "expo-linear-gradient";

const LoginScreen = props => {
    const [getUser, setUser] = useState(""),
        [getPassword, setPassword] = useState(""),
        [getLoading, setLoading] = useState(false),
        [getErrorMSG, setErrorMSG] = useState(''),
        {user} = props.store,
        [getInputColor1, setInputColor1] = useState("#e8e8e8"),
        [getInputColor2, setInputColor2] = useState("#e8e8e8"),
        [getFormSubmitted, setFormSubmitted] = useState(false)

    useEffect(() => {

        (async () => {
            setLoading(true)
            try {
                await user.fetchUser()
            } catch {

            }
            setLoading(false)
        })();

    }, [setLoading]);


    if (getLoading) {
        return (<Spinner/>);
    } else if (!getLoading && user.USER) {
        setTimeout(() => {
            props.navigation.navigate('Home')
        }, 800)
    }

    if (!getLoading && getFormSubmitted && user.LOGIN && user.LOGIN.type == 'success') {
        return (<View style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size="large" color="#FBA939"/>
            <Text>{user.LOGIN.messages}</Text>
        </View>)
    }


    return (
        <KeyboardAvoidingView behavior={"height"}>

            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={{...DefaultStyles.halfBody}}>
                        <View style={{marginVertical: 0, marginHorizontal: 20}}>

                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                }}>
                                    <Image source={require('../../assets/img/logo.png')}/>
                                </View>
                            </View>

                            <View style={styles.errorNotification}>
                                <Text
                                    style={{textAlign: 'center', color: '#c1444d', fontWeight: 'bold'}}>
                                    {!getLoading && getFormSubmitted && user.LOGIN && user.LOGIN.type == 'incorrect' ? user.LOGIN.messages : ``}
                                </Text>
                            </View>


                            <TextInput
                                onChangeText={setUser}
                                style={{...styles.inputField, borderColor: getInputColor1}}
                                placeholder="ফোন অথবা ইমেইল"
                                onFocus={() => {
                                    setInputColor1("#FBA939");
                                }}
                                onBlur={() => {
                                    setInputColor1("#e8e8e8");
                                }}
                                autoCompleteType="off"
                            />
                            <TextInput
                                onChangeText={setPassword}
                                returnKeyType="go"
                                secureTextEntry
                                style={{
                                    ...styles.inputField,
                                    borderColor: getInputColor2
                                }}
                                autoCorrect={false}
                                onFocus={() => {
                                    setInputColor2("#FBA939");
                                }}
                                onBlur={() => {
                                    setInputColor2("#e8e8e8");
                                }}
                                placeholder="পাসওয়ার্ড"
                            />

                            {/* <View style={styles.loginButton}> */}
                            <TouchableOpacity
                                style={{width: 100, alignItems: 'center', alignContent: 'center', textAlign: 'center'}}
                                onPress={async () => {
                                    if (!getUser) {
                                        setInputColor1("red");
                                        return;
                                    }

                                    if (!getPassword) {
                                        setInputColor2("red");
                                        return;
                                    }

                                    setLoading(true);
                                    setFormSubmitted(true)

                                    let loginLoading;

                                    try {

                                        loginLoading = await user.fetchLogin({
                                            user: getUser,
                                            password: getPassword,
                                            device_name: Constants.deviceName
                                        });

                                    } catch {

                                        setErrorMSG('We experiencing some issues..')
                                        setTimeout(() => {
                                            setErrorMSG('')
                                        }, 5000)

                                    } finally {
                                        setLoading(false);
                                    }

                                    if (loginLoading.type == 'success' && loginLoading.token) {
                                        await storage.set("token", loginLoading.token);
                                        try {
                                            await user.fetchUser()
                                        } catch {
                                            await storage.clear('token')
                                        }
// props.navigation.navigate('Home')
                                    } else if (loginLoading.type == 'missing') {
                                        if (loginLoading.messages.user) {
                                            setInputColor1("red");
                                        }
                                        if (loginLoading.messages.user) {
                                            setInputColor2("red");
                                        }
                                    } else if (loginLoading.type == 'incorrect') {
                                        setErrorMSG(user.LOGIN.messages)
                                        setTimeout(() => {
                                            setErrorMSG('')
                                        }, 5000)
                                    }
                                }}>
                                <View style={{flex: 1, ...DefaultStyles.w100}}>
                                    <LinearGradient style={{flex: 1, borderRadius: 5}}
                                                    colors={['#21a81b', '#99d151']}
                                                    start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}>
                                        <Text style={{...DefaultStyles.gradientBtn, textAlign: 'center'}}>
                                            লগিন
                                        </Text>
                                    </LinearGradient>
                                </View>
                            </TouchableOpacity>
                            {/* </View> */}
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
};


LoginScreen.navigationOptions = navData => {
    return {
        headerTitle: () => (
            <Text style={DefaultStyles.headerTitle}>লগিন</Text>
        )
    };
};

const styles = StyleSheet.create({
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.baseColor1,
        marginBottom: 10,
        paddingVertical: 10
    },

    errorNotification: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 5,
        marginTop: -8
    }
});

export default inject("store")(observer(LoginScreen));
