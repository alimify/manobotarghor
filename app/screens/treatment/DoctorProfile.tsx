import { inject, observer } from 'mobx-react';
import * as React from 'react';
import {Text,StyleSheet, Button, Image, View,ScrollView, ImageBackground,Linking,TouchableOpacity,Clipboard  } from 'react-native';
import Colors from '../../constants/Colors'
import DefaultStyles from '../../constants/DefaultStyles'
import DefaultFunc from '../../constants/DefaultFunc'
import Config from '../../services/config'
import {AntDesign} from '@expo/vector-icons'

class DoctorProfile extends React.Component {
  
  state = {
    profile: null,
  };

  constructor(props) {
    super(props);
  }


  render() {



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
        alignItems:'center'
      }}>
        <Image source={{uri: Config.assetURI+this.state.profile?.image_directory }}
               style={{
                 width: 120,
                 height: 120,
                 borderRadius: 60
               }}
        />
      </View>

      <View style={{
        ...DefaultStyles.flexContainer
      }}>
         <Text style={{
           ...DefaultStyles.m5,
           ...DefaultStyles.inputTitle
         }}>নামঃ</Text>
         <Text style={{
           ...DefaultStyles.m5
         }}>{this.state.profile?.name}</Text>
      </View>
      <View style={{
        ...DefaultStyles.flexContainer
      }}>
         <Text style={{
           ...DefaultStyles.m5,
           ...DefaultStyles.inputTitle
         }}>ফোনঃ</Text>
         <View style={{
           ...DefaultStyles.m5,
           ...DefaultStyles.flexContainer
         }}>
          <Text>{this.state.profile?.phone}</Text>
          <TouchableOpacity onPress={() => {
            if(this.state.profile?.phone){
              Linking.openURL(`tel:${this.state.profile?.phone}`);
            }
          
          }} style={{
            ...DefaultStyles.m5
          }}>
            <AntDesign name={'phone'} style={{
              fontSize: 15,
              color: Colors.baseColor
            }}/>
          </TouchableOpacity>
         </View>
         
      </View>

      <View style={{
        ...DefaultStyles.flexContainer
      }}>
         <Text style={{
           ...DefaultStyles.m5,
           ...DefaultStyles.inputTitle
         }}>হোয়াটস অ্যাপ</Text>
         <View style={{
           ...DefaultStyles.m5,
           ...DefaultStyles.flexContainer
         }}>
          <Text>{this.state.profile?.whatsapp}</Text>
          <TouchableOpacity onPress={() => {
            if(this.state.profile?.whatsapp){
              Clipboard.setString(this.state.profile?.whatsapp);
            }
          
          }} style={{
            ...DefaultStyles.m5
          }}>
            <AntDesign name={'copy1'} style={{
              fontSize: 15,
              color: Colors.baseColor
            }}/>
          </TouchableOpacity>
         </View>
         
      </View>

      <View style={{
      }}>
         <Text style={{
           ...DefaultStyles.m5,
           ...DefaultStyles.inputTitle,
           ...DefaultStyles.mb1
         }}>চিকিৎসা বিষয়ক ডিগ্রী</Text>
         <Text style={{
           ...DefaultStyles.m5
         }}>{this.state.profile?.doctor_degree}</Text>
      </View>

      <View style={{
        ...DefaultStyles.flexContainer
      }}>
         <Text style={{
           ...DefaultStyles.m5,
           ...DefaultStyles.inputTitle
         }}>বর্তমান কর্মস্থল</Text>
         <Text style={{
           ...DefaultStyles.m5
         }}>{this.state.profile?.doctor_workplace}</Text>
      </View>

      <View style={{
        ...DefaultStyles.flexContainer
      }}>
         <Text style={{
           ...DefaultStyles.inputTitle,
           ...DefaultStyles.m5
         }}>পদবী</Text>
          <Text style={{
            ...DefaultStyles.m5
          }}>{this.state.profile?.doctor_title}</Text>
      </View>      

      <View style={{
        ...DefaultStyles.flexContainer
      }}>
         <Text style={{
           ...DefaultStyles.m5,
           ...DefaultStyles.inputTitle
         }}>বিভাগঃ</Text>

         <Text style={{
           ...DefaultStyles.m5
         }}>{this.state.profile?.doctor_help_title?.bn_title}</Text>
      </View>  


      <View>
        
      </View>  

      <View style={{
      }}>
        <View style={{
        }}>
          <Text style={{
            ...DefaultStyles.m5,
            ...DefaultStyles.inputTitle
          }}>রোগী দেখার সময়সূচীঃ</Text>
        </View>
    

        <View style={{
          ...DefaultStyles.m5,
          ...DefaultStyles.flexContainer
        }}>
           <Text style={{...DefaultStyles.m5}}>{this.state.profile?.doctor_schedule_type == 'weekly'? 'প্রতি সপ্তাহে' :''}</Text>
           <View style={{
             ...DefaultStyles.flexContainer,
             ...DefaultStyles.m5
           }}>
             <Text>(</Text>
              {this.state.profile?.doctor_schedule_days && JSON.parse(this.state.profile?.doctor_schedule_days).map((item,index) => {
                return <Text key={index.toString()}>{item}, </Text>
              })}
             <Text>)</Text>
           </View>
        </View>

        <View style={{
            ...DefaultStyles.flexContainer,
            ...DefaultStyles.m5,
            alignItems:'center'
        }}>
            <Text style={{
                ...DefaultStyles.inputTitle,
                ...DefaultStyles.m5
            }}>
                সময়ঃ
            </Text>
            <Text style={{
                ...DefaultStyles.m5
            }}>
                {DefaultFunc.humanReadableTime(this.state.profile?.doctor_schedule_time_from)} টা
            </Text>
            <Text style={{
                ...DefaultStyles.inputTitle,
                ...DefaultStyles.m5
            }}>
                থেকে
            </Text>
            <Text style={{
                ...DefaultStyles.m5
            }}>
               {DefaultFunc.humanReadableTime(this.state.profile?.doctor_schedule_time_to)} টা
            </Text>
        </View>


      </View>              

    </View>


</ImageBackground>
</ScrollView>
    );
  }






componentDidMount() {
  const profile = this.props.navigation.getParam('profile')
  this.setState({
    profile: profile
  })
}


}

const styles = StyleSheet.create({

});


DoctorProfile.navigationOptions = navData => {
  return {
    headerTitle: () => (
      <Text style={DefaultStyles.headerTitle}>ডাক্তারের বিস্তারিত</Text>
    )
  };
};

export default inject("store")(observer(DoctorProfile));