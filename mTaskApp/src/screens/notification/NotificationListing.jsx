import React, { useEffect } from 'react'
import { FlatList, StyleSheet, View, AsyncStorage } from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';
import axios from 'axios'
import * as url from '../../constants/url/url'
import SingleNotification from './SingleNotification'

export default function NotificationListing(props){
    const [notifications, setNotifications] = React.useState([])

    const fetchNotificationByUserId = async ()=>{
      const userId = await AsyncStorage.getItem('userId')
      var resp = await axios.get(url.rsvp + '/' + userId)
      console.log('fetch notifications by  user id: ', userId, resp.data)
      setNotifications(resp.data)
    }

    useEffect(async ()=>{
       fetchNotificationByUserId()
    },[])
    return(
        <Layout style={styles.container}>
          <Text category='h1' style={styles.title}>Notifications</Text>
            <FlatList
                data={notifications}
                renderItem={({item}) => <SingleNotification item={item}/>}
            />        
        </Layout>
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
    title: {
      padding: 10
    }
  })