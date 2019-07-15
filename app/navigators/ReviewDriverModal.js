import React from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid
} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import feedbacksService from '../services/feedbacks.service';
type Props = {
};


class ReviewDriverModal extends React.Component<Props> {
    state = {
        score : 3,
        description: ''
    };

    handleSubmitReview = async() => {
        try {  
            await this.props.submitReview(this.props.driver.Id, this.props.user.Id, this.state.description, this.state.score);
            ToastAndroid.show('Submitted review', ToastAndroid.SHORT);
            this.props.modalProps.onBackdropPress();
        }catch(error) {
            console.error(error);
        }
    }
    render() {
        const { modalProps } = this.props;
        return (
            <Modal {...modalProps} animationInTiming={0} animationOutTiming={0} backdropTransitionInTiming={0} backdropTransitionOutTiming={0} hideModalContentWhileAnimating>
                <View style={{backgroundColor: '#fff', padding: 20,textAlign:'center'}}>
                    <Text style={{textAlign: 'center',fontSize: 15,marginBottom: 20, fontWeight: "bold"}}>Help us improve by rating our services!</Text>
                    <TextInput
                        style={{width: '100%'}}
                        value={this.state.description}
                        onChangeText={(description) => this.setState({description})}
                        placeholder="Comment..."
                    />
                    <View style={{ marginBottom: 20, marginTop: 20,justifyContent:'space-between',flexDirection: 'row', marginLeft: '20%', marginRight: '20%',}}>
                        <FontAwesome onPress={() => this.setState({score: 1})} name={this.state.score >= 1? "star" : "star-o"} size={18} color="orange"  />
                        <FontAwesome onPress={() => this.setState({score: 2})} name={this.state.score >= 2? "star" : "star-o"} size={18} color="orange"  />
                        <FontAwesome onPress={() => this.setState({score: 3})} name={this.state.score >= 3? "star" : "star-o"} size={18} color="orange"  />
                        <FontAwesome onPress={() => this.setState({score: 4})} name={this.state.score >= 4? "star" : "star-o"} size={18} color="orange" />
                        <FontAwesome onPress={() => this.setState({score: 5})} name={this.state.score >= 5? "star" : "star-o"} size={18} color="orange" />
                    </View>
                    <Button title="SUBMIT" onPress={this.handleSubmitReview}/>
                </View>
            </Modal>
        );
    }
}
const mapStateToProps = store => ({
    user: store.user
});
const mapDispatchToProps = dispatch => ({
    submitReview: (driverId, commuterId, description, score) => dispatch(feedbacksService.submitReview(driverId, commuterId, description, score))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewDriverModal);
