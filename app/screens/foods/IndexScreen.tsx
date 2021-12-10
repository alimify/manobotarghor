import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Text, StyleSheet, Button, Image, View, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors'
import DefaultStyles from '../../constants/DefaultStyles'
import Config from '../../services/config'
import Spinner from '../../components/helpers/Spinner';

class DoctorProfile extends React.Component {

    state = {
        loading: false,
        tab: 1
    };

    constructor(props) {
        super(props);
    }


    render() {

        if (this.state.loading) {
            return (<Spinner/>)
        }

        const {store} = this.props


        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <ImageBackground style={{width: '100%', height: '100%', alignItems: 'center'}}
                                 source={require('../../assets/img/bottom_inner_title_bg.png')}>
                    <View style={{
                        ...DefaultStyles.halfBody
                    }}>

                        <View style={{
                            ...DefaultStyles.flexContainer,
                            alignItems: 'center',
                            alignContent: 'center',
                            alignSelf: 'center'
                        }}>
                            <TouchableOpacity onPress={async () => {

                                this.setState({
                                    tab: 1,
                                    loading: true
                                })

                                const {store} = this.props
                                await store.food.fetchProjectLists()

                                this.setState({
                                    loading: false
                                })

                            }} style={{
                                ...DefaultStyles.w45,
                                backgroundColor: this.state.tab == 1 ? 'green' : Colors.baseColor,
                                ...DefaultStyles.p2,
                                ...DefaultStyles.m3
                            }}>

                                <Text style={{
                                    textAlign: 'center',
                                    color: 'white'
                                }}>
                                    ক্যাম্পেইন
                                </Text>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={async () => {
                                this.setState({
                                    tab: 2,
                                    loading: true
                                })

                                const {store} = this.props
                                await store.food.fetchSelfDonation()

                                this.setState({
                                    loading: false
                                })

                            }} style={{
                                ...DefaultStyles.w45,
                                backgroundColor: this.state.tab == 2 ? 'green' : Colors.baseColor,
                                ...DefaultStyles.p2,
                                ...DefaultStyles.m3
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: 'white'
                                }}>আমার ডোনেশন</Text>
                            </TouchableOpacity>
                        </View>

                        {this.state.tab == 1 && this.projectCampaign()}
                        {this.state.tab == 2 && this.selfDonation()}

                    </View>


                </ImageBackground>
            </ScrollView>
        );
    }


    projectCampaign() {

        return (

            <View>
                {this.props.store.food.PROJECT_LISTS?.projects?.map((item, index) => {
                    return (<View key={index.toString()}
                                  style={{
                                      ...DefaultStyles.flexContainer,
                                      backgroundColor: 'white',
                                      padding: 10,
                                      borderBottomColor: '#ddd',
                                      borderBottomWidth: 1
                                  }}>
                        <View style={{...DefaultStyles.w70}}>
                            <Text style={{...DefaultStyles.inputTitle}}>{item.title}</Text>
                        </View>
                        <View style={{...DefaultStyles.w30, alignContent: 'flex-end', alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('FoodProjectInfo', {
                                    project: item
                                })
                            }}>
                                <Text>বিস্তারিত</Text>
                            </TouchableOpacity>
                        </View>
                    </View>)
                })}
            </View>

        )
    }


    selfDonation() {
        return (
            <View>
                <View style={{
                    ...DefaultStyles.flexContainer,
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: 'grey',
                    borderTopEndRadius: 8,
                    borderTopStartRadius: 8,
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <Text style={{
                        ...DefaultStyles.w25,
                        textAlign: 'center'
                    }}>ক্যাম্পেইন</Text>


                    <Text style={{
                        ...DefaultStyles.w20,
                        textAlign: 'center'
                    }}>পরিমান</Text>

                    <Text style={{
                        ...DefaultStyles.w20,
                        textAlign: 'center'
                    }}>স্ট্যাটাস</Text>

                    <Text style={{
                        ...DefaultStyles.w20,
                        textAlign: 'center'
                    }}>তারিখ</Text>

                </View>


                {this.props.store.food.SELF_DONATION.map((item, index) => {
                    return (
                        <View key={index.toString()} style={{
                            ...DefaultStyles.flexContainer,
                            alignItems: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            borderBottomColor: '#ddd',
                            borderBottomWidth: 1,
                            width: '100%'
                        }}>
                            <Text style={{
                                ...DefaultStyles.w25,
                                textAlign: 'left'
                            }}>{item.project?.title}</Text>

                            <Text style={{
                                ...DefaultStyles.w20,
                                textAlign: 'center'
                            }}>{item.type == 1 ? `${item.person} জনের খাদ্য` : `${item.money} টTকা`}</Text>


                            <Text style={{
                                ...DefaultStyles.w20,
                                textAlign: 'center'
                            }}>{item.status == 0 ? 'পেন্ডিং' : (item.status == 1 ? 'সাকসেস' : 'ফেইল')}</Text>

                            <Text style={{
                                ...DefaultStyles.w20,
                                textAlign: 'center'
                            }}>{item.created_at}</Text>

                        </View>

                    )
                })}

            </View>
        )
    }

    async componentDidMount() {

        this.setState({
            loading: true
        })

        const {store} = this.props
        await store.food.fetchProjectLists()


        this.setState({
            loading: false
        })

    }


}

const styles = StyleSheet.create({});


DoctorProfile.navigationOptions = navData => {
    return {
        headerTitle: () => (
            <Text style={DefaultStyles.headerTitle}>খাদ্য সহায়তা</Text>
        )
    };
};

export default inject("store")(observer(DoctorProfile));