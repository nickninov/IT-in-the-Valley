import React, {Component} from 'react';
import { 
  StyleSheet,  
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  Dimensions,
  AsyncStorage
} from 'react-native';

// Import Button component 
import Button from '../Button';

// Get the screens dimensions to position logo in the middle
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Photographer extends React.Component {

  // Hides the navigation's head and disables going back
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  // Initial constructor - declare all local states and event handler methods that are needed
  constructor(props) {
    super(props);

    this.state = {
      caption: ''
    }
  }

  async nextStep(caption) {
    if(caption != ''){
      await AsyncStorage.setItem('caption', caption);
      this.props.navigation.navigate('Submit');
    }
    else {
      alert("Please insert caption")
    }
  }

  // Contains All React Native elements, arrays and fragments
  render(){
    return (
      <View style = {styles.container}>
        <KeyboardAvoidingView behavior="padding" enabled>

        <View>
          <Text style = {styles.text}>Add caption</Text>
          <TextInput
            multiline={true}
            numberOfLines={2}
            style={styles.textInput}
            onChangeText={caption => this.setState({ caption })}
            value={this.state.caption}
          />

          <TouchableOpacity onPress = {() => this.nextStep(this.state.caption)}>
            <Button buttonName={"Next"} />
          </TouchableOpacity>

        </View>

        </KeyboardAvoidingView>
      </View>
      
    );
  }
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cdfeff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  logo: {
    width: 100,
    height: 100,
  },

  text: {
    fontSize: 35,
    textAlign: 'center',
    padding: '5%'
  },

  textInput: {
    width: width * 0.95,
    backgroundColor: 'white',
    borderWidth: 2,
    borderStyle: 'solid',
    fontSize: 20,
    borderRadius: 5,
    padding: '2%',
    marginBottom: '3%'
  }
});

export default Photographer;