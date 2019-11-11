import React, {Component} from 'react';
import { 
  StyleSheet, 
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';

// Dropdown
import RNPickerSelect from 'react-native-picker-select';

// Import Button component 
import Button from '../Button';

class Advertiser extends React.Component {

  // Hides the navigation's head and disables going back
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  // Initial constructor - declare all local states and event handler methods that are needed
  constructor(props) {
    super(props);

    // An array that will store 20 future issues that will be available for advertisers
    var futureIssues = new Array();

    // A variable for the current issue
    const currentIssue = 6;

    // A for loop that adds the future 20 issues
    for(var i = currentIssue + 2; i <= currentIssue + 20; i++){
      futureIssues.push({label: 'Issue '+i, value: 'Issue '+i});
    }

    // An array that will store all pages of the magazine
    var pages = new Array();

    // A variable that holds the total number of pages of a single magazine
    var numberOfPages = 50;

    // A for loop that adds all the pages
    for(var i = 1; i <= numberOfPages; i++){
      pages.push( { label: 'Page '+i, value: 'Page '+i },);
    }

    this.state = {
      // A state that will hold the user's first name
      firstName: '',

      // A state that will hold the user's last name
      lastName: '',

      // A state that will hold all advert sizes
      addSize: [
        {
          label: 'Square - 250 x 250',
          value: 'Square - 250 x 250'
        },
        {
          label: 'Small Square - 200 x 200',
          value: 'Small Square - 200 x 200'
        },
        {
          label: 'Banner - 468 x 60',
          value: 'Banner - 468 x 60'
        },
        {
          label: 'Leaderboard – 728 x 90',
          value: 'Leaderboard – 728 x 90'
        },
        {
          label: 'Inline Rectangle – 300 x 250',
          value: 'Inline Rectangle – 300 x 250'
        },
        {
          label: 'Large Rectangle – 336 x 280',
          value: 'Large Rectangle – 336 x 280'
        },
        {
          label: 'Skyscraper – 120 x 600',
          value: 'Skyscraper – 120 x 600'
        },
        {
          label: 'Wide Skyscraper – 160 x 600',
          value: 'Wide Skyscraper – 160 x 600'
        },
        {
          label: 'Half-Page Ad – 300 x 600',
          value: 'Half-Page Ad – 300 x 600'
        },
        {
          label: 'Large Leaderboard – 970 x 90',
          value: 'Large Leaderboard – 970 x 90'
        },
        
      ],

      // A state that will hold the selected advert size
      selectedAdvertSize: '',

      // A state that will hold the ads issue of appearance
      issue: currentIssue,

      // A state that will hold all the future issues to be shown
      futureIssues: futureIssues,

      // A state that holds the number of pages
      totalPages: pages,
      
      // A state that will hold the advert's page
      advertPage: 0,
    }
  }

  // A method that POSTS the entered data to the API
  async saveDetails(issue, addSize, page){

    // Check if fields any fields are empty
    if (issue != null && addSize != null && page != 0) {

      // Save details in local storage
      await AsyncStorage.setItem('issue', issue);
      await AsyncStorage.setItem('addSize', addSize);
      await AsyncStorage.setItem('page', page);

      this.props.navigation.navigate('Submit');
    }
    else {
      alert("Please fill up empty fields");
    }
  }

  async componentWillMount() {
    
  }

  // Contains All React Native elements, arrays and fragments
  render(){

    return (
      <View style={styles.container}>

        <Image source = {require('../../assets/images/monkaS.png')} style = {styles.logo} />
       
        <View style = {styles.contWrap}>
          <View style = {styles.dropdown}>
            <RNPickerSelect
              onValueChange={(selectedIssue) => this.setState({issue: selectedIssue})}
              placeholder = {{label: 'Select issue'}}
              style = {{
                placeholder: {
                  color: 'black',
                  fontSize: 15
                },
              }}
              items={this.state.futureIssues}/>
        </View>

        <View style = {styles.dropdown}>
          <RNPickerSelect
            onValueChange={(addSize) => this.setState({selectedAdvertSize: addSize})}
            placeholder = {{label: 'Select advert size'}}
            style = {{
              placeholder: {
                color: 'black',
                fontSize: 15
              },
          }}
            items={this.state.addSize}/>
        </View>

        <View style = {styles.dropdown}>
          <RNPickerSelect
            onValueChange={(page) => this.setState({advertPage: page})}
            placeholder = {{label: 'Select page'}}
            style = {{
              placeholder: {
                color: 'black',
                fontSize: 15
              },
            }}
            items={this.state.totalPages}/>
        </View>

 
        <TouchableOpacity onPress = {() =>
              this.saveDetails(this.state.issue, this.state.selectedAdvertSize, this.state.advertPage)}>
            <Button buttonName={"Finalize"} />
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

  contWrap: {
    width: '100%',
  },

  dropdown: {
    backgroundColor: '#fff',
    paddingTop: '2.5%',
    paddingBottom: '2.5%',
    paddingLeft: '1%',
    marginLeft: '1.5%',
    marginRight: '1.5%',
    marginTop: '1.5%',
    marginBottom: '1.5%',
    borderRadius: 10,
    borderWidth: 1
  },

  btnWrapper: {
    marginLeft: '2%',
    marginRight: '2%',
  },

  imgWrapper: {
    alignItems: 'center'
  }

});

export default Advertiser;