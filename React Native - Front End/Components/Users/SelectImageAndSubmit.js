import React, {Component} from 'react';
import { 
  StyleSheet, 
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

// Import permission to select images on iOS devices
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

// Import Button component 
import Button from '../Button';

// Import Image Picker to select a picture from the users device
import * as ImagePicker from 'expo-image-picker';

// Import Firebase to store images
import * as firebase from 'firebase';
import {storage} from 'firebase';

// Firebase confiiguration details
const firebaseConfig = {
    apiKey: 'AIzaSyDh2HJwE9BCU9HFIbI3qMiDKMxMqNhJC3Q',
    authDomain: 'react-firebase-654c0.firebaseapp.com',
    databaseURL: 'https://react-firebase-654c0.firebaseio.com',
    projectId: 'react-firebase-654c0',
    storageBucket: 'react-firebase-654c0.appspot.com',
    messagingSenderId: '914571629159',
    appId: '1:914571629159:web:df2b6ffd98fb0cae',
  };
  
  // Start firebase database
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    console.log(err)
  }

class Submit extends React.Component {

  // Hides the navigation's head and disables going back
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  // Initial constructor - declare all local states and event handler methods that are needed
  constructor(props) {
    super(props);

    this.state = {
        // A state that will hold the image's path
        image: null,
    }
  }
    // A method that lets the user insert an image to the application
    choosePhoto = async () => {
        // Display the system's UI for choosing an image or a video from the phone's library.
        let result = await ImagePicker.launchImageLibraryAsync({

            // Chooses what type of media should be accepted - Images, Video or All (both images and videos)
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });

        // Checks if the returned value is cancelled or not
        if (!result.cancelled) {
            this.setState({ 
                image: result.uri
            });
        }
    };

    async handleUpload(image) {

      if(image != null ){
        // Temporary variables that hold the data from the form
        var issue = await AsyncStorage.getItem('issue');
        var addSize = await AsyncStorage.getItem('addSize');
        var page = await AsyncStorage.getItem('page');

        var firstName = await AsyncStorage.getItem('firstName');
        var lastName = await AsyncStorage.getItem('lastName');

        var type = await AsyncStorage.getItem('type');

        var caption = await AsyncStorage.getItem('caption')

        // A variable that will hold the ip of the localhost
        var ip = 'http://localhost:3000/addMagazine';
                
        // Check which api structure to call
        switch(type){

          case 'Photographer':
            
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
                image: image,
                text: caption
            })
            }).then((response) => {
              // Remove local storage data
              AsyncStorage.removeItem('issue');
              AsyncStorage.removeItem('addSize');
              AsyncStorage.removeItem('page');
              AsyncStorage.removeItem('firstName');
              AsyncStorage.removeItem('lastName');
              AsyncStorage.removeItem('type');

              // Remove local storage data
              AsyncStorage.removeItem('type');
              AsyncStorage.removeItem('firstName');
              AsyncStorage.removeItem('lastName');

              // Executes when data has been successfully sent
              alert("Thank you for submitting your details! We will be in touch with you soon!");
              this.props.navigation.navigate('Home');
            });

            break;
          
          case 'Advertiser':
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
                issue: issue,
                page: page,
                image: image,
                size: addSize
            })
            }).then((response) => {
              // Remove local storage data
              AsyncStorage.removeItem('issue');
              AsyncStorage.removeItem('addSize');
              AsyncStorage.removeItem('page');
              AsyncStorage.removeItem('firstName');
              AsyncStorage.removeItem('lastName');
              AsyncStorage.removeItem('type');

              // Executes when data has been successfully sent
              alert("Thank you for submitting your details! We will be in touch with you soon!");
              this.props.navigation.navigate('Home');
            });
            break;
          }

        }
        else {
          alert("Select image");
        }
    }

    // Asks the user to give the app permission to access the camera roll
    getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions so you can select your images!');
        }
      }
    }

    // Executes after the initial render
    componentDidMount() {
      this.getPermissionAsync();
    }

  // Contains All React Native elements, arrays and fragments
  render(){
    let {image} = this.state
    return (
      <View style = {styles.container}>
        
        <Image source = {require('../../assets/images/monkaS.png')} style = {styles.logo} />

        <View style = {styles.contWrap}> 
            <TouchableOpacity onPress = {() => this.choosePhoto()}>
                <Button buttonName={"Select image"} />
            </TouchableOpacity>

            {
                image && <Image source={{ uri: image }} style={{ marginLeft: 10, marginRight: 10, height: 300 }} />
            }

            <TouchableOpacity onPress = {() => this.handleUpload(image)}>
                <Button buttonName={"Submit"} />
            </TouchableOpacity> 
        </View> 
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

export default Submit;