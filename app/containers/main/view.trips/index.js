import React from 'react';
import { View, Text } from 'react-native';
import { CameraKitCameraScreen, CameraKitCamera } from 'react-native-camera-kit';
import QRCode from 'react-native-qrcode';

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
    }

    render() {
        const isCommuter = true;

        if (isCommuter) {
            return (
                <CameraKitCameraScreen 
                    showFrame={true}
                    scanBarcode={true}
                    laserColor={"transparent"}
                    frameColor={"transparent"}
                    onReadCode={((event) => alert(event.nativeEvent.codeStringValue))}
                    hideControls={true}
                    offsetForScannerFrame={30}
                    heightForScannerFrame={300}
                    colorForScannerFrame={'blue'}
                />
            );
        }
        return (
            <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                
                <QRCode
                    value="SOMETHING SOMETHInG"
                    size={200}
                    bgColor='purple'
                    fgColor='white'/>
            </View>
        );
    }
}

export default Container;