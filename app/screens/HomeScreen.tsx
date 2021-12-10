import React, {useEffect, useCallback, useState} from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../components/helpers/Spinner";
import DefaultStyles from "../constants/DefaultStyles";
import Colors from "../constants/Colors";

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    StatusBar,
    Image,
    ImageBackground
} from "react-native";

import {
    FontAwesome5,
    Feather,
    MaterialCommunityIcons,
    Entypo,
    Ionicons,
    Octicons,
    MaterialIcons,
    AntDesign
} from "@expo/vector-icons";


const HomeScreen = props => {


    const {user} = props.store

    if (!user.USER) {
        props.navigation.navigate('Start')
        return <Spinner/>
    }

    return (
        <ImageBackground
            style={styles.imgBackground}
            source={require('../assets/img/home_title_bg.png')}>

            <View style={{
                ...DefaultStyles.flexContainer,
                paddingHorizontal: 10,
                paddingTop: 30,
                marginBottom: 20
            }}>

                <View style={DefaultStyles.w50}>
                    <View>
                        <Text style={{...styles.text, fontSize: 14}}>
                            স্বাগতম,
                        </Text>
                        <Text style={{ fontSize: 17, color: Colors.fontColor1, fontWeight: 'bold', textTransform: 'uppercase' }}>
                            {user.USER.name}
                            {/*{JSON.stringify(user.USER)}*/}
                        </Text>
                        <Text style={{ fontSize: 14, color: Colors.fontColor1, fontWeight: '200', textTransform: 'uppercase' }}>
                            আপনি একজন {user.USER.role.title} হিসেবে যুক্ত হয়েছেন
                        </Text>
                        <Text style={{ fontSize: 14, color: Colors.fontColor1, marginTop: 22 }}>
                            "মানবতার ঘর" এর সাথে থাকার জন্য আপনার প্রতি কৃতজ্ঞতা
                        </Text>
                    </View>
                </View>
                <View style={{ ...DefaultStyles.w50, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/img/logoInner.png')}/>
                        {/*<FontAwesome5 name={'user-circle'} style={{*/}
                        {/*    color: Colors.fontColor1,*/}
                        {/*    fontSize: 25,*/}
                        {/*}}/>*/}
                        {/*<Text style={{*/}
                        {/*    color: '#faac70',*/}
                        {/*    fontSize: 15,*/}
                        {/*    fontWeight: 'bold',*/}
                        {/*}}> {user.USER.role.title} </Text>*/}
                    </View>
                </View>
            </View>


            <View style={{ ...DefaultStyles.halfBody, height: '100%' }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ ...DefaultStyles.flexContainer, ...DefaultStyles.middle, marginBottom: 20 }}>
                        <TouchableOpacity onPress={() => {props.navigation.navigate('MoneyList')}} style={{...DefaultStyles.w30, ...DefaultStyles.middle, ...styles.project}}>
                            <FontAwesome5 name={'donate'} style={{...styles.projectIcons}}/>
                            <Text style={{ ...styles.projectTitle }}> অর্থ </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Foods') }} style={{...DefaultStyles.w30, ...DefaultStyles.middle, ...styles.project}}>
                            <MaterialCommunityIcons name={'food-variant'} style={{...styles.projectIcons}} />
                            <Text style={{ ...styles.projectTitle }}> খাদ্য </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} style={{...DefaultStyles.w30, ...DefaultStyles.middle, ...styles.project}}>
                            <Entypo name={'drop'} style={{...styles.projectIcons}} />
                            <Text style={{...styles.projectTitle}}> রক্ত </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Treatment') }} style={{...DefaultStyles.w30, ...DefaultStyles.middle, ...styles.project}}>
                            <AntDesign name={'medicinebox'} style={{...styles.projectIcons}}/>
                            <Text style={{...styles.projectTitle}}> চিকিৎসা </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} style={{...DefaultStyles.w30, ...DefaultStyles.middle, ...styles.project}}>
                            <Feather name={'gift'} style={{...styles.projectIcons}}/>
                            <Text style={{...styles.projectTitle}}> পোশাক </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={{ ...DefaultStyles.w30, ...DefaultStyles.middle, ...styles.project }}>
                            <MaterialIcons name={'event-note'} style={{...styles.projectIcons}} />
                            <Text style={{...styles.projectTitle}}> ইভেন্টস </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} style={{ ...DefaultStyles.w30, ...DefaultStyles.middle, ...styles.project }}>
                            <Ionicons name={'md-people'} style={{...styles.projectIcons}} />
                            <Text style={{...styles.projectTitle}}>সদস্য</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('ReportIndex') }} style={{ ...DefaultStyles.w30, ...DefaultStyles.middle, ...styles.project }}>
                            <Feather name={'book'} style={{...styles.projectIcons}} />
                            <Text style={{...styles.projectTitle}}> রিপোর্ট </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={{ ...DefaultStyles.w30, ...DefaultStyles.middle, ...styles.project }}>
                            <Ionicons name={'md-information-circle-outline'} style={{...styles.projectIcons}}/>
                            <Text style={{...styles.projectTitle}}> আমরা </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

HomeScreen.navigationOptions = navData => {
    return {
        headerTitle: () => (
            <Text style={DefaultStyles.headerTitle}>
                Dashboard
            </Text>
        )
    };
};

const styles = StyleSheet.create({
    imgBackground: {
        flex: 1,
        resizeMode: "cover",
        width: '100%',
        height: '100%'
    },
    projectIcons: {
        fontSize: 40,
        color: Colors.baseColor1
    },
    projectTitle: {
        fontSize: 14,
        marginTop: 20
    },
    project: {
        padding: 15,
        borderRadius: 5,
        margin: 5,
        elevation: 4,
        backgroundColor: '#fafcfb',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },
    text: {
        color: Colors.fontColor1,
        textShadowColor: 'white',
        textShadowOffset: {width: 1, height: 0},
        textShadowRadius: 1,
    }
});

export default inject("store")(observer(HomeScreen));
