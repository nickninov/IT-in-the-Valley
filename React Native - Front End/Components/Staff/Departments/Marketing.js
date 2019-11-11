import React, {Component} from 'react';
import { 
  StyleSheet, 
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Text
} from 'react-native';

// Import Button component 
import Button from '../../Button';
import AdvertiserComponent from './MarketingComponents/AdvertiserComponent';
import PhotographerComponent from './MarketingComponents/PhotographerComponent';
import JournalistComponent from './MarketingComponents/JournalistComponent';

// Get the screens dimensions to position logo in the middle
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Marketing extends React.Component {

  // Hides the navigation's head and disables going back
  static navigationOptions = {
    header: null,

  };

  // Initial constructor - declare all local states and event handler methods that are needed
  constructor(props) {
    super(props);

    this.state = {
      // States that will store information for each component
      advertiserData: [],
      photographerData: [],
      journalistData: []
    }
  }


  // Send to Editing database and remove from the Marketing database
  approve(id) {

    // Fetch data for user from Marketing Department 
    fetch('http://localhost:3000/data/'+id)
    .then((response) => response.json())
    .then((responseJson) => {

      // Temporary object to store the Json response 
      var tempJsonHolder = responseJson;

      // Send data to the Editing Department
      fetch('http://localhost:3000/addEditingDepartment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: tempJsonHolder.firstName,
          lastName: tempJsonHolder.lastName,
          type: tempJsonHolder.type,
          issue: tempJsonHolder.issue,
          page: tempJsonHolder.page,
          image: tempJsonHolder.image,
          size: tempJsonHolder.size,
          text: tempJsonHolder.text
      })
      }).then((response) => {
        // Delete from Marketing stack
        this.delete(tempJsonHolder._id);
        // Inform user that data has been sent to Editing Screen
        alert("Edits successfully transfered!");
        
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  // Remove an object from database
  delete(id) {
    fetch('http://localhost:3000/data/delete/'+id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.text())
    .then((res) => {
      // Refresh the data
      this.setData();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  // A method that inserts the data in states
  setData(){
    // A variable that will hold the ip of the localhost
    var ip = 'http://localhost:3000/data';

    // Variables that will temporary hold the api data to transfer to the particular sstate
    var tempAdvertiserData = new Array();
    var tempPhotographerData = new Array();
    var tempJournalistData = new Array();

    // Fetches all the data from the API
    fetch(ip).then((response) => response.json())
    .then((responseJson) => {
      for(var i = 0; i < responseJson.length; i++){
        
        // Pushes the current object in an array depending on the responseJson[i].type
        switch(responseJson[i].type){ 
          case "Advertiser":
            tempAdvertiserData.push(responseJson[i]);
            break;

          case "Photographer":
            tempPhotographerData.push(responseJson[i]);
            break;

          case "Journalist":
            tempJournalistData.push(responseJson[i]);
            break
        }
      }

      // Put data in a particular data
      this.setState({
        advertiserData: tempAdvertiserData,
        journalistData: tempJournalistData,
        photographerData: tempPhotographerData
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  // Fetches all the data from the API after the initial render
  componentDidMount(){
    this.setData();
  }

  // Contains All React Native elements, arrays and fragments
  render(){
    // A variable that will display the data
    const advertiserData = this.state.advertiserData;
    const journalistData = this.state.journalistData;
    const photographerData = this.state.photographerData;


    return (
      <View style={styles.container}>
      <SafeAreaView>

        <Text style = {styles.header}>Marketing Department</Text>
        <ScrollView>

        {
          // Display all Advertiser data with their component and buttons
          advertiserData.map(advertiserComponent =>
          
            <View key = {advertiserComponent._id}> 

              <AdvertiserComponent 
                fullName = {advertiserComponent.firstName + " " + advertiserComponent.lastName}
                source = {{uri: advertiserComponent.image}}
                issue = {advertiserComponent.issue}
                page = {advertiserComponent.page}
                type = {advertiserComponent.type}
                size = {advertiserComponent.size}
              />

              <TouchableOpacity onPress = {() => this.approve(advertiserComponent._id)}>
                <Button buttonName={"Approve"}/>
              </TouchableOpacity>

              <TouchableOpacity onPress = {() => this.delete(advertiserComponent._id)}>
                <Button buttonName={"Delete"}/>
              </TouchableOpacity>

            </View>
          )
        }

        {
          // Display all Journalist with their component and buttons
          journalistData.map(journalistComponent =>
            <View key = {journalistComponent._id}> 

              <JournalistComponent 
                key = {journalistComponent._id}
                fullName = {journalistComponent.firstName + " " + journalistComponent.lastName}
                type = {journalistComponent.type}
                article = {journalistComponent.text}
              />

              <TouchableOpacity onPress = {() => this.approve(journalistComponent._id)}>
                <Button buttonName={"Approve"}/>
              </TouchableOpacity>

              <TouchableOpacity onPress = {() => this.delete(journalistComponent._id)}>
                <Button buttonName={"Delete"}/>
              </TouchableOpacity>

          </View>
          )
        }

        {
          // Display all Journalist with their component and buttons
          photographerData.map(photographerComponent => 
            <View key = {photographerComponent._id}>
              <PhotographerComponent 
                fullName = {photographerComponent.firstName + " " + photographerComponent.lastName}
                type = {photographerComponent.type}
                source = {{uri: photographerComponent.image}}
                caption = {photographerComponent.text}
              />

              <TouchableOpacity onPress = {() => this.approve(photographerComponent._id)}>
                <Button buttonName={"Approve"}/>
              </TouchableOpacity>


              <TouchableOpacity onPress = {() => this.delete(photographerComponent._id)}>
                <Button buttonName={"Delete"}/>
              </TouchableOpacity>

            </View>
          )
        }

        </ScrollView>
      </SafeAreaView>
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

  scrollMargin: {
    margin: 0,
    padding: 0,
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '5%'
  }
  
});

export default Marketing;