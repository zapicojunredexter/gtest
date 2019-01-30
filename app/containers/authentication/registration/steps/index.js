import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

import CreateAccount from './create.account';
import AdditionalInfo from './additional.info';
import SetupAccount from './setup.account';

import styles from './styles';

type Props = {
};

export default class RegistrationSteps extends React.PureComponent<Props> {

    renderBody = () => {
        const { currentStep = 0 } = this.props;

        switch(currentStep) {
            case  0:
                return <CreateAccount />;
            case 1:
                return <AdditionalInfo />;
            case 2:
                return <SetupAccount />;
            default:
                return null;
        }
    }

    render() {
        const _styles = styles('seculacer');

        const { currentStep = 0 } = this.props;
        const steps = ['Create Account', 'Additional Info', 'Setup Account'];

        return (
            <ScrollView contentContainerStyle={_styles.mainContainer}>
                <View style={_styles.icon}>
                    <Image
                        style={{
                            // flex: 1,
                            // resizeMode : 'cover',
                            // position: 'absolute',
                            width: 100,
                            height: 100,
                        }}
                        source={require('../../../../assets/images/logo.png')}
                    />
                </View>
                <Text style={_styles.label}>{steps[currentStep]}</Text>
                <View style={_styles.stepsWrapper}>
                    {steps.map((step, index) => <View key={`step-${index}`} style={ _styles[index === currentStep ? 'active' : 'inactive']} />)}
                </View>
                {this.renderBody()}
            </ScrollView>
        );
    }
}
