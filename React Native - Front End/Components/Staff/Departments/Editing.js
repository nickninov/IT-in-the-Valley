import React, {Component} from 'react';
import { 
  StyleSheet, 
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';

// Dropdown
import RNPickerSelect from 'react-native-picker-select';

// Import Button component 
import Button from '../../Button';
import PersonalData from '../../PersonalData';
import AdvertiserComponent from './MarketingComponents/AdvertiserComponent';
import PhotographerComponent from './MarketingComponents/PhotographerComponent';
import JournalistComponent from './MarketingComponents/JournalistComponent';

// Get the screens dimensions to position logo in the middle
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Editing extends React.Component {

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
        journalistData: [],

        // States that will hold the edible information
        page: '',
        issue: '',
        size: '',
        text: '',
        id: '',

        // State that will determin which screen to show
        editScreen: 'Home',

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

        // State that holds the size of an advert
        size: '',

        // State that holds the page of the advert
        page: '',

        // State that holds the issue of the advert's appearance
        issue: '',

        // A state that holds the personal data
        personalData: [],

        // A state that holds the email for the email screen
        emailHolder: '',

    }
  }

  // A method that inserts the data in states
  setData(){
    // A variable that will hold the ip of the localhost
    var ip = 'http://localhost:3000/EditingData';

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

  async changeScreen(id, type, text, page, issue, size){

    // Display proper editing component depending on the type 
    switch(type){
      case "Advertiser":
        // Set states to edit data
        await this.setState({
          id: id,
          editScreen: type,

          page: page,
          issue: issue,
          size: size
        });

        break;

      case "Journalist":
        // Set states to edit data
        await this.setState({
          id: id,
          editScreen: type,

          text: text
        });
        break;

      case "Photographer":
        // Set states to edit data
        await this.setState({
          id: id,
          editScreen: type,

          text: text
        });
        break;
    }
  }

  editDetails(id, type, text, page, issue, size) {

    // Update proper editing component depending on the type 
    switch(type){
      case "Advertiser":
 
        // Update data
        fetch('http://localhost:3000/EditingData/Advertiser/'+id+'/'+page+'/'+issue+'/'+size)
        .catch(err => console.log(err));
        break;

      case "Journalist":

        // Update data
        fetch('http://localhost:3000/EditingData/Journals/'+id+'/'+text)
        .catch(err => console.log(err));
        
        break;

      case "Photographer":

        // Update data
        fetch('http://localhost:3000/EditingData/Photographer/'+id+'/'+text)
        .catch(err => console.log(err));

        break;
    }

    // Fetch data and new scereen
    this.setData();

    this.setState({
      editScreen: 'Home'
    })
  }

  // A method that will allow to access all users' personal data
  email() {
    
    fetch('http://localhost:3000/PersonalData')
    .then(response => response.json())
    .then(responseJson => {
      
      // Store the personal data inside a state and change the screen
      this.setState({
        personalData: responseJson,
        editScreen: 'PersonalData'
      });

    });
  }

  // A method that will change the screen and hold the email address
  emailScreen(email){
    this.setState({
      editScreen: 'Email',
      emailHolder: email
    });

    console.log(this.state.emailHolder)
  }


  // Contains All React Native elements, arrays and fragments
  render(){
    // A variable that will display the data
    const advertiserData = this.state.advertiserData;
    const journalistData = this.state.journalistData;
    const photographerData = this.state.photographerData;

    // Check which screen to open
    if(this.state.editScreen == 'Home') {
        return (
          <View style={styles.container}>
          <SafeAreaView>

            <Text style = {styles.header}>Editing Department</Text>
            <ScrollView>

            {
              // Display all Advertiser data with their component and button
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

                  <TouchableOpacity onPress = {() => this.changeScreen(advertiserComponent._id, advertiserComponent.type, advertiserComponent.text, advertiserComponent.page, advertiserComponent.issue, advertiserComponent.size)}>
                      <Button buttonName={"Edit"}/>
                  </TouchableOpacity>

                </View>
              )
            }

            {
              // Display all Journalist with their component and button
              journalistData.map(journalistComponent =>
                <View key = {journalistComponent._id}> 

                  <JournalistComponent 
                    key = {journalistComponent._id}
                    fullName = {journalistComponent.firstName + " " + journalistComponent.lastName}
                    type = {journalistComponent.type}
                    article = {journalistComponent.text}
                  />

                  <TouchableOpacity onPress = {() => this.changeScreen(journalistComponent._id, journalistComponent.type, journalistComponent.text)}>
                      <Button buttonName={"Edit"}/>
                  </TouchableOpacity>

                </View>
              )
            }

            {
              // Display all Advertiser data with their component and button
              photographerData.map(photographerComponent => 
                <View key = {photographerComponent._id}>
                  <PhotographerComponent 
                    fullName = {photographerComponent.firstName + " " + photographerComponent.lastName}
                    type = {photographerComponent.type}
                    source = {{uri: photographerComponent.image}}
                    caption = {photographerComponent.text}
                  />

                  <TouchableOpacity onPress = {() => this.changeScreen(photographerComponent._id, photographerComponent.type, photographerComponent.text)}>
                    <Button buttonName={"Edit"}/>
                  </TouchableOpacity>
                </View>
              )
            }

            </ScrollView>

            <TouchableOpacity onPress = {() => this.email()}>
              <Button buttonName={"Email"}/>
            </TouchableOpacity>
          </SafeAreaView>
          </View>
        );
    }

    // Check which screen to open
    else if(this.state.editScreen == "Advertiser"){
      return(
        <View style={styles.container}>
          <View style = {{width: '100%'}}>

            <Text style={styles.header}>Edit Advertiser</Text>

            <View style = {styles.dropdown}>
              <RNPickerSelect
                onValueChange={(addSize) => this.setState({size: addSize})}
                placeholder = {{label: this.state.size}}
                style = {{
                  placeholder: {
                    color: 'black',
                    fontSize: 15
                  },
                }}
                items={this.state.addSize}/>
              </View>
            
              <TextInput
                style={styles.inputstyle}
                keyboardType="default"
                onChangeText={page => this.setState({ page: page })}
                value={this.state.page}
              />
    
              <TextInput
                style={styles.inputstyle}
                keyboardType="default"
                onChangeText={issue => this.setState({ issue: issue })}
                value={this.state.issue}
              />

              <TouchableOpacity onPress = {() => this.editDetails(this.state.id, this.state.editScreen, this.state.text, this.state.page, this.state.issue, this.state.size)}>
                <Button buttonName={"Edit"}/>
            </TouchableOpacity>

          </View>
        </View>
      )
    }

    // Check which screen to open
    else if(this.state.editScreen == "Journalist"){
      return(
        <View style={styles.container}>
          <View style = {{width: '100%'}}>

            <Text style={styles.header}>Edit Article</Text>
            
            <TextInput
              multiline={true}
              numberOfLines={1000}
              style={styles.textInput}
              onChangeText={article => this.setState({ text: article })}
              value={this.state.text}
            />

            <TouchableOpacity onPress = {() => this.editDetails(this.state.id, this.state.editScreen, this.state.text)}>
                <Button buttonName={"Edit"}/>
            </TouchableOpacity>

          </View>
        </View>
      )
    }

    // Check which screen to open
    else if(this.state.editScreen == "Photographer"){
      return(
        <View style={styles.container}>

          <Text style={styles.header}>Edit Caption</Text>

          <View>
            <TextInput
              style={styles.inputstyle}
              keyboardType="default"
              onChangeText={caption => this.setState({ text: caption })}
              value={this.state.text}
            />

            <TouchableOpacity onPress = {() => this.editDetails(this.state.id, this.state.editScreen, this.state.text)}>
              <Button buttonName={"Edit"}/>
            </TouchableOpacity>

          </View>

        </View>
      )
    }

    // Check which screen to open
    else if(this.state.editScreen == "PersonalData"){
      return(
        <View style={styles.container}>

          <SafeAreaView>

            <Text style={styles.header}>Email</Text>

            <ScrollView style = {{width: '100%'}}>

              
            {
              this.state.personalData.map(person => 
              <TouchableOpacity onPress = {() => alert("Coming soon!")}
                key = {person._id}
              >
                <PersonalData
                  firstName = {person.firstName} 
                  lastName = {person.lastName}
                  email = {person.email}
                />
              </TouchableOpacity>
              )
            }

            </ScrollView>
            
            <TouchableOpacity onPress = {() => this.setState({editScreen: 'Home'})}>
              <Button buttonName={"Back"}/>
            </TouchableOpacity>

          </SafeAreaView>
        </View>
      )
    }
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

  miniHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: '3%'
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '5%'
  },

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

  textInput: {
    height: height * 0.3,
    width: width * 0.95,
    backgroundColor: 'white',
    borderWidth: 2,
    borderStyle: 'solid',
    fontSize: 20,
    borderRadius: 5,
    marginBottom: '3%',
    textAlign: 'justify'
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
  },

  textInput: {
    height: height * 0.3,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderStyle: 'solid',
    fontSize: 20,
    borderRadius: 5,
    marginBottom: '3%'
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
    borderWidth: 1,
    width: width * 0.95
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
  
});

export default Editing;