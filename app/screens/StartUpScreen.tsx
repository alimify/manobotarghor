import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    ActivityIndicator,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground,
} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import storage from '../services/asyncStorage'
import {inject, observer} from "mobx-react";
import Spinner from '../components/helpers/Spinner'
import DefaultStyles from '../constants/DefaultStyles'
import Colors from '../constants/Colors'
import * as Location from 'expo-location';
import {WebView} from 'react-native-webview';
import {transaction} from "mobx";

const StartUpScreen = props => {

    const [getLoading, setLoading] = useState(false),
        {user} = props.store;

    useEffect(() => {
        (async () => {

            setLoading(true)
            try {
                await user.fetchUser()

            } catch {
                await storage.clear('token')
            }
            setLoading(false)

            try {
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
                    }

                }
            } catch {

            }


        })();
    }, [setLoading, user]);


    if (getLoading) {
        return <Spinner/>
    } else if (!getLoading && user.USER) {
        setTimeout(() => {
            props.navigation.navigate('Home')
        }, 500)
    }


    return (
        <ImageBackground
            style={styles.imgBackground}
            source={require('../assets/img/startup_bg.png')}>
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
                    <Image source={require('../assets/img/logo.png')}/>
                </View>


                <View style={{
                    ...DefaultStyles.stickyBottom,
                    ...DefaultStyles.flexContainer,
                    bottom: 80,
                    ...DefaultStyles.p5
                }}>

                    <TouchableOpacity style={{marginRight: 15}} onPress={() => {
                        props.navigation.navigate('Login')
                    }}>
                        <View style={{flex: 1 }}>
                            <LinearGradient style={{flex: 1, alignItems: 'center', borderRadius: 5  }}
                                            colors={['#21a81b', '#99d151']}
                                            start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}>
                                <Text style={{ ...DefaultStyles.gradientBtn }}>
                                    লগ ইন
                                </Text>
                            </LinearGradient>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('Register')
                    }}>
                        <View style={{flex: 1}}>
                            <LinearGradient style={{flex: 1, alignItems: 'center', borderRadius: 5}}
                                            colors={['#21a81b', '#99d151']}
                                            start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}>
                                <Text style={{ ...DefaultStyles.gradientBtn }}>
                                    নিবন্ধন
                                </Text>
                            </LinearGradient>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imgBackground: {
        flex: 1,
        resizeMode: "cover",
        width: '100%',
        height: '100%'
    },
});


StartUpScreen.navigationOptions = navData => {
    return {
        headerTitle: () => null
    };
};


export default inject("store")(observer(StartUpScreen));
