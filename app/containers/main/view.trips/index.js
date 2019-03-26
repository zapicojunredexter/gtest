import React from 'react';
import { View, Text } from 'react-native';
import { CameraKitCameraScreen, CameraKitCamera } from 'react-native-camera-kit';

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CameraKitCameraScreen 
                showFrame={true}
                scanBarcode={true}
                laserColor={"blue"}
                frameColor={"yellow"}
                onReadCode={((event) => alert(event.nativeEvent.codeStringValue))}
                hideControls={true}
                offsetForScannerFrame={30}
                heightForScannerFrame={300}
                colorForScannerFrame={'blue'}
            />
        );
    }
}

export default Container;