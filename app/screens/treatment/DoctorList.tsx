import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {
    Text,
    StyleSheet,
    Picker,
    Button,
    Image,
    View,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import Colors from '../../constants/Colors'
import DefaultStyles from '../../constants/DefaultStyles'
import Spinner from '../../components/helpers/Spinner'
import config from '../../services/config';

class DoctorList extends React.Component {

    state = {
        loading: false,
        medivision: null
    };

    constructor(props) {
        super(props);
    }


    render() {

        let {common, user} = this.props.store


        if (this.state.loading) {
            return <Spinner/>;
        }

        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <ImageBackground style={{width: '100%', height: '100%', alignItems: 'center'}}
                                 source={require('../../assets/img/bottom_inner_title_bg.png')}>

                    <View style={{
                        ...DefaultStyles.halfBody
                    }}>

                        <View style={{...DefaultStyles.w50, ...DefaultStyles.pickerDesign}}>
                            <Picker
                                selectedValue={this.state.medivision}
                                style={{}}
                                onValueChange={async (itemValue, itemIndex) => {
                                    this.setState({
                                        loading: true
                                    })
                                    this.setState({
                                        medivision: itemValue
                                    })
                                    await user.fetchDoctorLists({
                                        doctor_help_id: itemValue
                                    })
                                    this.setState({
                                        loading: false
                                    })
                                }}>
                                <Picker.Item
                                    label="বিভাগ নির্বাচন করুন"
                                    value={null}/>

                                {common.DOCTOR_HELP_TITLES.map((item, index) => {
                                    return (
                                        <Picker.Item
                                            key={index.toString()}
                                            label={item.bn_title}
                                            value={item.id}/>
                                    )
                                })}

                            </Picker>

                        </View>


                        <View>

                            {
                                user.DOCTOR_LISTS.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={{
                                            ...DefaultStyles.flexContainer,
                                            backgroundColor: 'white',
                                            padding: 10
                                        }} key={index.toString()} onPress={() => {
                                            this.props.navigation.navigate('DoctorProfile', {
                                                profile: item
                                            })
                                        }}>

                                            <View>
                                                <Image source={{uri: config.assetURI + item.image_directory}}
                                                       style={{width: 50, height: 50, borderRadius: 50}}/>
                                            </View>
                                            <View style={{
                                                marginLeft: 10
                                            }}>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 18
                                                }}>{item.name}</Text>
                                                <Text style={{
                                                    fontWeight: 'normal',
                                                    fontSize: 14
                                                }}>{item.doctor_help_title?.bn_title}</Text>
                                            </View>

                                        </TouchableOpacity>
                                    )
                                })
                            }
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

        await this.props.store.common.fetchDoctorHelpTitles()
        await this.props.store.user.fetchDoctorLists()

        this.setState({
            loading: false
        })
    }


}

const styles = StyleSheet.create({});


DoctorList.navigationOptions = navData => {
    return {
        headerTitle: () => (
            <Text style={DefaultStyles.headerTitle}>টেলিমেডিসিন সেবা </Text>
        )
    };
};

export default inject("store")(observer(DoctorList));