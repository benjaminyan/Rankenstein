import React, { Component } from 'react';
import { StyleSheet, Image, Text, Title, TextInput, View, TouchableOpacity, Platform, Scene, FlatList, ActivityIndicator, BackHandler, Alert} from 'react-native';
import {createStackNavigator, NavigationActions, TabNavigator, TabBarBottom, createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import BottomNavigation, {IconTab,Badge,NavigationComponent,Tab} from 'react-native-material-bottom-navigation';
import { Ionicons } from '@expo/vector-icons'; 
import { List, ListItem, SearchBar, Button } from "react-native-elements";
import FontAwesome, { Icons } from "react-native-fontawesome";
import ReactTimeout from 'react-timeout';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';
import RNExitApp from 'react-native-exit-app';
import PhoneInput from 'react-native-phone-input';
import CodeInput from 'react-native-confirmation-code-input';
import Config from 'react-native-config';



class LoginScreen extends React.Component{
  static navigationOptions = {
    header: null
  }
  state = {
      username: '',
      password: '',
      titleText: "Rankenstein",
  }
  componentDidMount() {

        if (Platform.OS === 'android') {
            this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {
                BackHandler.exitApp()
                return true;
            });
        }
  }
  handleUsername = (text) => {
      this.setState({ username: text })
  }
  handlePassword = (text) => {
      this.setState({ password: text })
  }
  login = (username, pass) => {
      alert('username: ' + username + ' password: ' + pass)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
        {'\n'}{this.state.titleText}{'\n'}{'\n'}
        </Text>
        <TextInput style = {styles.input}
           underlineColorAndroid = "transparent"
           placeholder = "Username"
           placeholderTextColor = "gray"
           autoCapitalize = "none"
           onChangeText = {this.handleUsername}/>
        <TextInput style = {styles.input}
           secureTextEntry={true}
           underlineColorAndroid = "transparent"
           placeholder = "Password"
           placeholderTextColor = "gray"
           autoCapitalize = "none"
           onChangeText = {this.handlePassword}/>
        <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.props.navigation.navigate('Home', {un: this.state.username})
               }>
               <Text style = {styles.submitButtonText}> Login </Text>
        </TouchableOpacity>
        <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.props.navigation.navigate('Create', {title: "Create Account"})
				  
               }>
               <Text style = {styles.submitButtonText}> Create New Account </Text>
        </TouchableOpacity>
      </View>
    );
  }
}



class NewsfeedScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  
  componentDidMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        this.makeRemoteRequest();

        if (Platform.OS === 'android') {
            this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {
                BackHandler.exitApp()
                return true;
            });
        }
  }
  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
	fetch(url)
	  .then(res => res.json())
	  .then(res => {
		this.setState({
		  data: page === 1 ? res.results : [...this.state.data, ...res.results],
		  error: res.error || null,
		  loading: false,
		  refreshing: false
		});
	  })
	  .catch(error => {
		this.setState({ error, loading: false });
	  });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Find Friends..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

	return (
		  <View
		    style={{
		      paddingVertical: 10,
		      borderTopWidth: 1,
		      borderColor: "#CED0CE"
		    }}
		  >
		    <ActivityIndicator animating size="large" />
		  </View>
	);
  };
  render() {
    return(
        <View style={styles.flatListContainer}>
		    <FlatList
		      data={this.state.data}
		      renderItem={({ item }) => (
		        <ListItem
		          roundAvatar
		          title={`${item.name.first} ${item.name.last}`}
		          subtitle={item.email}
		          avatar={{ uri: item.picture.thumbnail }}
		          containerStyle={{ borderBottomWidth: 0 }}
		        />
		      )}
		      keyExtractor={item => item.email}
		      ItemSeparatorComponent={this.renderSeparator}
		      ListHeaderComponent={this.renderHeader}
		      ListFooterComponent={this.renderFooter}
		      onRefresh={this.handleRefresh}
		      refreshing={this.state.refreshing}
		      onEndReached={this.handleLoadMore}
		      onEndReachedThreshold={100}
		    />
		</View>
    );
  }
 

}

class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  
  componentDidMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        this.makeRemoteRequest();

        if (Platform.OS === 'android') {
            this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {
                this.props.navigation.navigate('Newsfeed', {title: "Settings"})
                return true;
            });
        }
    }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
	fetch(url)
	  .then(res => res.json())
	  .then(res => {
		this.setState({
		  data: page === 1 ? res.results : [...this.state.data, ...res.results],
		  error: res.error || null,
		  loading: false,
		  refreshing: false
		});
	  })
	  .catch(error => {
		this.setState({ error, loading: false });
	  });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Find Friends..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

	return (
		  <View
		    style={{
		      paddingVertical: 10,
		      borderTopWidth: 1,
		      borderColor: "#CED0CE"
		    }}
		  >
		    <ActivityIndicator animating size="large" />
		  </View>
	);
  };
  render() {
    return(
        <View style={styles.flatListContainer}>
		    <FlatList
		      data={this.state.data}
		      renderItem={({ item }) => (
		        <ListItem
		          roundAvatar
		          title={`${item.name.first} ${item.name.last}`}
		          subtitle={item.email}
		          avatar={{ uri: item.picture.thumbnail }}
		          containerStyle={{ borderBottomWidth: 0 }}
		        />
		      )}
		      keyExtractor={item => item.email}
		      ItemSeparatorComponent={this.renderSeparator}
		      ListHeaderComponent={this.renderHeader}
		      ListFooterComponent={this.renderFooter}
		      onRefresh={this.handleRefresh}
		      refreshing={this.state.refreshing}
		      onEndReached={this.handleLoadMore}
		      onEndReachedThreshold={100}
		    />
		</View>
    );
  }
}



class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
	  showAlert: false,
    };
  }
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  componentDidMount() {
    this.makeRemoteRequest();
	if (Platform.OS === 'android') {
            this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {
                this.props.navigation.navigate('Newsfeed', {title: "Settings"})
                return true;
            });
    }
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
	fetch(url)
	  .then(res => res.json())
	  .then(res => {
		this.setState({
		  data: page === 1 ? res.results : [...this.state.data, ...res.results],
		  error: res.error || null,
		  loading: false,
		  refreshing: false
		});
	  })
	  .catch(error => {
		this.setState({ error, loading: false });
	  });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
	const {showAlert} = this.state;
    return (
	  <View>
		  <View style={styles.settingsContainer}>
				   <TouchableOpacity
	  			     style={{
						 alignItems: 'center',
						 justifyContent: 'center',
				         borderWidth:1,
				         borderColor:'rgba(0,0,0,0.2)',
				         width:50,
				         height:50,
				         backgroundColor:'#fff',
				         borderRadius:50,
		             }}
					 onPress = {
                  		() => this.props.navigation.navigate('Settings', {title: "Settings"})
				  
               		 }
		           >
		             <Icon name={"gears"}  size={30} color="#01a699" />
		           </TouchableOpacity>
		  </View>
		  <View style={styles.signOutContainer}>
				   <TouchableOpacity
	  			     style={{
				         borderWidth:1,
				         borderColor:'rgba(0,0,0,0.2)',
				         alignItems:'center',
				         justifyContent:'center',
				         width:50,
				         height:50,
				         backgroundColor:'#fff',
				         borderRadius:50,
		             }}
					 onPress = {
                  		() => Alert.alert(
								  'Log out',
								  'Are you sure you want to log out?',
								  [
								    {text: 'Yes', onPress: () => this.props.navigation.navigate('Login', {title: "Settings"})},
									{text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
									
								  ],
								  { cancelable: false }
							  )
               		 }
		           >
		             <Icon name={"lock"}  size={30} color="#01a699" />
		           </TouchableOpacity>
		  </View>
		  <View style={styles.containerProfile}>
		   		   <Image source={
					   require('./ben.jpg')} 
					   style={{
						   borderWidth:1,
						   borderColor:'rgba(0,0,0,0.2)',
						   alignItems:'center',
						   justifyContent:'center',
						   width:200,
						   height:200,
						   backgroundColor:'#fff',
						   borderRadius:100,
					   }}
				   />
				   <Text style={styles.profileUsernameText}>
				     benjamibenjami
				   </Text>
				   <Text style={styles.numRanksText}>
					  4981 Ranks
				   </Text>
		  </View>
	  </View>
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

	return (
		  <View
		    style={{
		      paddingVertical: 10,
		      borderTopWidth: 1,
		      borderColor: "#CED0CE"
		    }}
		  >
		    <ActivityIndicator animating size="large" />
		  </View>
	);
  };
  render() {
    return(
		<View style={styles.flatListContainer}>
		    <FlatList
		      data={this.state.data}
		      renderItem={({ item }) => (
		        <ListItem
		          roundAvatar
		          title={`${item.name.first} ${item.name.last}`}
		          subtitle={item.email}
		          avatar={{ uri: item.picture.thumbnail }}
		          containerStyle={{ borderBottomWidth: 0 }}
		        />
		      )}
		      keyExtractor={item => item.email}
		      ItemSeparatorComponent={this.renderSeparator}
		      ListHeaderComponent={this.renderHeader}
		      ListFooterComponent={this.renderFooter}
		      onRefresh={this.handleRefresh}
		      refreshing={this.state.refreshing}
		      onEndReached={this.handleLoadMore}
		      onEndReachedThreshold={100}
		    />
		</View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
     headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
		headerVisible: 'true',
  });
  render() {
	return(
		<View>
			<Text>Hello world Settings!</Text>
		</View>
	);
  }


}


class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  render(){
    return <MyApp />;

  }
}

class EmailAndPhoneScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
     headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
  });
  state = {
	pn: '',
  }
  handlePhoneNumber = (text) => {
      this.setState({ pn: text })
  }
  makeHttpRequest(){
	fetch('http://localhost:8080/api/public/register', 
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: navigation.state.params.un,
				password: navigation.state.params.ps,
				phoneNumber: pn,
				
			}),
		}
	);
  }
  
  render(){
    return(
		<View>
			<Text>
				{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}
			</Text>
			<PhoneInput ref ='phone' />
			<Text>
				{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}
			</Text>
			<TouchableOpacity
	           style = {styles.submitButton}
	           onPress = { () => {
				 
				 if(this.refs.phone.isValidNumber()){
					this.handlePhoneNumber(this.refs.phone.getValue());
					makeHttpRequest();
					console.log(Config.HOSTNAME)
			     	this.props.navigation.navigate('Confirmation', {title: "Confirmation"})
				 }
				}
	           }>
	           <Text style = {styles.submitButtonText}> Continue </Text>
	        </TouchableOpacity>
		</View>
    );
  }

}

class ConfirmationScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
     headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });
	onFulfill(isValid){
		if(isValid){
			this.props.navigation.navigate('MyApp', {title: "Create Account"})
		}
		else{
			alert(code);
		
		}
	}
	
	render(){
    return(
		<View style={styles.confirmationContainer}>
			<Text style={styles.inputLabel3}>INPUT CONFIRMATION CODE BELOW</Text>
			<CodeInput
			  ref="codeInputRef2"
			  keyboardType="numeric"
			  codeLength={4}
			  className='border-circle'
			  compareWithCode='2018'
			  autoFocus={false}
			  codeInputStyle={{ fontWeight: '800' }}
			  onFulfill={(isValid) => this.onFulfill(isValid)}
		   />
		</View>
    );
  }

}

class CreateAccountScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
     headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
  });
  state = {
    username: '',
    password: '',
	verifypass: '',
  }
  handleUsername = (text) => {
    this.setState({ username: text })
  }
  handlePassword = (text) => {
    this.setState({ password: text })
  }
  handleVerifypass = (text) => {
    this.setState({verifypass: text})
  }

  createAccount = (username, pass, verifypass) => {
	  var result = true;
	  if(pass !== verifypass){
		alert('Passwords do not match!');
		result = false;
	  }
	  return result;
      
  }
  render() {
    return (
      <View style={styles.createAccountContainer}>
		<Text>
			Username must be 5-14 characters long, characters can be 0-9, A-Z, a-z or _. You cannot have two or more consecutive underscores. {'\n'} {'\n'}
			Password must be at least 8 characters long. Characters can be a-z, A-Z, 0-9, ~, !, @, #, $, %, ^, &,_, -, + , =, or *. {'\n'} {'\n'}
		</Text> 
        <TextInput style = {styles.input}
           underlineColorAndroid = "transparent"
           placeholder = "Username"
           placeholderTextColor = "gray"
           autoCapitalize = "none"
           onChangeText = {this.handleUsername}/>
        <TextInput style = {styles.input}
           secureTextEntry={true}
           underlineColorAndroid = "transparent"
           placeholder = "Password"
           placeholderTextColor = "gray"
           autoCapitalize = "none"
           onChangeText = {this.handlePassword}/>
        <TextInput style = {styles.input}
           secureTextEntry={true}
           underlineColorAndroid = "transparent"
           placeholder = "Verify Password"
           placeholderTextColor = "gray"
           autoCapitalize = "none"
           onChangeText = {this.handleVerifypass}/>
        <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                 () => {
					var userSuccess = false
					var regex = /^[_]{0,1}[a-zA-Z][_]{0,1}(?:[a-zA-Z\d][_]{0,1})*$/
					var regexPass= /^[a-zA-Z0-9~!@#$%^&+=*-_\\]{8,}$/
					var result = this.createAccount(this.state.username, this.state.password,this.state.verifypass);
					if(this.state.username.length >= 5 && this.state.username.length <= 14 && regex.test(this.state.username)){
						userSuccess = true
					}
					else {
						alert('Username does not adhere to requirements!');
						return;


					}
					if(regexPass.test(this.state.password) && userSuccess == true){
						if(result == true) {
							this.props.navigation.navigate('EmailAndPhone', {title: 'Create Account'},{un: this.state.username}, {ps: this.state.password})
						}
					}
					else {
						alert('Password does not adhere to requirements!');
					}
				  }
				 
				  
               }>
               <Text style = {styles.submitButtonText}> Create Account </Text>
        </TouchableOpacity>
      </View>  
    );
  }
}

const stackNav = createStackNavigator(
	{
	  	Profile: ProfileScreen,
		Settings: SettingsScreen,
		Login: LoginScreen,
	  	Create: CreateAccountScreen,
		Home: HomeScreen,
		EmailAndPhone: EmailAndPhoneScreen,
		Confirmation: ConfirmationScreen,
		Newsfeed: NewsfeedScreen,
	},
	{
	  	initialRouteName: 'Profile',
		headerMode: 'screen',
    
	},



);


const tabs = {
  Newsfeed: {
    screen: NewsfeedScreen,
    
  },
  Explore: {
    screen: ExploreScreen,
   
  },
  Profile: {
    screen: stackNav,
    
  },
};

const MyApp = createMaterialTopTabNavigator(
  tabs,
  {
	  activeTintColor: 'white',
	  tabBarPosition: 'bottom',
	  animationEnabled: true,
	  swipeEnabled: true,
	  showIcon: true,
	  header: { visible: false },
  }
);



export default createStackNavigator(
  {
  	Login: LoginScreen,
  	Create: CreateAccountScreen,
	Home: HomeScreen,
	Newsfeed: NewsfeedScreen,
	EmailAndPhone: EmailAndPhoneScreen,
	Confirmation: ConfirmationScreen,
	MyApp: MyApp,
  },
  {
  	initialRouteName: 'Login',
	headerMode: 'screen',
    
  },
);

const styles = StyleSheet.create({
  inputLabel3: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center'
  },
  confirmationContainer: {
	backgroundColor: '#800000', 
	paddingVertical: 50,
	paddingHorizontal: 20,
	flex: 1,
  },
  phoneContainer: {
	backgroundColor: '#fff', 
	alignItems: 'center', 
	justifyContent:'center',
  },
  createAccountContainer: {
	backgroundColor: '#fff', 
	alignItems: 'stretch', 
	justifyContent:'center',
	flex: 1,
  },
  container: {
    paddingTop: 23,
    flex: 1,
    backgroundColor: '#fff', 
	alignItems: 'stretch', 
	justifyContent:'center',
  },
  containerProfile: {
    paddingTop: 23,
    flex: 1,
    backgroundColor: '#fff', 
	alignItems: 'center', 
	justifyContent:'flex-start',
  },
  settingsContainer: {
	paddingTop: 10,
	paddingRight: 6,
	backgroundColor: '#fff', 
	alignItems: 'flex-end',
  },
  signOutContainer: {
	paddingTop: 15,
	paddingRight: 6,	
	backgroundColor: '#fff', 
	alignItems: 'flex-end',
  },
  flatListContainer: {
	backgroundColor: '#fff', 
	paddingTop: 24,
  },
  titleText: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
	alignItems: 'center', 
  },
  profileUsernameText: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
	alignItems: 'center', 
  },
  numRanksText: {
    fontFamily: Platform.OS === 'ios' ? 'Optima-Italic' : 'monospace',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
	alignItems: 'center', 
  },
  homeText: {
    fontFamily: Platform.OS === 'ios' ? 'Palatino-Bold' : 'sans-serif-medium',
	fontSize: 20,
	fontWeight: 'bold',
	color: 'black',
	textAlign: 'center',
  },
  homeText: {
    fontFamily: Platform.OS === 'ios' ? 'Palatino-Bold' : 'sans-serif-medium',
	fontSize: 20,
	fontWeight: 'bold',
	color: 'black',
	textAlign: 'center',
  },
  input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      color: 'black',
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   },
  
});
