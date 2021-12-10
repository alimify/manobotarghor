import { inject, observer } from 'mobx-react';
import * as React from 'react';
import {Text,StyleSheet, Button, Image, View,ScrollView, ImageBackground,TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors'
import DefaultStyles from '../../constants/DefaultStyles'
import Config from '../../services/config'
import Spinner from '../../components/helpers/Spinner';

class ReportIndex extends React.Component {
  
  state = {
    loading: false
   };

  constructor(props) {
    super(props);
  }


  render() {

    if(this.state.loading){
      return (<Spinner/>)
    }

    const {store} =  this.props


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
            ...DefaultStyles.flexContainer,
            ...DefaultStyles.m5
        }}>
            <Text style={{
                ...DefaultStyles.inputTitle,
                ...DefaultStyles.m5
            }}>
                সেচ্ছাসেবকঃ
            </Text>
            <Text style={{
                ...DefaultStyles.m5
            }}>
             ৬০ জন
            </Text>
        </View>
        <View style={{
            ...DefaultStyles.flexContainer,
            ...DefaultStyles.m5
        }}>
            <Text style={{
                ...DefaultStyles.inputTitle,
                ...DefaultStyles.m5
            }}>
                সাহায্যকারী/ডাক্তারঃ
            </Text>
            <Text style={{
                ...DefaultStyles.m5
            }}>
                ১২০ জন
            </Text>
        </View>    
        <View style={{
            ...DefaultStyles.flexContainer,
            ...DefaultStyles.m5
        }}>
            <Text style={{
                ...DefaultStyles.inputTitle,
                ...DefaultStyles.m5
            }}>
                সাহায্যপ্রার্থীঃ
            </Text>
            <Text style={{
                ...DefaultStyles.m5
            }}>
                ৪০০ জন 
            </Text>
        </View>    
        <View style={{
            ...DefaultStyles.flexContainer,
            ...DefaultStyles.m5
        }}>
            <Text style={{
                ...DefaultStyles.inputTitle,
                ...DefaultStyles.m5
            }}>
                টাকা সাহায্য করা হয়েছেঃ 
            </Text>
            <Text style={{
                ...DefaultStyles.m5
            }}>
                ১২৫০০ টাকা
            </Text>
        </View>
        <View style={{
            ...DefaultStyles.flexContainer,
            ...DefaultStyles.m5
        }}>
            <Text style={{
                ...DefaultStyles.inputTitle,
                ...DefaultStyles.m5
            }}>
                খাদ্য সাহায্য করা হয়েছেঃ 
            </Text>
            <Text style={{
                ...DefaultStyles.m5
            }}>
                ১৩২০ পরিবারকে
            </Text>
        </View>
        
    </View>


</ImageBackground>
</ScrollView>
    );
}

async componentDidMount() {

  this.setState({
    loading: true
  })


  this.setState({
    loading: false
  })

}


}

const styles = StyleSheet.create({

});


ReportIndex.navigationOptions = navData => {
  return {
    headerTitle: () => (
      <Text style={DefaultStyles.headerTitle}>রিপোর্ট</Text>
    )
  };
};

export default inject("store")(observer(ReportIndex));