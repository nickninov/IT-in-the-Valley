import React, {Component} from 'react';
import { 
  StyleSheet,  
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';

// Import Button component 
import Button from '../Button';

// Get the screens dimensions to position logo in the middle
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Journalist extends React.Component {

  // Hides the navigation's head and disables going back
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  // Initial constructor - declare all local states and event handler methods that are needed
  constructor(props) {
    super(props);

    this.state = {
      article: ''
    }
  }

  async submit(text) {
    if(text != ''){

      var firstName = await AsyncStorage.getItem('firstName');
      var lastName = await AsyncStorage.getItem('lastName');
      var type = await AsyncStorage.getItem('type');

      // A variable that will hold the ip of the localhost
      var ip = 'http://localhost:3000/addMagazine';

      // Sends the data to the Node JS server
      fetch( ip, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            type: type,
            text: text
        })
        }).then((response) => {
          // Remove local storage data
          AsyncStorage.removeItem('issue');
          AsyncStorage.removeItem('addSize');
          AsyncStorage.removeItem('page');
          AsyncStorage.removeItem('firstName');
          AsyncStorage.removeItem('lastName');
          AsyncStorage.removeItem('type');

          // Clear text field
          this.setState({
            article: ''
          })
          // Executes when data has been successfully sent
          alert("Thank you for submitting your details! We will be in touch with you soon!");
          this.props.navigation.navigate('Home');
        });
    }
  }

  // Contains All React Native elements, arrays and fragments
  render(){
    return (
      <KeyboardAvoidingView behavior="padding" enabled style = {styles.container}>

        <View>

          <Text style = {styles.text}>Article</Text>

          <TextInput
            multiline={true}
            numberOfLines={1000}
            style={styles.textInput}
            onChangeText={article => this.setState({ article })}
            value={this.state.article}
          />

          <TouchableOpacity onPress = {() => this.submit(this.state.article)}>
            <Button buttonName={"Submit"} />
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
      
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
    height: height * 0.3,
    width: width * 0.95,
    backgroundColor: 'white',
    borderWidth: 2,
    borderStyle: 'solid',
    fontSize: 20,
    borderRadius: 5,
    marginBottom: '3%'
  }
});

export default Journalist;