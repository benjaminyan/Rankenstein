import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform,} from 'react-native';
import {StackNavigator,} from 'react-navigation';




export default class CreateAccountScreen extends React.Component {
  state = {
      username: '',
      password: ''
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
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Rankenstein",
    };
  }
  render() {
	const { navigate } = this.props.navigation;
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
                  () => this.login(this.state.username, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Create New Account </Text>
        </TouchableOpacity>
      </View>
    );
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
