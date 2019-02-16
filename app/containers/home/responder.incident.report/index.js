import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    FlatList
} from 'react-native';
import { colors } from '../../../constants/colors';
import Button from '../../../components/button';
import IncidentReportsService from '../../../services/responder.incident.report.service';

import AddIncidentReportDialog from './add.incident.report.modal';

type Props = {
};



const _styles = (userType = 'responder') => StyleSheet.create({
    mainContainer : {
        flex : 1,
    },
    textInput : {
        borderWidth:0,
        backgroundColor : colors.fieldSetBg,
        margin : 5
    }
});


class IncidentReport extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['responder'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
    }

    state = {
        isModalOpen : false,
        isFetching : false,
        reports : [],
    }

    componentDidMount() {
        this.fetchReports();
    }

    onSubmitReport = async (values) => {
        const report = {
            name : name.value,
            userId : userId.value,
            reportNo : reportNo.value,
            location : location.value,
            time : time.value,
            date : date.value,
            sex : sex.value,
            status : status.value,
            description : description.value,
            remarks : remarks.value,
        };
        await this.props.submitIncidentReport(report);
        this.setState({ isFetching : true });

        const reports = await this.props.fetchReports().catch(error => alert(error.message));

        this.setState({ isFetching : false, reports });
    }

    fetchReports = async () => {
        this.setState({ isFetching : true });

        const reports = await this.props.fetchReports().catch(error => alert(error.message));

        this.setState({ isFetching : false, reports });
    }

    renderRow = ({ item }) => {
        return (
            <View style={{backgroundColor : colors.fieldSetBg, padding : 15,marginBottom : 10}}>
                <Text style={{fontSize : 18}}>{item.name}</Text>
                <Text style={{fontSize : 14}}>{item.date}</Text>
                <Text style={{fontSize : 14}}>{item.address}</Text>
            </View>
        );
    }

    render() {
        // const {
        //     contact,
        //     email,
        //     name,
        // } = this.props.navigation.state.params;
        const styles = _styles();

        return (
            <View style={{flex : 1,margin : 15}}>                
                <AddIncidentReportDialog
                    visible={this.state.isModalOpen}
                    onClose={() => this.setState({ isModalOpen : false })}
                    onSubmitReport={this.onSubmitReport}
                />
                <Button
                    title="ADD"
                    onPress={() => this.setState({ isModalOpen : true })}
                    style={{
                        padding : 10,
                        borderRadius : 3,
                        backgroundColor : colors.responder.mainHeader,
                        width : 100,
                        right : 0,
                        margin : 10,
                        alignItems : 'center',
                        justifyContent : 'center',
                    }}
                    titleStyle={{                
                        color : colors.fontColor,
                    }}
                />

                    <FlatList
                        data={this.state.reports}
                        renderItem={this.renderRow}
                        onRefresh={this.fetchReports}
                        refreshing={this.state.isFetching}
                    />
            </View>
        );
    }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
    fetchReports : () => dispatch(IncidentReportsService.fetchReports()),
    submitIncidentReport : (report) => dispatch(IncidentReportsService.submitReport(report)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncidentReport);
