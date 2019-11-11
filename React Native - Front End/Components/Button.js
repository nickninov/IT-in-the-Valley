import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
} from 'react-native';

class Button extends React.Component {

    render(){
        return (
            <View style = {styles.button}>
              <Text style = {styles.text}>{this.props.buttonName}</Text>
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
        borderWidth: 2
    },

    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 40
    }
});

export default Button;
