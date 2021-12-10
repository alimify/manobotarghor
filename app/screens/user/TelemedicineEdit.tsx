import { inject, observer } from 'mobx-react';
import * as React from 'react';
import {
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Image,
    Picker,
    View,
    Switch,
    ImageBackground,
    Keyboard,
    ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {AntDesign } from "@expo/vector-icons";
import Colors from '../../constants/Colors'
import storage from "../../services/asyncStorage";
import DefaultStyles from '../../constants/DefaultStyles'
import DefaultFunc from '../../constants/DefaultFunc'
import Spinner from "../../components/helpers/Spinner";
import { RadioButton,Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

class ChangePassword extends React.Component {
  
  state = {
    loading: false,
    willDoctor: false,
    degreeTitle: null,
    workplace: null,
    workTitle: null,
    medivision: null,
    whatsapp: null,


    scheduleType: 'weekly',
    scheduleDays: [],

    fromTimePickerShow: false,
    toTimePickerShow: false,

    fromTimestamp: null,
    toTimestamp: null

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
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <KeyboardAvoidingView behavior="height">
              
                     <TouchableWithoutFeedback onPress={() => {
                  Keyboard.dismiss()
              }}>
                <ImageBackground style={{width: '100%', height: '100%',alignItems:'center'}} 
                source={require('../../assets/img/title_bg.jpg')}>

            <View style={{
            ...DefaultStyles.halfHeader,
            paddingBottom: 10,
            }}>
        
            </View>
        
                
            <View style={{
            ...DefaultStyles.halfBody,
            paddingHorizontal: 20,
            width: '100%'
            }}>
                <View style={{...DefaultStyles.flexContainer}}>

                    <View>
                        <Text>
                            আপনি কি টেলিমেডিসিন সেবা দিতে ইচ্ছুক ? 
                        </Text>
                    </View>

                    <View>
                            <Switch value={this.state.willDoctor} onValueChange={async (v) => {

                                this.setState({
                                    willDoctor: v
                                })

                                await this.props.store.user.fetchUpdateTelemedicine()
                                this.setState({
                                    willDoctor: this.props.store.user.UPDATE_DOCTOR_TELEMEDICINE 
                                                && this.props.store.user.UPDATE_DOCTOR_TELEMEDICINE.result
                                })

                            }} trackColor={{ true: Colors.baseColor, false: ''}}
                               thumbColor={Colors.baseColor}
                            />
                    </View>

                </View>

                 {this.state.willDoctor && this.proForm()}
            
            </View>
        
        </ImageBackground>
              </TouchableWithoutFeedback>
        
          </KeyboardAvoidingView>
        </ScrollView>
            );

}



 proForm(){

    const {common,user} = this.props.store

    return (
    <View>
         <View>
            <Text style={{...DefaultStyles.inputTitle}}>চিকিৎসা বিষয়ক ডিগ্রী</Text>
            <TextInput onChangeText={(value) => {
                this.setState({
                    degreeTitle: value
                })
            }} value={this.state.degreeTitle} 
            style={{
                ...DefaultStyles.inputField,
                borderWidth: 1,
                borderColor: user.DOCTOR_TELEMEDICINE_DATA?.type == 'missing' 
                             && user.DOCTOR_TELEMEDICINE_DATA?.messages?.degreeTitle ? 'red' : "white"
            }}
                    placeholder=""/>

         </View>

         <View>

            <Text style={{...DefaultStyles.inputTitle}}>বর্তমান কর্মস্থল</Text>
            <TextInput onChangeText={(value) => {
                this.setState({
                    workplace: value
                })
            }} value={this.state.workplace} 
            style={{
                ...DefaultStyles.inputField,
                borderWidth: 1,
                borderColor: user.DOCTOR_TELEMEDICINE_DATA?.type == 'missing' 
                             && user.DOCTOR_TELEMEDICINE_DATA?.messages?.workplace ? 'red' : "white"
            }}
                    placeholder=""/>
                             
         </View>


         <View>

            <Text style={{...DefaultStyles.inputTitle}}>পদবী</Text>
            <TextInput onChangeText={(value) => {
                this.setState({
                    workTitle: value
                })
            }} value={this.state.workTitle} 
            style={{
                ...DefaultStyles.inputField,
                borderWidth: 1,
                borderColor: user.DOCTOR_TELEMEDICINE_DATA?.type == 'missing' 
                             && user.DOCTOR_TELEMEDICINE_DATA?.messages?.workTitle ? 'red' : "white"            
            }}
                    placeholder=""/>
                                
         </View>



            <View>
                <Text style={{...DefaultStyles.inputTitle}}>হোয়াটস অ্যাপ নাম্বার</Text>
                <TextInput onChangeText={(value) => {
                    this.setState({
                        whatsapp: value
                    })
                }} value={this.state.whatsapp} 
                style={{
                    ...DefaultStyles.inputField,
                    borderWidth: 1,
                    borderColor: user.DOCTOR_TELEMEDICINE_DATA?.type == 'missing' 
                                 && user.DOCTOR_TELEMEDICINE_DATA?.messages?.whatsapp ? 'red' : "white"
                
                }}
                        placeholder=""/>
                    
            </View>
                    


            <View>
                           <Text style={{
                               ...DefaultStyles.inputTitle
                           }}>যে ধরনের চিকিৎসা দিতে ইচ্ছুক</Text>
                           <View style={{
                               borderWidth: user.DOCTOR_TELEMEDICINE_DATA?.type == 'missing' 
                                            && user.DOCTOR_TELEMEDICINE_DATA?.messages?.medivision ? 1 : 0,
                               borderColor: user.DOCTOR_TELEMEDICINE_DATA?.type == 'missing' 
                                            && user.DOCTOR_TELEMEDICINE_DATA?.messages?.medivision ? 'red' : "white",
                               ...DefaultStyles.m5
                           }}>
                           <Picker
                                selectedValue={this.state.medivision}
                                onValueChange={async (itemValue, itemIndex) => {
                                    this.setState({
                                        medivision: itemValue
                                    })
                                }}>
                                    <Picker.Item 
                                                label="নির্বাচন করুন" 
                                                value={null} />
                    
                            {common.DOCTOR_HELP_TITLES.map((item,index) => {
                                return (
                                    <Picker.Item 
                                                    key={index.toString()}
                                                    label={item.bn_title} 
                                                    value={item.id} />
                                )
                            })}
                    
                            </Picker>
                            </View>
 
            </View>

            <View>
                <View>
                    <Text style={{
                        ...DefaultStyles.inputTitle
                    }}>রোগী দেখার সময়সূচি</Text>
                </View>
                <View style={{
                    ...DefaultStyles.flexContainer,
                    alignItems:'center'
                }}>
                    
                    {/* <RadioButton
                                value="true"
                                status={this.state.scheduleType == 'monthly' ? 'checked' : 'unchecked'}
                                color={Colors.baseColor}
                                onPress={() => { this.setState({ scheduleType: 'monthly' }); }}/>
                            <Text>প্রতি মাসে</Text> */}


                            <RadioButton
                                value="true"
                                status={this.state.scheduleType == 'weekly' ? 'checked' : 'unchecked'}
                                color={Colors.baseColor}
                                onPress={() => { this.setState({ scheduleType: 'weekly' }); }}/>
                            <Text>প্রতি সপ্তাহে</Text>

                            {/* <RadioButton
                                value="true"
                                status={this.state.scheduleType == 'daily' ? 'checked' : 'unchecked'}
                                color={Colors.baseColor}
                                onPress={() => { this.setState({ scheduleType: 'daily' }); }}/>
                            <Text>প্রতি দিন</Text> */}
                </View>
                
                <View>
                    {/* {this.state.scheduleType == 'monthly' && this.monthlyDayMarking()} */}
                    {this.state.scheduleType == 'weekly' && this.weeklyDayMarking()}
                </View>


                <View>
                    <View>
                        <Text style={{
                            ...DefaultStyles.inputTitle
                        }}>সময়</Text>
                    </View>

                    <View style={{
                        ...DefaultStyles.flexContainer,
                        alignItems:'center'
                    }}>
                        <TextInput style={{
                            ...DefaultStyles.inputField,
                            ...DefaultStyles.w20,
                            ...DefaultStyles.mr5
                        }} onFocus={() => {
                            this.setState({
                                fromTimePickerShow: true
                            })
                        }} onChangeText={() => {
                            this.setState({
                                fromTimePickerShow: true
                            })
                        }} onBlur={() => {
                            this.setState({
                                fromTimePickerShow: false
                            })
                        }} value={DefaultFunc.humanReadableTime(this.state.fromTimestamp).toString()}/>
                        <Text style={{
                            ...DefaultStyles.inputTitle,
                            ...DefaultStyles.mr5
                        }}>থেকে</Text>
                        <TextInput style={{
                            ...DefaultStyles.inputField,
                            ...DefaultStyles.w20
                        }} onFocus={() => {
                            this.setState({
                                toTimePickerShow: true
                            })
                        }} onChangeText={() => {
                            this.setState({
                                toTimePickerShow: true
                            })
                        }} onBlur={() => {
                            this.setState({
                                toTimePickerShow: false
                            })
                        }} value={DefaultFunc.humanReadableTime(this.state.toTimestamp).toString()}/>
                    </View>
                </View>
            </View>
         <View>
                <TouchableOpacity style={{
                    ...DefaultStyles.loginButtonContainer
                }} onPress={async () => {

                    const data = {
                        degreeTitle: this.state.degreeTitle,
                        workplace: this.state.workplace,
                        workTitle: this.state.workTitle,
                        medivision: this.state.medivision,
                        whatsapp: this.state.whatsapp,
                        schedule_type: this.state.scheduleType,
                        schedule_days: this.state.scheduleDays,
                        time_from: this.state.fromTimestamp,
                        time_to: this.state.toTimestamp
                    }

                    this.setState({
                        loading: true
                    })

                    await this.props.store.user.fetchDoctorTelemedicineData(data)

                    this.setState({
                        loading: false
                    })
                }}>
                    <Text style={{
                        ...DefaultStyles.loginButton
                    }}>সংরক্ষণ করুন</Text>
                </TouchableOpacity>
        </View>
          {this.toTimePicker()}
          {this.fromTimePicker()}
    </View>)
}


monthlyDayMarking(){

    return (<View>
        <Text>monthly day marking..</Text>
    </View>)
}


weeklyDayMarking(){

    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (<View style={{
        ...DefaultStyles.flexContainer,
        alignItems:'center'
    }}>
        {daysInWeek.map((item,index) => {
            return (
                <View key={index.toString()} style={{
                    ...DefaultStyles.flexContainer,
                    alignItems:'center',
                    // ...DefaultStyles.m5,
                    ...DefaultStyles.w25
                }}>
                    <Checkbox status={this.state.scheduleDays.includes(item) ?'checked':'unchecked'} 
                              color={Colors.baseColor}
                              onPress={() => {

                                    const allDays = this.state.scheduleDays.includes(item) ? 
                                                    this.state.scheduleDays.filter((day) => {
                                                        return day != item
                                                    }) : [...this.state.scheduleDays,...[item]];

                                        this.setState({
                                            scheduleDays: allDays
                                        })


                              }}/>
                    <Text>{item.toString()}</Text>
                </View>
            )
        })}
    </View>)
}


fromTimePicker(){
    return (
      <View>
        {this.state.fromTimePickerShow && 
        <View>
          <DateTimePicker
            testID={"fromTimePicker"}
            timeZoneOffsetInMinutes={0}
            value={new Date()}
            mode={'time'}
            is24Hour={true}
            display="default"
            onChange={(date) => {
                this.setState({
                    fromTimestamp: date.nativeEvent?.timestamp,
                    fromTimePickerShow: false
                })
            }}
          />
      </View>}
      </View>
    )
  }


toTimePicker(){
return (
    <View>
    {this.state.toTimePickerShow && 
    <View>
        <DateTimePicker
        testID={"toTimePicker"}
        timeZoneOffsetInMinutes={0}
        value={new Date()}
        mode={'time'}
        is24Hour={true}
        display="default"
        onChange={(date) => {
            this.setState({
                toTimestamp: date.nativeEvent?.timestamp,
                toTimePickerShow: false
            })        }}
        />
    </View>}
    </View>
)
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


async componentDidMount() {
    this.setState({
        loading: true
    })

    await this.props.store.common.fetchDoctorHelpTitles()
    await this.props.store.user.fetchUser()

    this.setState({
        willDoctor: Boolean(this.props.store.user.USER?.doctor_help),
        degreeTitle: this.props.store.user.USER?.doctor_degree,
        workplace: this.props.store.user.USER?.doctor_workplace,
        workTitle: this.props.store.user.USER?.doctor_title,
        medivision: this.props.store.user.USER?.doctor_help_id,
        whatsapp: this.props.store.user.USER?.whatsapp,
        scheduleDays: this.props.store.user.USER?.doctor_schedule_days ?
                        JSON.parse(this.props.store.user.USER?.doctor_schedule_days) :[],
        toTimestamp: this.props.store.user.USER?.doctor_schedule_time_to,
        fromTimestamp: this.props.store.user.USER?.doctor_schedule_time_from
    })

    this.setState({
        loading: false
    })
}


}

const styles = StyleSheet.create({



});


ChangePassword.navigationOptions = navData => {
    return {
      headerTitle: () => (
        <Text style={DefaultStyles.headerTitle}>
            টেলিমেডিসিন সেবা দিতে ইচ্ছুক 
        </Text>
      )
    };
  };

export default inject("store")(observer(ChangePassword));