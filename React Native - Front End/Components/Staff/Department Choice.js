import React, {Component} from 'react';
import { 
  StyleSheet, 
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';

// Import Button component 
import Button from '../Button';

class Departments extends React.Component {

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
      <View style={styles.container}>

        <Animated.Image source = {require('../../assets/images/monkaS.png')} style = {styles.logo} />

        <View style = {styles.contWrap}>

            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Marketing'); } } >
                <Button buttonName={"Marketing"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Editing'); } } >
                <Button buttonName={"Editing"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {alert("Coming soon!");} } >
                <Button buttonName={"Processing"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {alert("Coming soon!");} } >
                <Button buttonName={"Accounts"} />
            </TouchableOpacity>
        </View>

      </View>
    );
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

  logo: {
    width: 150,
    height: 150,
  },

  title: {
    textAlign: 'center',
    fontSize: 40,
    padding: '5%',
    fontWeight: "700"
  },

  contWrap: {
      marginTop: '10%',
  }
});

export default Departments;