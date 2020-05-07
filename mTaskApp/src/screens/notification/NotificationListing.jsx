import React from 'react'
import { FlatList, StyleSheet, View,Text } from 'react-native';

const data = [
    {key: 'Devin'},
    {key: 'Dan'},
    {key: 'Dominic'},
    {key: 'Jackson'},
    {key: 'James'},
    {key: 'Joel'},
    {key: 'John'},
    {key: 'Jillian'},
    {key: 'Jimmy'},
    {key: 'Julie'},
  ]

export default function NotificationListing(props){
    return(
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })