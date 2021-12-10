import {StyleSheet} from 'react-native';
import Colors from './Colors'

const styles = StyleSheet.create({
    sectionTitle: {
        fontFamily: 'open-sans-bold'
    },
    baseColor4: {
        color: Colors.baseColor4
    },
    bgBaseColor4: {
        backgroundColor: Colors.baseColor4,
        color: Colors.baseColor8
    },
    fontColor1: {
        color: Colors.fontColor1
    },
    flatListRow: {
        flexGrow: 1,
        justifyContent: 'space-between',
        flexBasis: '50%',
        flexWrap: 'wrap'
    },
    flex: {
        flex: 1
    },

    flexContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    stickyBottom: {
        position: 'absolute',
        bottom: 0
    },

    middle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },

    // Default Design By Samrat
    headerTitle: {
        fontSize: 20,
        fontWeight: '500'
    },
    pickerDesign: {
        paddingLeft: 5,
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        borderColor: Colors.baseColor1,
        borderWidth: 1,
        borderRadius: 3,
        alignSelf: 'center',
    },
    pickerHeight: {
        height: 30
    },
    screenTitle: {
        color: Colors.fontColor1,
        fontWeight: "400",
        fontSize: 17,
    },
    tableHeader: {
        backgroundColor: Colors.borderColor,
        borderWidth: 1,
        borderColor: Colors.borderLines,
        height: 30,
        padding: 5,
    },
    borderRightColor: {
        borderRightWidth: 1,
        textAlign: 'center',
        borderColor: Colors.borderLines
    },
    borderLeftColor: {
        borderLeftWidth: 1,
        textAlign: 'center',
        borderColor: Colors.borderLines
    },
    labelStyle: {
        fontWeight: 'bold',
        color: '#696969',
        fontSize: 14
    },
    fieldSet:{
        marginVertical: 10,
        paddingBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: Colors.baseColor1
    },
    legend:{
        position: 'absolute',
        top: -10,
        left: 10,
        paddingHorizontal: 15,
        fontWeight: 'bold',
        backgroundColor: Colors.baseColor9
    },
    // Default Design By Samrat
    ///
    halfHeader: {
        paddingHorizontal: 10,
        paddingTop: 60,
    },

    halfBody: {
        marginTop: 60,
        // borderTopRightRadius: 10,
        // borderTopLeftRadius: 10,
        // paddingTop: 10,
        // paddingRight: 10,
        // paddingLeft: 10,
        height: '100%',
        width: '100%'
    },
    halfBodySemi: {
        marginTop: 40,
    },
    gradientBtn: {
        backgroundColor: 'transparent',
        paddingVertical: 5,
        paddingHorizontal: 15,
        height: 30,
        elevation: 6,
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset : { width: 5, height: 10},
        color: Colors.fontColor1,
        fontSize: 15,
        fontWeight: 'bold'
    },
    buttonBasic: {
        backgroundColor: Colors.baseColor,
        borderRadius: 5,
        elevation: 6,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.8,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
        margin: 4,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center'
    },
    allButton: {
        borderRadius: 2,
        color: Colors.fontColor1,
        fontSize: 14
    },
    btnPadding: {
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10
    },
    loginButtonContainer: {
        backgroundColor: Colors.baseColor,
        padding: 0,
        justifyContent: "center"
    },
    loginButton: {
        color: "white",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    },
    inputField: {
        borderWidth: 1,
        borderColor: Colors.baseBlack2,
        borderRadius: 5,
        color: 'black',
        marginVertical: 5,
        fontSize: 15
    },
    inputFieldSam: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.baseColor1,
        marginBottom: 20,
        paddingVertical: 4
    },
    inputFieldWithoutBorder: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.baseColor1,
        borderRadius: 5,
        color: 'black',
        marginHorizontal: 10,
        fontSize: 15
    },
    inputFieldBordered: {
        paddingHorizontal: 10,
    },
    inputTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.baseBlack
    },
    inputWithoutBorderTitle: {
        fontWeight: 'bold',
        color: 'grey',
        marginHorizontal: 10
    },

    // width
    w20: {
        width: '20%'
    },
    w25: {
        width: '25%'
    },
    w30: {
        width: '30%'
    },
    w33: {
        width: '33%'
    },
    w35: {
        width: '35%'
    },
    w40: {
        width: '40%'
    },
    w45: {
        width: '45%'
    },
    w46: {
        width: '46%'
    },
    w47: {
        width: '47%'
    },
    w48: {
        width: '48%'
    },
    w49: {
        width: '49%'
    },
    w50: {
        width: '50%'
    },
    w55: {
        width: '55%'
    },
    w60: {
        width: '60%'
    },
    w65: {
        width: '65%'
    },
    w70: {
        width: '70%'
    },
    w71: {
        width: '71%'
    },
    w80: {
        width: '80%'
    },
    w85: {
        width: '85%'
    },
    w90: {
        width: '90%'
    },
    w95: {
        width: '95%'
    },
    w96: {
        width: '96%'
    },
    w98: {
        width: '98%'
    },
    w100: {
        width: '100%'
    },
    w150: {
        width: '100%'
    },

    /*Padding*/
    p1: {
        padding: 1
    },
    p2: {
        padding: 2
    },
    p3: {
        padding: 3
    },
    p4: {
        padding: 4
    },
    p5: {
        padding: 5
    },
    pb1: {
        paddingBottom: 1
    },
    pb2: {
        paddingBottom: 2
    },
    pb3: {
        paddingBottom: 3
    },
    pb4: {
        paddingBottom: 4
    },
    pb5: {
        paddingBottom: 5
    },
    pt1: {
        paddingTop: 1
    },
    pt2: {
        paddingTop: 2
    },
    pt3: {
        paddingTop: 3
    },
    pt4: {
        paddingTop: 4
    },
    pt5: {
        paddingTop: 5
    },
    ph1: {
        paddingHorizontal: 1
    },
    ph2: {
        paddingHorizontal: 2
    },
    ph3: {
        paddingHorizontal: 3
    },
    ph4: {
        paddingHorizontal: 4
    },
    ph5: {
        paddingHorizontal: 5
    },
    pv1: {
        paddingVertical: 1
    },
    pv2: {
        paddingVertical: 2
    },
    pv3: {
        paddingVertical: 3
    },
    pv4: {
        paddingVertical: 4
    },
    pv5: {
        paddingVertical: 5
    },
    m1: {
        margin: 1
    },
    m2: {
        margin: 2
    },
    m3: {
        margin: 3
    },
    m4: {
        margin: 4
    },
    m5: {
        margin: 5
    },
    ml1: {
        marginLeft: 1
    },
    ml2: {
        marginLeft: 5
    },
    ml3: {
        marginLeft: 3
    },
    ml4: {
        marginLeft: 4
    },
    ml5: {
        marginLeft: 5
    },
    mr1: {
        marginRight: 1
    },
    mr2: {
        marginRight: 5
    },
    mr3: {
        marginRight: 3
    },
    mr4: {
        marginRight: 4
    },
    mr5: {
        marginRight: 5
    },
    mb1: {
        marginBottom: 1
    },
    mb2: {
        marginBottom: 5
    },
    mb3: {
        marginBottom: 3
    },
    mb4: {
        marginBottom: 4
    },
    mb5: {
        marginBottom: 5
    },
});


export default styles