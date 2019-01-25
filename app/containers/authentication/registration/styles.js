import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export default (userType = 'seculacer') => StyleSheet.create({
    mainContainer : {
        backgroundColor : colors[userType].main,
        flex : 1,
    },
    controlsWrapper : {
        flex : 1,
    },
    buttonsWrapper : {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    buttons : {
        width : '48%',
        height : 40,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#B8D8EF',
    },
    titleStyle : {
        color : colors[userType].main,
    },
});
