import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import QRCode from 'react-native-qrcode';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
        padding : 20,
    },
    buttonStyle : {
        width : '100%'
    },
    qrCodeContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    }
});

class TicketModal extends React.PureComponent<> {
    render() {
        const { modalProps, bookingDetails, closeModal, onViewDetails } = this.props;

        return (
            <Modal {...modalProps} animationInTiming={0} animationOutTiming={0} backdropTransitionInTiming={0} backdropTransitionOutTiming={0} hideModalContentWhileAnimating>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={onViewDetails}
                    >
                        <Text>{JSON.stringify(bookingDetails)}</Text>
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
                        title="CLOSE"
                        style={styles.buttonStyle}
                        onPress={closeModal}
                    />
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