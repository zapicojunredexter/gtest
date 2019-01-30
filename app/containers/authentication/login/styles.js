import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export default (userType = 'seculacer') => StyleSheet.create({
    mainContainer : {
        backgroundColor : colors[userType].main,
        flex : 1,
        alignItems : 'center',
    },
    logoWrapper : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'flex-end',
    },
    label : {
        textAlign : 'center',
        color : colors.fontColor,
        fontSize : 20,
    },
    textFields : {
        color : colors.fontColor,
    },
    buttonsWrapper : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 30,
    },
    buttons : {
        width : '45%',
        height : 40,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : colors.fontColor,
    },
    titleStyle : {
        color : colors[userType].main,
    },
    formControls : {
        flex : 2,
        padding : 30,
        justifyContent : 'flex-start'
    },
});
