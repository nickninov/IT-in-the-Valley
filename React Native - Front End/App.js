import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';

// import Navigation settings
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Import Button component 
import Button from './Components/Button';

// Import screens
import Users from './Components/Users/Users';
import Departments from './Components/Staff/Department Choice';
import Journalist from './Components/Users/Journalist';
import Photographer from './Components/Users/Photographer';
import Advertiser from './Components/Users/Advertiser';
import Submit from './Components/Users/SelectImageAndSubmit';
import Marketing from './Components/Staff/Departments/Marketing';
import Editing from './Components/Staff/Departments/Editing';

class App extends React.Component {

  // Hides the navigation's head and disables going back
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  // Initial constructor - declare all local states and event handler methods that are needed
  constructor(props) {
    super(props);

    // Create an initial Animated Value for the spinning logo
    this.RotateValueHolder = new Animated.Value(0);

    this.state = {
      // A state that will indicate if the intial screen must be changed to the Staff log in screen
      staffScreen: false,

      // A state that will store the password
      password: '',

      // A state that will store the username
      username: ''
    }
  }



  // A method that will change the initial screen to a Staff log in screen
  changeScreenToStaffLogIn(){
    // Change the state so the screen can be changed
    this.setState({
      staffScreen: true
    });
  }

  // A method that will try to log in the user with their given details
  logIn(username, password) {

    // Check if given details match the admin details
    if(username == 'admin' && password == 'admin'){
      // Clear the states for username and password
      this.setState({
        username: '',
        password: ''
      });
      this.props.navigation.navigate('Departments');
    }
    // If details do not match go to initial screen
    else {
      // Change state to change screen
      this.setState({
        staffScreen: false
      });

      // Force rerender the method render()
      this.forceUpdate();
    }
  }

  // A method that sets up an infinite spinning animation because the method is called within itself
  startRotation() {

    // Give the Animated Value  an initial value
    this.RotateValueHolder.setValue(0);

    // Specify details for the animation
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 6000,
      easing: Easing.linear,
    }).start(() => this.startRotation());
  }

  // Contains All React Native elements, arrays and fragments
  render(){
    // Inserts the values for the start position to the last position before updating
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '0deg'],
    });

    // Depending on the state value of staffScreen the screen will change
    if(this.state.staffScreen != true) {
        return (
          <View style={styles.container}>
    
            <Animated.Image source = {require('./assets/images/monkaS.png')} style = {{
              width: 100,
              height: 100,
              marginBottom: '5%',
              transform: [{ rotate: RotateData }]
            }} />
    
            <View style = {styles.contWrap}>
              <Text style = {styles.title}>IT in the Valley</Text>
        
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Users') } } >
                <Button buttonName={"User"} bgCol={"#488000"} />
              </TouchableOpacity>
    
              <TouchableOpacity onPress = {() => this.changeScreenToStaffLogIn()}>
                <Button buttonName={"Staff"}/>
              </TouchableOpacity>
            </View>
    
          </View>
        );
      }
      else {
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>

              <Animated.Image source = {require('./assets/images/monkaS.png')} style = {{
                width: 100,
                height: 100,
                marginBottom: '5%',
                alignSelf: 'center',
                transform: [{ rotate: RotateData }]
              }} />
      
              <View style = {styles.contWrap}>
                <Text style = {styles.title}>IT in the Valley</Text>
          
                <TextInput
                  style={styles.inputstyle}
                  placeholder="Username"
                  placeholderTextColor="#5B5B5B"
                  keyboardType="default"
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  onChangeText={username => this.setState({ username })}
                  value={this.state.username}
                  returnKeyType = "next"
                  onSubmitEditing = {() => this.passwordInput.focus()}
                />

                <TextInput
                  style={styles.inputstyle}
                  placeholder="Password"
                  placeholderTextColor="#5B5B5B"
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                  ref = {(input) => this.passwordInput = input}
                />

                  <TouchableOpacity onPress = {() => this.logIn(this.state.username, this.state.password)}>
                    <Button buttonName={"Log In"}/>
                  </TouchableOpacity>
              </View>

            </KeyboardAvoidingView>
        );
      }
    }


  // This method is executed after the render method
  componentDidMount() {
    this.startRotation();
  }
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cdfeff',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: App,
    },

    Users: {
      screen: Users,
    },

    Departments: {
      screen: Departments,
    },

    Journalist: {
      screen: Journalist,
    },

    Photographer: {
      screen: Photographer
    },
    Advertiser: {
      screen: Advertiser
    },
    Submit: {
      screen: Submit,
    },
    Marketing: {
      screen: Marketing,
    },
    Editing: {
      screen: Editing
    }
  },
  {
    initialRouteKey: 'Home',
  }
);
export default createAppContainer(AppNavigator);