import { StyleSheet } from 'react-native';

import { colors } from '../../../../constants/colors';

export default (userType = 'seculacer') => StyleSheet.create({
    mainContainer : {
        padding : 40,
        alignItems : 'center',
    },
    icon : {
    },
    label : {
        color : colors.fontColor,
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
        backgroundColor : colors.fontColor,
        height : 4,
        borderRadius : 3,
        width : '30%'
    },
    inactive : {
        backgroundColor : colors.fontColor,
        height : 2,
        borderRadius : 3,
        width : '30%'
    }
});
