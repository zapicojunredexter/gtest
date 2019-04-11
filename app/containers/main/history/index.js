import React from 'react';
import { connect } from 'react-redux';
import { View, Text, SectionList } from 'react-native';

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
    }

    render() {
        const { sections } = this.props;
        return (// Example 1 (Homogeneous Rendering)
            <SectionList
                onRefresh={() => {}}
                refreshing={false}
                stickySectionHeadersEnabled
                renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={{fontWeight: 'bold'}}>{title}</Text>
                )}
                sections={sections}
                keyExtractor={(item, index) => item + index}
            />
        );
    }
}

const mapStateToProps = store => ({
    sections : [
        {
            title : 'UPCOMING BOOKED TRIPS',
            data : [
                'asd',
                'asd',
                'asd',
                'asd',
            ]
        },
        {
            title : 'PREVIOUS TRIPS',
            data : [
                'zxc',
                'zxc',
                'zxc',
                'zx',
            ]
        }
    ]
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
// export default Container;