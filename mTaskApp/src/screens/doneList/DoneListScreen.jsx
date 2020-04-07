import React, { Component } from 'react'
import {Layout, Text } from '@ui-kitten/components';
import TopNavigationBarBackButton from '../../components/cores/TopNavigationBarBackButton'
import {FlatList, StyleSheet, View, ActivityIndicator, TouchableOpacity} from 'react-native';


export default class DoneListScreen extends Component {

   constructor() {
       super();
       this.state = {
        isLoading: true,
        dataSource: []
       }
   }

   componentDidMount () {
       return fetch('http://192.168.0.10:19000/task')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            isLoading: false,
            dataSource: responseJson
        })

       })

      
   }

    //fetchData = async () => {
    //    const response = await fetch("http://localhost:19000/task");
    //    const json =await response.json();
    //       this.setState({data: json.task});


   // }

   _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => alert(item.completed)}>
        <View style={styles.item}> 
            <Text>{item.name}</Text> 
        </View>

    </TouchableOpacity>
   );

    render() {

      
        
        return (
            
            <View  style={{paddingTop: 20, paddingBottom: 0,  }}>
                <View style={{marginVertical: 10, borderBottomColor:'black'}}>
                <TopNavigationBarBackButton {...this.props} title='Done List'/>
                </View>
                <Text category='h1'>Done</Text>
                <FlatList 
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    keyExtractor={(item, i) => i}
                    />
                
            </View>
            
        )
    }
}

const styles = StyleSheet.create({

    item:{
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'



    },
});