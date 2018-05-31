import React, { Component } from 'react';
import { StyleSheet, Image, Text, Title, TextInput, View, TouchableOpacity, Platform, Scene, FlatList, ActivityIndicator} from 'react-native';
import {createStackNavigator, NavigationActions, TabNavigator, TabBarBottom, createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import BottomNavigation, {IconTab,Badge,NavigationComponent,Tab} from 'react-native-material-bottom-navigation'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Ionicons } from '@expo/vector-icons'; 
import { List, ListItem, SearchBar } from "react-native-elements";
import FontAwesome, { Icons } from "react-native-fontawesome";




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
      refreshing: false
    };
  }
  static navigationOptions = {
    header: null
	
  }

  componentDidMount() {
    this.makeRemoteRequest();
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
       <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
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
          onEndReachedThreshold={50}
        />
</List>

    );
  }
 

}

class ExploreScreen extends React.Component {

  render() {
    return(
      <View style={{height: 1}}>
        <Text>Hello World Explore!</Text>
      </View>
    );
  }
 


}

class ProfileScreen extends React.Component {
  
  render() {
    return(
      <View style={{height: 1}}>
        <Text>Hello World Profile!</Text>
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
           placeholderTextColor = "gray"
           autoCapitalize = "none"
           onChangeText = {this.handleEmail}/>
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
                  () => this.createAccount(this.state.username, this.state.password,this.state.verifypass,this.state.email)
               }>
               <Text style = {styles.submitButtonText}> Create Account </Text>
        </TouchableOpacity>
      </View>  
    );
  }
}


const tabs = {
  Newsfeed: {
    screen: NewsfeedScreen,
    navigationOptions: {
	  tabBarIcon:  ({ tintColor }) => {Icons.videoCamera}
    },
  },
  Explore: {
    screen: ExploreScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (<Icon size={24} color="black" name="compass" />)
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (<Icon size={24} color="black" name ="face" />)
    },
  },
};

const MyApp = createMaterialTopTabNavigator(
  tabs,{
  activeTintColor: 'white',
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  showIcon: true,
});



export default createStackNavigator(
  {
  	Login: LoginScreen,
  	Create: CreateAccountScreen,
	Home: HomeScreen,
	MyApp: MyApp,
  },
  {
  	initialRouteName: 'Login',
  },
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif',
    fontSize: 40,
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
