import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform,} from 'react-native';
import {createStackNavigator,} from 'react-navigation';



class LoginScreen extends React.Component{
  static navigationOptions = {
    header: null
  }
  state = {
      username: '',
      password: '',
	  titleText: "Rankenstein",
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
           placeholderTextColor = "#fff"
           autoCapitalize = "none"
           onChangeText = {this.handleUsername}/>
		<TextInput style = {styles.input}
		   secureTextEntry={true}
           underlineColorAndroid = "transparent"
           placeholder = "Password"
           placeholderTextColor = "#fff"
           autoCapitalize = "none"
           onChangeText = {this.handlePassword}/>
		<TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.username, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Login </Text>
        </TouchableOpacity>
		<TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.props.navigation.navigate('Create',{title: 'WHATEVER'})
               }>
               <Text style = {styles.submitButtonText}> Create New Account </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
	render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

class CreateAccountScreen extends React.Component {
	state = {
      username: '',
      password: '',
	  verifypass: '',
	  email: '',
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
  handleEmail = (text) => {
	  this.setState({email: text})	
  }
  createAccount = (username, pass, verifypass, email) => {
      alert('email: ' + email + ' username: ' + username + ' password: ' + pass + ' verify password: ' + verifypass)
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput style = {styles.input}
           underlineColorAndroid = "transparent"
           placeholder = "Email"
           placeholderTextColor = "#fff"
           autoCapitalize = "none"
           onChangeText = {this.handleEmail}/>
		<TextInput style = {styles.input}
           underlineColorAndroid = "transparent"
           placeholder = "Username"
           placeholderTextColor = "#fff"
           autoCapitalize = "none"
           onChangeText = {this.handleUsername}/>
		<TextInput style = {styles.input}
		   secureTextEntry={true}
           underlineColorAndroid = "transparent"
           placeholder = "Password"
           placeholderTextColor = "#fff"
           autoCapitalize = "none"
           onChangeText = {this.handlePassword}/>
		<TextInput style = {styles.input}
		   secureTextEntry={true}
           underlineColorAndroid = "transparent"
           placeholder = "Verify Password"
           placeholderTextColor = "#fff"
           autoCapitalize = "none"
           onChangeText = {this.handleVerifypass}/>
		<TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.createAccount(this.state.username, this.state.password,this.state.verifypass,this.state.email)
               }>
               <Text style = {styles.submitButtonText}> Create Account </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const SN = createStackNavigator(
  {
  	Login: LoginScreen,
  	Home: HomeScreen,
  	Create: CreateAccountScreen,
  },
  {
  	initialRouteName: 'Login',
  },
);

export default class App extends React.Component {
	render(){
		return <SN />;
	}
}

const styles = StyleSheet.create({
  container: {
	paddingTop: 23,
	flex: 1,
    backgroundColor: '#4682b4',
  },
  titleText: {
	fontFamily: 'sans-serif',
    fontSize: 40,
    fontWeight: 'bold',
	color: 'white',
	textAlign: 'center',
  },
  input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
	  color: 'white',
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
