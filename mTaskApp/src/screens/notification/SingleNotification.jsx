import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';
import {
  Button,
  Card,
  CardHeader,
  Text,
} from '@ui-kitten/components';
import axios from 'axios'
import * as url from '../../constants/url/url'
const Header = () => (
  <CardHeader
    title='Maldives'
    // description='By Wikipedia'
  />
);

const Footer = () => (
  <View style={styles.footerContainer}>
    <Button
      style={styles.footerControl}
      size='small'
      status='basic'>
      DECLINE
    </Button>
    <Button
      style={styles.footerControl}
      size='small'>
      ACCEPT
    </Button>
  </View>
);

export default function CardWithHeaderAndFooterShowcase (props){
    const [user, setUser] = useState(null)
    const [task, setTask] = useState({})

    const fetchData = async ()=>{
        const userId = await AsyncStorage.getItem('userId')
        const taskId = props.item.taskId
        fetchUser(userId)
        fetchTask(taskId)
    }
    const fetchUser = async (id)=>{
        var resp = await axios.get(url.user + '/' + id)
        setUser(resp.data)
    }

    const fetchTask = (id)=>{
        // var resp = await axios.get(url.tasks + '/' + id)
        // setUser(resp.data)
    }
    return(
        <Card style={styles.card} header={Header} footer={Footer}>
            <Text onPress={()=> alert('pressed')}>
              {props.item.text}
            </Text>
          </Card>
            )
        
}
    

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 4,
  },
  card: {
    marginVertical: 8,
  },
});