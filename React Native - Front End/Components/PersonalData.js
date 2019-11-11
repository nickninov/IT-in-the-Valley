import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
} from 'react-native';

class PersonalData extends React.Component {

    render(){
        return (
            <View style = {styles.button}>
              <Text style = {styles.text}>{this.props.firstName} {this.props.lastName}</Text>
              <Text style = {styles.text}>{this.props.email}</Text>
            </View>
        );
    }
    
}

// Stylesheet
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#488000',
        padding: '1.5%',
        borderRadius: 5,
        marginTop: '2%',
        marginBottom: '2%',
        borderWidth: 2,
        marginTop: '5%',
        marginBottom: '5%'
    },

    text: {
        color: 'white',
        fontSize: 25
    }
});

export default PersonalData;
