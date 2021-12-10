import React from 'react'
import {Platform} from 'react-native'
import { createAppContainer,createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AntDesign,Entypo} from '@expo/vector-icons'

import StartUpScreen from '../screens/StartUpScreen'
import LoginScreen from '../screens/auth/Login'
import RegisterScreen from '../screens/auth/Register'


import UserIndex from '../screens/user/index'
import EditProfileScreen from '../screens/user/EditProfile'
import ChangePasswordScreen from '../screens/user/ChangePassword'
import UserTelemedicineEditScreen from '../screens/user/TelemedicineEdit'
import EditNIDCardScreen from '../screens/user/NIDCard'


import HomeScreen from '../screens/HomeScreen'

import MoneyListScreen from '../screens/money/ListScreen'
import MoneyRequestScreen from '../screens/money/RequestScreen'
import MoneyViewScreen from '../screens/money/ViewScreen'


import TreatmentScreen from '../screens/treatment/IndexScreen'
import DoctorlistScreen from '../screens/treatment/DoctorList'
import DoctorprofileScreen from '../screens/treatment/DoctorProfile'
import DoctorUrgentHelpScreen from '../screens/treatment/UrgentHelp'

import FoodIndexScreen from '../screens/foods/IndexScreen'
import FoodProjectInfoScreen from '../screens/foods/ProjectInfo'

// Screens Added By Samrat Khan
import Notifications from '../screens/Notifications'
import Chats from '../screens/Chats'
import Newsfeed from '../screens/Newsfeed'
// Screens Added By Samrat Khan


import ReportIndexScreen from '../screens/report/Index'
import Colors from "../constants/Colors"


const navigationOptions = {
  title: "Manobotarghor",
  headerStyle: {
    backgroundColor: "#f4511e"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  }
};



const MainNavigator = createStackNavigator({
    Home: {
        
        screen: HomeScreen,
        navigationOptions: { headerShown: false, cardStyle: {
            backgroundColor: Colors.baseColor1
        } }
    },

    MoneyList: MoneyListScreen,
    MoneyRequest: MoneyRequestScreen,
    MoneyView: MoneyViewScreen,

    Foods: FoodIndexScreen,
    FoodProjectInfo: FoodProjectInfoScreen,

    Treatment: TreatmentScreen,
    DoctorList: DoctorlistScreen,
    DoctorProfile: DoctorprofileScreen,
    DoctorUrgentHelp: DoctorUrgentHelpScreen,

    ReportIndex: ReportIndexScreen,
})

const UserNavigator = createStackNavigator({
    UserAccount: {
        screen: UserIndex,
        navigationOptions: { headerShown: false, cardStyle: {
            backgroundColor: 'white'
        } }
    },

    EditProfile:  EditProfileScreen,
    ChangePassword: ChangePasswordScreen,
    UserTeledicineEdit: UserTelemedicineEditScreen,
    EditNIDCard: EditNIDCardScreen,


})

const NotesNavigator = createStackNavigator({
    Notes: {
        screen: Notifications,
        navigationOptions: { headerShown: false, cardStyle: {
                backgroundColor: 'white'
            } }
    },
})
const ChatNavigator = createStackNavigator({
    Chats: {
        screen: Chats,
        navigationOptions: { headerShown: false, cardStyle: {
                backgroundColor: 'white'
            } }
    },
})
const NewsfeedNavigator = createStackNavigator({
    Newsfeed: {
        screen: Newsfeed,
        navigationOptions: { headerShown: false, cardStyle: {
                backgroundColor: 'white'
            } }
    },
})

const StartNavigator = createStackNavigator({
    Start: {
        screen: StartUpScreen, 
        navigationOptions: { headerShown: false, cardStyle: {
            backgroundColor: 'white'
        } }},
    Login: LoginScreen,
    Register: RegisterScreen
})

const tabScreenConfig = {
    Newsfeed: {
        screen: NewsfeedNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Entypo name="news" style={{color: Colors.baseColor1 }} size={20} />;
            },
            tabBarColor: Colors.bgColor1,
            style: { color: Colors.bgColor1 },
            tabBarLabel:'নিউজফিড'
        }
    },
    Chat: {
        screen: ChatNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Entypo name="chat" style={{color: Colors.baseColor1 }} size={20} />
            },
            tabBarColor: Colors.bgColor1,
            style: { color: Colors.bgColor1 },
            tabBarLabel: 'চ্যাট'
        }
    },
    Home: {
            screen: MainNavigator,
            navigationOptions: {
                tabBarIcon: (tabInfo) => {
                    return <AntDesign name="home" style={{color: Colors.baseColor1 }} size={20} />;
                },
                headerShown: false,
                tabBarColor: Colors.bgColor1,
                style: { color: Colors.bgColor1 },
                tabBarLabel:'ড্যাশবোর্ড'
            }
    },
    Notes: {
        screen: NotesNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <AntDesign name="bells" style={{color: Colors.baseColor1 }} size={20} />;
            },
            tabBarColor: Colors.bgColor1,
            style: { color: Colors.bgColor1 },
            tabBarLabel:'নোটিফিকেশন'
        }
    },
    Account: {
        screen: UserNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <AntDesign name="profile" style={{color: Colors.baseColor1 }} size={20} />
            },
            tabBarColor: Colors.bgColor1,
            style: { color: Colors.bgColor1 },
            tabBarLabel: 'প্রোফাইল'
        }
    }
};


const AppNavigator = Platform.OS == 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
    shifting: true, //TabBarColor
    activeColor: Colors.baseColor1,
    barStyle: {
        backgroundColor: Colors.baseColor1
    }
}) : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: Colors.baseColor
    }
})

const DrawerNavigator = createDrawerNavigator({
    Home: AppNavigator,
}, {
    defaultNavigationOptions: navigationOptions
})

const combineNavigator = createSwitchNavigator({
    Start: StartNavigator,
    Drawer: DrawerNavigator,
})


export default createAppContainer(combineNavigator);