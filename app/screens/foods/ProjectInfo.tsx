import { inject, observer } from 'mobx-react';
import * as React from 'react';
import {Text,StyleSheet, Button, Image,TextInput, View,ScrollView, ImageBackground,Linking,TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Colors from '../../constants/Colors'
import DefaultStyles from '../../constants/DefaultStyles'
import Config from '../../services/config'
import Spinner from '../../components/helpers/Spinner';

class DoctorProfile extends React.Component {
  
  state = {
    loading: false,
    project: null,
    donateType: 1,
    moneyAmount: 0,
    foodPerson: 1,
    foodDate: null
  };

  constructor(props) {
    super(props);
  }


  render() {

    const {food,payment} = this.props.store


    if(this.state.loading){
        return (<Spinner/>)
      }

    if(food.STORE_FOOD_DONATION && food.STORE_FOOD_DONATION.type == 'success'){
        return (
            <View style={{
                ...DefaultStyles.flex,
                ...DefaultStyles.middle,
                ...DefaultStyles.m5,
                ...DefaultStyles.p5
            }}>
                {food.STORE_FOOD_DONATION?.messages.map((item,index) => {
                    if(index == 0){
                        return <Text style={{...DefaultStyles.inputTitle}} key={index.toString()}>{item}</Text>
                    }
                    return <Text style={{textAlign:'left'}} key={index.toString()}>{item}</Text>
                })}
            </View>
        )
    }


    return (
<ScrollView contentContainerStyle={{flexGrow: 1}}>
<ImageBackground style={{width: '100%', height: '100%',alignItems:'center'}} 
        source={require('../../assets/img/title_bg.jpg')}>


    <View style={{
    ...DefaultStyles.halfHeader
    }}>

    </View>
    <View style={{
    ...DefaultStyles.halfBody
    }}>

        <View style={{
            ...DefaultStyles.flexContainer
        }}>

            <View style={{
                ...DefaultStyles.w30
            }}>
                 <Text>প্রকল্পের নামঃ </Text>
            </View>

            <View style={{
                ...DefaultStyles.w70
            }}>
                 <Text>{this.state.project?.title}</Text>
            </View>

        </View>

        <View style={{
            ...DefaultStyles.flexContainer
        }}>

            <View style={{
                ...DefaultStyles.w30
            }}>
                 <Text>বিস্তারিতঃ </Text>
            </View>

            <View style={{
                ...DefaultStyles.w70
            }}>
                 <Text>{this.state.project?.description}</Text>
            </View>

        </View>

        <View>

            <View style={{
                ...DefaultStyles.flexContainer,
                marginTop: 20
            }}>

                <View style={{
                    ...DefaultStyles.flexContainer,
                    marginRight: 10,
                    ...DefaultStyles.m5
                }}>
                    <TouchableOpacity style={{
                        width: 20,
                        height: 20,
                        backgroundColor: this.state.donateType == 1 ? 'green':'white',
                        borderWidth: 2,
                        borderColor:'grey',
                        borderRadius: 25,
                        marginRight: 10
                    }} onPress={() => {
                        this.setState({
                            donateType: 1
                        })
                    }}>

                    </TouchableOpacity>
                    <Text style={{
                        ...DefaultStyles.inputTitle
                    }}>খাদ্য</Text>
                </View>
                <View>

                        <View style={{...DefaultStyles.flexContainer}}>
                            <View style={{...DefaultStyles.w35,...DefaultStyles.m5}}>
                                <Text>কত জনের ?</Text>
                                <TextInput style={{...DefaultStyles.inputField,backgroundColor: this.state.donateType == 1 ? 'white' : '#ddd'}} 
                                           underlineColorAndroid='transparent' 
                                           editable={this.state.donateType == 1} 
                                        //    value={this.state.foodPerson}
                                           onChangeText={(value) =>  {
                                               this.setState({
                                                foodPerson: value
                                               })
                                           }}
                                           keyboardType={'numeric'}/>
                            </View>
                            <View style={{...DefaultStyles.w35,...DefaultStyles.m5}}>
                                <Text>তারিখ</Text>
                                <TextInput style={{...DefaultStyles.inputField,backgroundColor: this.state.donateType == 1 ? 'white' : '#ddd'}} 
                                           underlineColorAndroid='transparent' 
                                           onChangeText={(value) => {
                                               this.setState({
                                                   foodDate: value
                                               })
                                           }}
                                           editable={this.state.donateType == 1}/>
                            </View>                    
                        </View>
            
                </View>
            </View>
            

            <View style={{
                ...DefaultStyles.flexContainer,
                marginTop: 20
            }}>

                <View style={{
                    ...DefaultStyles.flexContainer,
                    marginRight: 10,
                    ...DefaultStyles.m5
                }}>
                    <TouchableOpacity style={{
                        width: 20,
                        height: 20,
                        backgroundColor: this.state.donateType == 2 ? 'green':'white',
                        borderWidth: 2,
                        borderColor:'grey',
                        borderRadius: 25,
                        marginRight: 10
                    }} onPress={() => {
                        this.setState({
                            donateType: 2
                        })
                    }}>

                    </TouchableOpacity>
                    <Text style={{
                        ...DefaultStyles.inputTitle
                    }}>টাকা</Text>
                </View>
                <View>
                        <View style={{...DefaultStyles.flexContainer}}>
                            <View style={{...DefaultStyles.w65,...DefaultStyles.m5}}>
                                <Text>কত টাকা ?</Text>
                                <TextInput style={{...DefaultStyles.inputField,backgroundColor: this.state.donateType == 2 ? 'white' : '#ddd'}} 
                                           editable={this.state.donateType == 2}
                                           onChangeText={(value) => {
                                               this.setState({
                                                   moneyAmount: value
                                               })
                                           }}
                                        //    value={this.state.moneyAmount}
                                           keyboardType={'numeric'}/>
                            </View>                  
                        </View>
                </View>
            </View>
            

        </View>

        <View>
            <TouchableOpacity style={{
                ...DefaultStyles.loginButtonContainer
            }} onPress={() => this.donate(this.state.donateType)}>
                <Text style={{
                    ...DefaultStyles.loginButton
                }}>
                    পরবর্তি ধাপ
                </Text>
            </TouchableOpacity>
        </View>
    </View>


</ImageBackground>
</ScrollView>
    );
  }






componentDidMount() {
  const project = this.props.navigation.getParam('project')
  const {food} = this.props.store

  this.setState({
      loading: true
  })

  food.setStoreFoodDonation(null)

  this.setState({
    project: project
  })

  this.setState({
      loading: false
  })

}

async donate(type){

    this.setState({
        loading: true
    })

    if(type == 1){

        const attr = {
            project_id: this.state.project.id,
            person: this.state.foodPerson,
            date: this.state.foodDate
        }

        await this.foodDonate(attr);

    }else if(type == 2){
        const attr = {
            project_id: this.state.project.id,
            amount: this.state.moneyAmount
        }

        await this.moneyDonate(attr)
    }

    this.setState({
        loading: false
    })
}

async shurjoPay(){
    const {payment} = this.props.store

    await payment.fetchShurjopayRequest({
        amount: this.state.moneyAmount
    })

}

async moneyDonate(attr){
const {food} = this.props.store

const res = await food.fetchStoreMoneyDonation(attr)

if(food.STORE_MONEY_DONATION?.type == 'success'){
    Linking.openURL(Config.apiURI+`api/payment/shurjopay?amount=${this.state.moneyAmount}&id=${food.STORE_MONEY_DONATION?.result}&type=food`)
}


}


async foodDonate(attr){

const {food} = this.props.store
const res = await food.fetchStoreFoodDonation(attr)

}


}

const styles = StyleSheet.create({

});


DoctorProfile.navigationOptions = navData => {
  return {
    headerTitle: () => (
        <Text style={DefaultStyles.headerTitle}>বিস্তারিত</Text>
    )
  };
};

export default inject("store")(observer(DoctorProfile));