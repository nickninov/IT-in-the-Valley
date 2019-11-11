import React, {Component} from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';

// Get screen dimensions
var {height, width} = Dimensions.get('window');

class JournalistComponent extends React.Component {

  // Hides the navigation's head and disables going back
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  // Initial constructor - declare all local states and event handler methods that are needed
  constructor(props) {
    super(props);

  }

  // Contains All React Native elements, arrays and fragments
  render(){
    return (
        <View style = {styles.contWrap}>
        
            <Text style = {styles.text}>Type: {this.props.type}</Text>
            
            <Text style = {styles.text}>Full name: {this.props.fullName}</Text>

            <Text style = {styles.article}>{this.props.article}</Text>
        </View>
    );
  }
}

// Stylesheet
const styles = StyleSheet.create({
  contWrap: {
    width: width * 0.97,
    backgroundColor: '#488000',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10
  },
  
  text: {
    fontSize: 25,
    textAlign: 'center',
    padding: '1.5%',
    color: 'white',
    fontWeight: 'bold'
  },

  article: {
    fontSize: 20,
    textAlign: 'justify',
    padding: '1.5%',
    color: 'white',
    lineHeight: 30
  },

  textSize: {
    fontSize: 20,
    textAlign: 'center',
    padding: '1.5%',
    color: 'white',
    fontWeight: 'bold'
  },

  imgWrapper: {
    height: height * 0.5,
    borderRadius: 10
  }
});

export default JournalistComponent;