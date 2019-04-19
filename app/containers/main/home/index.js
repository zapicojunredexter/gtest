// /*
import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import MapView from '../../../components/map.view';
class Home extends React.Component {
    
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#dae1e8'}}>
                <MapView />
            </View>
        );
    }
}

// export default SystemRestricted(
//     DriveTheLine,
//     {
//         navigationOptions : {
//             headerTitle : 'HOME'
//         },
//     });
export default Home;