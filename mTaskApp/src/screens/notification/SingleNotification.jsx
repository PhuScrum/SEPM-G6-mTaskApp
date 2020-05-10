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



export default function CardWithHeaderAndFooterShowcase(props) {
  const count = (type) => {
    var num = 0
    if (props.item.taskId) {
      for (let i = 0; i < props.item.taskId.taggedUsers.length; i++) {
        var userObj = props.item.taskId.taggedUsers[i]
        if (userObj[type] === true) {
          num += 1
        }
      }
    }
    return num
  }

  const [user, setUser] = useState({ fName: '' }, [])
  const [task, setTask] = useState({}, [])
  const [numberOfAccept, setNumberOfAccept] = useState(count('isAccepted'))
  const [numberOfDecline, setNumberOfDecline] = useState(count('isDeclined'))
  const [isAccepted, setIsAccepted] = useState(props.item.isAccepted)
  const [isDeclined, setIsDeclined] = useState(props.item.isDeclined)

  useEffect(() => {
    // fetchData()
    if (props.item.taskId) setTask(props.item.taskId)
    setIsAccepted(props.item.isAccepted)
    setIsDeclined(props.item.isDeclined)
    // setNumberOfAccept(count('isAccepted'))
    // setNumberOfDecline(count('isDeclined'))
  }, [props.item])


  const acceptDeclineTagging = async (url) => {
    if (props.item.taskId) {
      var taskId = props.item.taskId._id
      var userId = await AsyncStorage.getItem('userId')
      var creatorId = props.item.taskId.creatorId
      var rsvpId = props.item._id
      var resp = await axios.post(url, { taskId, userId, creatorId, rsvpId })
    }
    // fetchData()
    if (url.includes('accept')) {
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
      {isAccepted ? <Text>You have accepted.</Text> : null}
      {isDeclined ? <Text>You have declined.</Text> : null}

      {(isAccepted || isDeclined) || (
        props.item.rsvpType &&
        (props.item.rsvpType).includes('system-notification'))
        ? null :

        <React.Fragment>
          <Button
            onPress={() => {
              acceptDeclineTagging(url.declineTagging_AddTask)
                .then(() => { props.refresh })
            }}
            style={styles.footerControl}
            size='small'
            status='basic'>
            DECLINE
          </Button>
          <Button
            onPress={() => {
              acceptDeclineTagging(url.acceptTagging_AddTask)
                .then(() => { props.refresh })
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
      title={props.item.taskId && props.item.taskId.name}
    // description='By Wikipedia'
    />
  );
  return (
    <Card style={styles.card} header={Header} footer={Footer}
      status={props.item.rsvpType.includes('system') && props.item.text.includes('success') ? 'success' : null}
    >
      <Text onPress={() => alert('pressed')}>
        {props.item.text}
      </Text>
      <View style={styles.extra}>
        {props.item.taskId &&
          props.item.rsvpType &&
          props.item.rsvpType.includes('system') === false > 1 ?
          <NumberDetails total={props.item.taskId? props.item.taskId.taggedUsers.length : 0} numOfAccept = {numberOfAccept} numOfDecline={numberOfDecline} />
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