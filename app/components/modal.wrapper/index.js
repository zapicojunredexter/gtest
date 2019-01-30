import React, {Component} from 'react';
import {Modal, TouchableOpacity, StyleSheet, View, Alert} from 'react-native';

const _styles = StyleSheet.create({
    modalBackgroundStyle : {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default class ModalExample extends Component {
    render() {
        const { styles, children, isOpen, closeModal } = this.props;
        
        return (
            <TouchableOpacity onPress={closeModal} style={{backgroundColor : 'red', flex : 1,padding:20}}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={isOpen}
                    onRequestClose={closeModal}
                    {...this.props}
                >
                    <View style={[_styles.modalBackgroundStyle, styles]}>
                        {children}
                    </View>
                </Modal>
            </TouchableOpacity>
        );
    }
}