import React from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../components/helpers/Spinner";
import DefaultStyles from "../constants/DefaultStyles";
import Colors from "../constants/Colors";

import {
    StyleSheet,
    View,
    Text,
    ImageBackground, ScrollView
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

const NewsfeedScreen = props => {
    return (
        <ImageBackground
            style={styles.imgBackground}
            source={require('../assets/img/inner_title_bg.png')}>

            <View style={{
                ...DefaultStyles.flexContainer,
                paddingHorizontal: 10,
                paddingTop: 30,
                marginBottom: 20
            }}>
                <View style={DefaultStyles.w50}>
                    <View>
                        <Text style={{...DefaultStyles.screenTitle }}> নিউজফিড </Text>
                        <Text style={{fontSize: 14, color: Colors.fontColor1, marginTop: 15}}>
                            "মানবতার ঘর" এর সাথে থাকার জন্য আপনার প্রতি কৃতজ্ঞতা
                        </Text>
                    </View>
                </View>


                <View style={{...DefaultStyles.halfBody, height: '100%'}}>
                    <ScrollView contentContainerStyle={{flexGrow: 1, height: '100%'}}>
                        <View style={{...DefaultStyles.flexContainer, ...DefaultStyles.middle, marginBottom: 20}}>
                            <Text>নিউজফিড স্ক্রীণের কাজ ডেভেলপমেন্ট পর্যায় আছে</Text>
                        </View>
                    </ScrollView>
                </View>

            </View>
        </ImageBackground>
    );
};

NewsfeedScreen.navigationOptions = navData => {
    return {
        headerTitle: () => (
            <Text style={DefaultStyles.headerTitle}>
                Chats
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
    }
});

export default (observer(NewsfeedScreen));
