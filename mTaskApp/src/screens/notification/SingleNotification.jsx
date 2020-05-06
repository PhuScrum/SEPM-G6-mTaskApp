import React, { useState, useEffect } from 'react';
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
  Layout,
  Icon 
} from '@ui-kitten/components';
import axios from 'axios'
import * as url from '../../constants/url/url'
import NumberDetails from './NumberDetails'

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
    const [user, setUser] = useState({fName: ''})
    const [task, setTask] = useState({taggedUsers: []})
    const [numberOfAccept, setNumberOfAccept] = useState(0)
    const [numberOfDecline, setNumberOfDecline] = useState(0)

    const fetchData = async ()=>{
        const userId = props.item.senderId
        const taskId = props.item.taskId
        await fetchUser(userId)
        await fetchTask(taskId)
        

    }
    const fetchUser = async (id)=>{
        var resp = await axios.get(url.user + '/' + id)
        console.log('fetch user by  user id: ', resp.data)

        setUser(resp.data)
    }

    const fetchTask = async (id)=>{
        var resp = await axios.get(url.tasks + '/' + id)
        setTask(resp.data)
        count('isAccepted')
        count('isDeclined')
    }

    const count = (type)=>{
        var num = 0
        for(let i =0; i < task.taggedUsers.length; i++){
            var userObj = task.taggedUsers[i]
            if(userObj[type] === true){
                num +=1
            }
        }
        if(type==='isAccepted') setNumberOfAccept(num)
        else setNumberOfDecline(num)

    }


    useEffect(()=>{
        fetchData()
    }, [])

    const Header = () => (
        <CardHeader
          title={task.name}
          // description='By Wikipedia'
        />
      );
    return(
        <Card style={styles.card} header={Header} footer={Footer}>
            <Text onPress={()=> alert('pressed')}>
              {props.item.text}
            </Text>
            <View style={styles.extra}>
            {task.taggedUsers.length > 1 ? 
            <NumberDetails task={task} numberOfAccept={numberOfAccept} numberOfDecline={numberOfDecline} />
            : null}
            </View>
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
  extra: {
      marginTop: 15
    //   bottom: 5,
    //   right: 5,
    //   padding: 5
  }
});