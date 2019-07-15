import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import QRCode from 'react-native-qrcode';

const styles = StyleSheet.create({
    container : {
        height: 380,
        backgroundColor : 'white',
        padding : 20,
    },
    buttonStyle : {
        width : '100%'
    },
    qrCodeContainer : {
        flex: 1,
        justifyContent : 'center',
        alignItems : 'center',
    }
});

class AttendeeModal extends React.PureComponent<> {

    handleOnConfirm = () => {
        if(this.props.bookingDetails) {
            this.props.onConfirm(this.props.bookingDetails.Id);
        }
    }
    render() {
        const { modalProps, bookingDetails, closeModal, onViewDetails } = this.props;
        const name = bookingDetails && bookingDetails.Commuter && `${bookingDetails.Commuter.FirstName} ${bookingDetails.Commuter.LastName}`
        return (
            <Modal {...modalProps} animationInTiming={0} animationOutTiming={0} backdropTransitionInTiming={0} backdropTransitionOutTiming={0} hideModalContentWhileAnimating>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={onViewDetails}
                    >
                        <Text style={{fontWeight: 'bold', fontSize : 20,textAlign: 'center' }}>{name}</Text>
                    </TouchableOpacity>
                    {bookingDetails && (
                        <View style={styles.qrCodeContainer}>
                            <QRCode
                                value={bookingDetails.Id}
                                size={200}
                                bgColor='black'
                                fgColor='white'
                            />
                        </View>
                    )}
                    <Button
                        title="CONFIRM COMMUTER"
                        style={styles.buttonStyle}
                        onPress={this.handleOnConfirm}
                    />
                </View>
            </Modal>
        );
    }
}

AttendeeModal.defaultProps = {
};

const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttendeeModal);