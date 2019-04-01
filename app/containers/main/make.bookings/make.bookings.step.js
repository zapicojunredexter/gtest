import React from 'react';
import { View, Text } from 'react-native';
import Confirm from './steps/confirm';
import Details from './steps/details';
import Location from './steps/location';

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
        this.state = {
            currentStep : 0,
        }
    }

    goToNext = () => {
        const { currentStep } = this.state;
        if(currentStep < 2){
            this.setState({currentStep : currentStep + 1});
        }else{
            // TODO if last
        }
    }

    renderStep = () => {
        const { currentStep } = this.state;
        const commonProps = {
            goToNext : this.goToNext,
        }
        switch(currentStep){
            case 0:
                return (
                    <Location
                        {...commonProps}
                    />
                );
            case 1:
                return (
                    <Details
                        {...commonProps}
                    />
                );
            case 2:
                return (
                    <Confirm
                        {...commonProps}
                    />
                );
            default : return null;
        }
    }

    render() {
        return (
            <View style={{backgroundColor:'red'}}>
                {this.renderStep()}
            </View>
        );
    }
}

export default Container;