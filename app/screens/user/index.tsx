import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Text, StyleSheet, Button, Image, TouchableOpacity, View, ImageBackground} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {AntDesign} from "@expo/vector-icons";
import Colors from '../../constants/Colors'
import storage from "../../services/asyncStorage";
import axios from 'axios'
import Config from '../../services/config'

class Profile extends React.Component {

    state = {
        imageResource: null,
        image: null
    };

    constructor(props) {
        super(props);
    }


    render() {
        let {image} = this.state;

        let {user} = this.props.store

        return (
            <View style={{flex: 1}}>
                <View style={{
                    alignItems: 'center',
                    paddingTop: 40,
                }}>
                    {this.ImageArea()}
                    <Text style={{
                        fontSize: 18,
                        color: 'grey'
                    }}>{user.USER.name}</Text>
                </View>

                <View style={{...styles.allLinkContainer}}>
                    <TouchableOpacity style={{
                        ...styles.linkContainer
                    }} onPress={() => {
                        this.props.navigation.navigate('EditProfile')
                    }}>
                        <Text style={{...styles.linkTitle}}>প্রোফাইল</Text>
                    </TouchableOpacity>

                    {user.USER.role_id == 5 && (
                        <TouchableOpacity style={{
                            ...styles.linkContainer
                        }} onPress={() => {
                            this.props.navigation.navigate('EditNIDCard')
                        }}>
                            <Text style={{...styles.linkTitle}}>জাতীয় পরিচয়পত্র</Text>
                        </TouchableOpacity>
                    )}
                    {user.USER.role_id == 4 && (
                        <TouchableOpacity style={{
                            ...styles.linkContainer
                        }} onPress={() => {
                            this.props.navigation.navigate('UserTeledicineEdit')
                        }}>
                            <Text style={{...styles.linkTitle}}>টেলিমেডিসিন সেবা</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={{...styles.linkContainer}} onPress={() => {
                        this.props.navigation.navigate('ChangePassword')
                    }}>
                        <Text style={{...styles.linkTitle}}>পাসওয়ার্ড পরিবর্তন</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.linkContainer}} onPress={this.logout.bind(this)}>
                        <Text style={{...styles.linkTitle}}>লগআউট</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }


    ImageArea() {
        let {image} = this.state;

        let {user} = this.props.store

        return (
            <View>
                <ImageBackground source={{uri: image}} style={{
                    ...styles.imgProfie
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


    async logout() {
        const props = this.props
        let {user} = this.props.store

        await user.fetchLogout()
        await storage.clear('token')
        await user.setUser(false)


        setTimeout(async () => {
            await props.navigation.navigate('Start')
        }, 2000)
    }


    componentDidMount() {
        this.getPermissionAsync();

        this.setState({
            image: Config.assetURI + this.props.store?.user?.USER?.image_directory
        })

    }


    async getPermissionAsync() {

        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }

    };

    async _pickImage() {

        try {

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result)

            if (!result.cancelled) {
                this.setState({image: result.uri});
                this.setState({
                    imageResource: result
                })

                // ImagePicker saves the taken photo to disk and returns a local URI to it
                let localUri = result.uri;
                let filename = localUri.split('/').pop();

                // Infer the type of the image
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;

                const token = await storage.get('token')
                // Upload the image using the fetch and FormData APIs
                let formData = new FormData();
                // Assume "photo" is the name of the form field the server expects
                formData.append('image', {uri: localUri, name: filename, type});
                const apiRes = await axios({
                    method: 'POST',
                    url: Config.apiURI + 'api/user/changeImage',
                    data: formData,
                    headers: {'Accept': 'application/json', 'Authorization': 'Bearer ' + token}
                });

            }

        } catch (E) {
            console.log(E);
        }

    };
}

const styles = StyleSheet.create({
    allLinkContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 40,
        marginHorizontal: 20,
        paddingTop: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: 10,
    },
    linkContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    linkTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#7a7976'
    },
    imgProfie: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: Colors.baseColor
    }
});

export default inject("store")(observer(Profile))