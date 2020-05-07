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



export default function CardWithHeaderAndFooterShowcase (props){
    const [user, setUser] = useState({fName: ''},[])
    const [task, setTask] = useState({taggedUsers: []}, [])
    const [numberOfAccept, setNumberOfAccept] = useState(0)
    const [numberOfDecline, setNumberOfDecline] = useState(0)
    const [isAccepted, setIsAccepted] =useState(props.item.isAccepted)
    const [isDeclined, setIsDeclined] = useState(props.item.isDeclined)

    const fetchData = async ()=>{
        const userId = props.item.senderId
        const taskId = props.item.taskId
        await fetchUser(userId)
        await fetchTask(taskId)
        

    }
    const fetchUser = async (id)=>{user
        var resp = await axios.get(url.user + '/' + id)
        console.log('fetch user by  user id: ', resp.data)

        setUser(resp.data)
    }

    const fetchTask = async (id)=>{
        var resp = await axios.get(url.tasks + '/' + id)
        setTask(resp.data)
        
        
    }
    useEffect(()=>{
        fetchData()
        setIsAccepted(props.item.isAccepted)
        setIsDeclined(props.item.isDeclined)
    }, [props.item])

  //   const count = (type)=>{
  //     var num = 0
  //     for(let i =0; i < task.taggedUsers.length; i++){
  //         var userObj = task.taggedUsers[i]
  //         if(userObj[type] === true){
  //             num +=1
  //         }
  //     }
  //     if(type==='isAccepted') setNumberOfAccept(num)
  //     else setNumberOfDecline(num)

  // }

    const acceptDeclineTagging = async (url)=>{
        var taskId = task._id
        var userId = await AsyncStorage.getItem('userId')
        var creatorId = task.creatorId
        var rsvpId = props.item._id
        var resp = await axios.post(url, {taskId, userId, creatorId, rsvpId})
        if(url.includes('accept')){
            console.log('increase number of accept')
            setNumberOfAccept(numberOfAccept + 1)
            setIsAccepted(true)
            // count('isAccepted')

        } 
        else {
            setNumberOfDecline(numberOfDecline + 1)
            setIsDeclined(true)
        }
    }

    const Footer = () => (
        <View style={styles.footerContainer}>
          {isAccepted ? <Text>You have accepted.</Text>: null}
          {isDeclined ? <Text>You have declined.</Text>: null}

          {(isAccepted || isDeclined ) || ( 
          props.item.rsvpType &&
          (props.item.rsvpType).includes('system-notification') )
          ? null:
          
          <React.Fragment>
          <Button
            onPress={()=>{
                acceptDeclineTagging(url.declineTagging_AddTask)
            }}
            style={styles.footerControl}
            size='small'
            status='basic'>
            DECLINE
          </Button>
          <Button
            onPress={()=>{
                acceptDeclineTagging(url.acceptTagging_AddTask)
            }}
            style={styles.footerControl}
            size='small'>
            ACCEPT
          </Button>
          </React.Fragment>
          }
         
          
        </View>
      );

      const Header = () => (
        <CardHeader
          title={task !==null && task.name !==null ? task.name : null}
          // description='By Wikipedia'
        />
      );
    return(
        <Card style={styles.card} header={Header} footer={Footer}
            status={props.item.rsvpType.includes('system') && props.item.text.includes('success') ? 'success': null}
        >
            <Text onPress={()=> alert('pressed')}>
              {props.item.text}
            </Text>
            <View style={styles.extra}>
            {task && task.taggedUsers && 
            
            task.taggedUsers.length &&
            props.item.rsvpType &&
            props.item.rsvpType.includes('system') === false > 1 ? 
            <NumberDetails task={task} numberOfAccept={numberOfAccept} numberOfDecline={numberOfDecline} setNumberOfAccept={setNumberOfAccept} setNumberOfDecline={setNumberOfDecline} />
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