import React, { Component } from 'react'
import { StyleSheet, Text, View, AsyncStorage, ActivityIndicator } from 'react-native';
import BottomNavBar from './BottomNavBar'
import Login from '../../screens/loginPage/Login'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default class MTaskApp extends Component {

    constructor(props, navigation) {
        super(props, navigation);
        this.state = {
          isLoadding: true,
          isLoggedIn: 'false',
    
        }
    }

    componentDidMount = async () => {
        try{
          let status = await AsyncStorage.getItem('isLoggedIn');
          this.setState({isLoggedIn: status});
          this.setState({isLoadding: false});
    
          //alert(status)
         
        }catch(error){
          alert(error);
        }
      }

    
    render() {
        if(this.state.isLoadding) {
            return(
              <View style={styles.loadding}>
                <ActivityIndicator/>
              </View>
            )
          }else{
        
        
        return (
            <Stack.Navigator headerMode='none' initialRouteName={this.state.isLoggedIn !== 'true'? "Login" : "MainApp"} >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="MainApp" component={BottomNavBar} />
             </Stack.Navigator>
            // <BottomNavBar/>
        )
        } 
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });