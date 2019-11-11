import React, {Component} from 'react';
import { 
  StyleSheet, 
  View,
  Image,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';

// Import Button component 
import Button from '../Button';

class User extends React.Component {

  // Hides the navigation's head and disables going back
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  // Initial constructor - declare all local states and event handler methods that are needed
  constructor(props) {
    super(props);

    this.state = {
      // A state that will hold the user's first name
      firstName: '',

      // A state that will hold the user's last name
      lastName: '',

      // A state that will hold the user's email address
      email: ''
    }
  }
  
  // Contains All React Native elements, arrays and fragments
  render(){

    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        
        <Image source = {require('../../assets/images/monkaS.png')} style = {styles.logo} />

        <View style = {styles.contWrap}> 
          <TextInput
            style={styles.inputstyle}
            placeholder="First Name"
            placeholderTextColor="#5B5B5B"
            keyboardType="default"
            autoCapitalize={"words"}
            autoCorrect={false}
            onChangeText={firstName => this.setState({ firstName })}
            value={this.state.firstName}
            returnKeyType = "next"
            onSubmitEditing = {() => this.lastNameInput.focus()}
          />

          <TextInput
            style={styles.inputstyle}
            placeholder="Last Name"
            placeholderTextColor="#5B5B5B"
            keyboardType="default"
            autoCapitalize={"words"}
            autoCorrect={false}
            onChangeText={lastName => this.setState({ lastName })}
            value={this.state.lastName}
            ref = {(input) => this.lastNameInput = input}
            returnKeyType = "next"
            onSubmitEditing = {() => this.emailInput.focus()}
          />

          <TextInput
            style={styles.inputstyle}
            placeholder="E-mail"
            placeholderTextColor="#5B5B5B"
            keyboardType="default"
            autoCapitalize={"none"}
            autoCorrect={false}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            ref = {(input) => this.emailInput = input}
          />

          <View style = {styles.btnWrapper}>
              <TouchableOpacity onPress = {() => 
                  this.validateNames(this.state.firstName, this.state.lastName, this.state.email, "Journalist")}>
                  <Button buttonName={"Journalist"} />
              </TouchableOpacity>

              <TouchableOpacity onPress = {() => 
                  this.validateNames(this.state.firstName, this.state.lastName, this.state.email, "Photographer")}>
                  <Button buttonName={"Photographer"} />
              </TouchableOpacity>

              <TouchableOpacity onPress = {() => 
                  this.validateNames(this.state.firstName, this.state.lastName, this.state.email, "Advertiser")}>
                  <Button buttonName={"Advertiser"} />
              </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    );
  }

  // A method that will save the user's names in local storage and allow them to select the publish
  validateNames = async (firstName, lastName, email, step) => {

    // Check if both names are empty
    if(firstName != '' && lastName != '' && email != ''){

      fetch('http://localhost:3000/addPersonalData', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
        })
      }).then((response) => {

        // Check status - ok
        if(response.status == 200) {

          // Save names in local storage
          AsyncStorage.setItem('firstName', firstName);
          AsyncStorage.setItem('lastName', lastName);

          // Check which screen should the program lead to
          switch(step){
            case 'Journalist':
              this.props.navigation.navigate('Journalist');
              break;

            case 'Photographer':
              this.props.navigation.navigate('Photographer');
              break;
            
            case 'Advertiser':
                this.props.navigation.navigate('Advertiser');
                break;
          }
          // Save user type in local storage
          AsyncStorage.setItem('type', step);
        }
        else {
          alert("Invalid e-mail");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    else {
      alert("Please fill up empty fields");
    }
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

  title: {
    textAlign: 'center',
    fontSize: 40,
    padding: '5%',
    fontWeight: "700"
  },

  inputstyle: {
    backgroundColor: '#fff',
    fontSize: 22,
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1
  },

  contWrap: {
    width: '100%',
  },
});

export default User;