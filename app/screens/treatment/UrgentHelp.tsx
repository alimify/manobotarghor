import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Text, StyleSheet, Button, Image, View, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors'
import DefaultStyles from '../../constants/DefaultStyles'

class Index extends React.Component {

    state = {
        image: null,
    };

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <ImageBackground style={{width: '100%', height: '100%', alignItems: 'center'}}
                                 source={require('../../assets/img/ff_bottom_bg.png')}>

                    <View style={{ ...DefaultStyles.halfBody, padding: 15, paddingTop: 0, paddingBottom: 60 }}>
                        <Text style={{ ...DefaultStyles.inputTitle }}>
                            করোনার সময় জরুরি সাহায্য পেতে ফোন করুনঃ
                        </Text>
                        <Text>সর্দি কাশি ও চিকিৎসকের পরামর্শ </Text>

                        <Text>জাতীয় রোগতত্ব , রোগ নিয়ন্ত্রন ও গবেষণা ইন্সটিটিউটের (আইইডিসিআর)</Text>
                        <Text>নম্বর: ১০৬৫৫ ও ০১৯৪৪৩৩৩২২২ </Text>
                        <Text>ই–মেইল: iedcrcovid19@gmail.com</Text>
                        <Text></Text>

                        <Text>
                            করোনাবিষয়ক তথ্য পেতে এবং সম্ভাব্য আক্রান্ত ব্যক্তি সম্পর্কে তথ্য দিতে ওয়েবসাইট:
                            corona.gov.bd
                        </Text>
                        <Text>স্বাস্থ্য বাতায়নের হটলাইন নম্বর: ১৬২৬৩ </Text>
                        <Text>স্বাস্থ্য অধিদপ্তরের হটলাইন নম্বর: ৩৩৩ </Text>
                        <Text>সশস্ত্র বাহিনীর সঙ্গে যোগাযোগের নম্বর: ০১৭৬৯০৪৫৭৩৯</Text>
                        <Text>মিথ্যা বা গুজব প্রচারের বিষয়টি নজরে এলে </Text>
                        <Text>৯৯৯ অথবা ৯৫১২২৬৪, ৯৫১৪৯৮৮</Text>
                        <Text></Text>
                        <Text>দাফন কার্যক্রমে সহায়তা পেতে</Text>
                        <Text>স্বাস্থ্য মন্ত্রণালয়ের দায়িত্বপ্রাপ্ত দুই যুগ্ম সচিবের মুঠোফোন নম্বর: ০১৭১২০৮০৯৮৩ ও ০১৫৫২২০৪২০৮ </Text>
                        <Text></Text>
                        <Text>করোনা পরিস্থিতিতে সহায়তার জন্য </Text>
                        <Text>
                            নারী ও শিশু নির্যাতন প্রতিরোধে ন্যাশনাল হেল্পলাইন সেন্টারে ফোন বা এসএমএস করা যাবে, প্রতি দিন
                            এবং যেকোনো সময়। টোল ফ্রি নম্বর: ১০৯
                        </Text>
                        <Text>
                            মনঃসামাজিক সহায়তা সেল
                        </Text>
                        <Text>
                            বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি মানসিক স্বাস্থ্যসেবা নিশ্চিত করতে মনঃসামাজিক সহায়তা সেল চালু
                            করেছে। রোববার থেকে বৃহস্পতিবার পর্যন্ত সকাল ৯টা থেকে বিকেল ৫টার মধ্যে ফোনকলের মাধ্যমে সেবা
                            মিলবে।
                        </Text>
                        <Text>
                            ফোন: ০১৮১১৪৫৮৫৪১ও০১৮১১৪৫৮৫৪২
                        </Text>
                        <Text>
                            মুঠোফোনে দন্ত রোগের চিকিৎসা
                        </Text>
                        <Text>
                            মুখ ও দাঁতের চিকিৎসা পেতে বাংলাদেশ ডেন্টাল সোসাইটির সদস্যদের মুঠোফোনে যোগাযোগ করে চিকিৎসা
                            নেওয়া যাবে।
                        </Text>
                        <Text>
                            নম্বর: ০১৭১১১৩৬৩৬২, ০১৭৪১৪৯০১৩৪, ০১৭১১৫৪০০৪৫, ০১৭১১৯৩৭৫৯০, ০১৭১১৮০০০৪৯, ০১৭১২৪৮৬৫৪৮
                            ০১৭১৫০৭৫৭৪০, ০১৭১৭২১১১০৫, ০১৮১৭৫৪১০০৫ ও ০১৮১৭০৯৪৩৩১
                        </Text>
                        <Text>
                            জরুরি ত্রাণ পেতে
                        </Text>
                        <Text>
                            ঢাকা জেলা প্রশাসনের হটলাইন: ০২৪৭১১০৮৯১, ০১৯৮৭৮৫২০০৮
                        </Text>
                        <Text>
                            ঢাকা দক্ষিণ সিটি করপোরেশন: ০১৭০৯৯০০৭০৩, ০১৭০৯৯০০৭০৪
                        </Text>
                        <Text>
                            ঢাকা উত্তর সিটি করপোরেশনের পরামর্শ সেবা
                        </Text>
                        <Text>
                            পাঁচটি অঞ্চলে করোনাভাইরাস–সংক্রান্ত চিকিৎসা তথ্য ও পরামর্শ সেবা চালু।
                        </Text>
                        <Text>
                            মগবাজার: ৯৩৫৫২৭৭, মোহাম্মদপুর: ০১৩১১-৯৪৬৪৩২, মাজার রোড, মিরপুর: ০১৩০১-৫৯৬৮৩৯,
                        </Text>
                        <Text>
                            বর্ধিত পল্লবী, মিরপুর: ০১৭৭০-৭২২১৯৪ এবং উত্তরা: ০১৩১৪-৭৬৬৫৪৫
                        </Text>
                    </View>

                </ImageBackground>
            </ScrollView>
        );
    }


    componentDidMount() {

    }


}

const styles = StyleSheet.create({});


Index.navigationOptions = navData => {
    return {
        headerTitle: () => (
            <Text style={DefaultStyles.headerTitle}> জরুরি চিকিৎসা </Text>
        )
    };
};

export default inject("store")(observer(Index));