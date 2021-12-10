import { inject, observer } from 'mobx-react';
import * as React from 'react';
import {
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    View,
    ImageBackground,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {AntDesign } from "@expo/vector-icons";
import Colors from '../../constants/Colors'
import storage from "../../services/asyncStorage";
import DefaultStyles from '../../constants/DefaultStyles'
import Spinner from "../../components/helpers/Spinner";
import {LinearGradient} from "expo-linear-gradient";

class ChangePassword extends React.Component {
  
  state = {
    password: null,
    repeatPassword: null,
    oldPassword: null,
    loading: false
  };

  constructor(props) {
    super(props);
  }


  render() {

    const {user} = this.props.store;

    if(this.state.loading){
        return (<Spinner/>)
    }


      return (
          <KeyboardAvoidingView behavior="height">
              <TouchableWithoutFeedback onPress={() => {
                  Keyboard.dismiss()
              }}>
                <ImageBackground style={{width: '100%', height: '100%',alignItems:'center'}} 
                source={require('../../assets/img/bottom_inner_title_bg.png')}>
        
                    <View style={{ width: '100%' }}>
                        {this.errorMSG(user.CHANGE_PASSWORD)}

                        <ScrollView contentContainerStyle={{flexGrow: 1}}>
                            <View style={{...DefaultStyles.halfBody}}>
                                <View style={{marginTop: 5, marginHorizontal: 20}}>
                                    <Text style={{ ...DefaultStyles.inputTitle }}>পুরাতন পাসওয়ার্ড</Text>
                                    <TextInput onChangeText={(value) => {
                                        this.setState({
                                            oldPassword: value
                                        })
                                    }}
                                   value={this.state.oldPassword}
                                   style={{
                                       borderColor: user.CHANGE_PASSWORD
                                       && (user.CHANGE_PASSWORD.type == 'error' ||
                                           user.CHANGE_PASSWORD.messages.hasOwnProperty('oldPassword'))  ? 'red' : 'white',
                                       ...DefaultStyles.inputFieldSam
                                   }}
                                   secureTextEntry={true}
                                   placeholder=""/>



                                <Text style={{...DefaultStyles.inputTitle}}> নতুন পাসওয়ার্ড </Text>
                                <TextInput onChangeText={(value) => {
                                    this.setState({
                                        password: value
                                    })
                                }}
                                           value={this.state.password}
                                           style={{
                                               borderColor: user.CHANGE_PASSWORD
                                               && user.CHANGE_PASSWORD.messages.hasOwnProperty('password') ? 'red' : 'white',
                                               ...DefaultStyles.inputFieldSam
                                           }}
                                           secureTextEntry={true}
                                           placeholder=""/>

                                <Text style={{...DefaultStyles.inputTitle}}>আবার দিন</Text>
                                <TextInput onChangeText={(value) => {
                                    this.setState({
                                        repeatPassword: value
                                    })
                                }}
                                           value={this.state.repeatPassword}
                                           style={{
                                               borderWidth: 1,
                                               borderColor: false ? 'red' : 'white',
                                               ...DefaultStyles.inputFieldSam
                                           }}
                                           secureTextEntry={true}
                                           placeholder=""/>

                                    <View style={{ width: '50%' }}>
                                        <TouchableOpacity onPress={this.changePassword.bind(this)} style={{
                                            ...DefaultStyles.loginButtonContainer
                                        }}>
                                            <View style={{flex: 1}}>
                                                <LinearGradient style={{flex: 1, alignItems: 'center', borderRadius: 5}}
                                                                colors={['#21a81b', '#99d151']}
                                                                start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}>
                                                    <Text style={{ ...DefaultStyles.gradientBtn }}>
                                                        পরিবর্তন করুন
                                                    </Text>
                                                </LinearGradient>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>


                    </View>

                </ImageBackground>
              </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

            );

}

async changePassword(){

    this.setState({
        loading: true
    })

    const {user} = this.props.store,
          oldPassword = this.state.oldPassword,
          password = this.state.password,
          password_confirmation = this.state.repeatPassword

    await user.fetchChangePassword({
        password_confirmation,
        password,
        oldPassword
    })

    this.setState({
        loading: false
    })

    setTimeout(() => {
        user.setChangePassword(false)
    },19000)

}


errorMSG(response){

    return (
        <Text style={{
            color: response.type == 'success' ? 'green': 'red',
            textAlign: 'center'
        }}>
        {response && response.type != 'missing' ? response.messages : ''}
    </Text>
    )
}


componentDidMount() {

}


  



}

const styles = StyleSheet.create({



});


ChangePassword.navigationOptions = navData => {
    return {
      headerTitle: () => (
        <Text style={DefaultStyles.headerTitle}>
            পাসওয়ার্ড পরিবর্তন 
        </Text>
      )
    };
  };

export default inject("store")(observer(ChangePassword));