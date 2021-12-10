import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Text, StyleSheet, Button, Image, View, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors'
import DefaultStyles from '../../constants/DefaultStyles'
import {FontAwesome5} from "@expo/vector-icons";

class Index extends React.Component {
    state = {
        image: null,
    };

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <ImageBackground style={{width: '100%', height: '100%', alignItems: 'center'}}
                                 source={require('../../assets/img/bottom_inner_title_bg.png')}>
                    <View style={{...DefaultStyles.halfBody, height: '100%'}}>
                        <ScrollView contentContainerStyle={{flexGrow: 1}}>
                            <View style={{}}>
                                <View
                                    style={{...DefaultStyles.flexContainer, ...DefaultStyles.middle, marginBottom: 20}}>
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('DoctorUrgentHelp')
                                    }} style={{...DefaultStyles.w70, ...DefaultStyles.middle, ...styles.project}}>
                                        <FontAwesome5 name={'phone'} style={{...styles.projectIcons}}/>
                                        <Text style={{
                                            ...DefaultStyles.inputTitle, ...DefaultStyles.middle,
                                            paddingTop: 10,
                                            textAlign: 'center'
                                        }}>
                                            জরুরী করোনা হেল্প লাইন
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('DoctorList')
                                    }} style={{...DefaultStyles.w70, ...DefaultStyles.middle, ...styles.project}}>
                                        <FontAwesome5 name={'bong'} style={{...styles.projectIcons}}/>
                                        <Text style={{
                                            ...DefaultStyles.inputTitle, ...DefaultStyles.middle,
                                            paddingTop: 10,
                                            textAlign: 'center'
                                        }}>
                                            টেলিমেডিসিন সেবা দিতে চাই
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('DoctorList')
                                    }} style={{...DefaultStyles.w70, ...DefaultStyles.middle, ...styles.project}}>
                                        <FontAwesome5 name={'bong'} style={{...styles.projectIcons}}/>
                                        <Text style={{
                                            ...DefaultStyles.inputTitle, ...DefaultStyles.middle,
                                            paddingTop: 10,
                                            textAlign: 'center'
                                        }}>
                                            রক্ত দিতে চাই
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                </ImageBackground>
            </ScrollView>
        );
    }


    componentDidMount() {

    }


}

const styles = StyleSheet.create({

    row: {
        backgroundColor: 'white',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
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
        paddingVertical: 30,
        padding: 15,
        borderRadius: 5,
        margin: 10,
        elevation: 4,
        backgroundColor: '#fafcfb',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },

});


Index.navigationOptions = navData => {
    return {
        headerTitle: () => (
            <Text style={DefaultStyles.headerTitle}> চিকিৎসা </Text>
        )
    };
};

export default inject("store")(observer(Index));