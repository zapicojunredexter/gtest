import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import Modal from "react-native-modal";
import QRCode from 'react-native-qrcode';

const styles = StyleSheet.create({
    container : {
        // flex : 1,
        // backgroundColor : 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

class TicketModal extends React.PureComponent<> {
    render() {
        const {modalProps} = this.props;
        return (
            <Modal {...modalProps} animationInTiming={0} animationOutTiming={0} backdropTransitionInTiming={0} backdropTransitionOutTiming={0} hideModalContentWhileAnimating>
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            </Modal>
        );
    }
}

TicketModal.defaultProps = {
};

const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketModal);