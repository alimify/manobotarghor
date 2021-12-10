import { inject, observer } from 'mobx-react';
import * as React from 'react';
import {Text,StyleSheet, TextInput, Image, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {AntDesign } from "@expo/vector-icons";
import Colors from '../../constants/Colors'
import storage from "../../services/asyncStorage";
import DefaultStyles from '../../constants/DefaultStyles'
import Spinner from "../../components/helpers/Spinner";
import axios from 'axios'
import Config from '../../services/config'
import {LinearGradient} from "expo-linear-gradient";

class NIDCard extends React.Component {
  
  state = {
    loading: false,
    image: null,
    imageResource: null
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
        <ImageBackground style={{width: '100%', height: '100%',alignItems:'center'}} 
                source={require('../../assets/img/bottom_inner_title_bg.png')}>
        
            <View style={{
            ...DefaultStyles.halfHeader,
            paddingBottom: 10,
            }}>
        
            </View>
        
        
            <View style={{
            ...DefaultStyles.halfBody,
            paddingHorizontal: 20,
            width: '60%'
            }}>
                {user.CHANGE_PASSWORD && this.errorMSG(user.CHANGE_PASSWORD)}
                {this.ImageArea()}
                <View>
                    <TouchableOpacity onPress={this.changeNID.bind(this)} style={{
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

                <View style={{
                  alignItems: 'center',
                  ...DefaultStyles.p5
                }}>
                   {this.props.store.user.USER.nid_img && (
                     <Image source={{uri: Config.assetURI+this.props.store.user.USER.nid_img }} style={{width: '90%',height: '60%'}}/>
                   )}
                </View>
            </View>
        
        </ImageBackground>
      </ScrollView>   
            );

}

async changeNID(){

    this.setState({
        loading: true
    })
          // ImagePicker saves the taken photo to disk and returns a local URI to it
          let result = this.state.imageResource
          if(result){
          let localUri = result.uri;
          let filename = localUri.split('/').pop();
        
          // Infer the type of the image
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
        
          const token = await storage.get('token')
          // Upload the image using the fetch and FormData APIs
          let formData = new FormData();
          // Assume "photo" is the name of the form field the server expects
          formData.append('image', { uri: localUri, name: filename, type });
          const apiRes = await axios({method: 'POST',url: Config.apiURI+'api/user/changeNID',data: formData,headers: {'Accept': 'application/json','Authorization': 'Bearer ' + token}});  
          await this.props.store.user.fetchUser()  
          this.setState({
            image: null,
            imageResource: null
          }) 
         }
    this.setState({
        loading: false
    })

}

ImageArea(){
    let { image } = this.state;

    let {user} = this.props.store

    return (
      <View style={{
          ...DefaultStyles.middle,
      }}>
      <ImageBackground source={{ uri: image}} style={{
        ...styles.imgProfie,
        ...DefaultStyles.mb5
      }} imageStyle={{
        ...styles.imgProfie
      }}>
        <TouchableOpacity onPress={this._pickImage.bind(this)}>
            <AntDesign name="plus" style={{
                fontSize: 30,
                color: Colors.baseColor
            }}/>
        </TouchableOpacity>
      </ImageBackground>
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
    await this.getPermissionAsync();
    await this.props.store.user.fetchUser()
    this.setState({
      image: Config.assetURI+(this.props.store?.user?.USER?.image_directory)
    })

    this.setState({
      loading: false
    })

  }



  async getPermissionAsync(){

    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

  };

  async _pickImage(){

    try {

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result)

      if (!result.cancelled) {
        this.setState({ image: result.uri });
        this.setState({
          imageResource: result
        })

      }

    } catch (E) {
      console.log(E);
    }

  };


}

const styles = StyleSheet.create({

    imgProfie: {
        height:  150,
        width: 250,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        borderWidth: 1,
        borderColor: Colors.baseColor
      }

});


NIDCard.navigationOptions = navData => {
    return {
      headerTitle: () => (
        <Text style={DefaultStyles.headerTitle}>
            জাতীয় পরিচয় পত্র 
        </Text>
      )
    };
  };

export default inject("store")(observer(NIDCard));