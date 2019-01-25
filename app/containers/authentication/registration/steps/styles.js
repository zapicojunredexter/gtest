import { StyleSheet } from 'react-native';

export default (userType = 'seculacer') => StyleSheet.create({
    mainContainer : {
        padding : 40,
        alignItems : 'center',
    },
    icon : {
        height : 50,
        width : 50,
        backgroundColor : 'orange',
    },
    label : {
        color : 'white',
        fontSize : 20,
    },
    stepsWrapper : {
        marginTop : 10,
        marginBottom : 10,
        width : '100%',
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'row',
    },
    active : {
        backgroundColor : 'white',
        height : 4,
        borderRadius : 3,
        width : '30%'
    },
    inactive : {
        backgroundColor : 'white',
        height : 2,
        borderRadius : 3,
        width : '30%'
    }
});
