import React, { useEffect } from 'react'
import {Text, Icon} from '@ui-kitten/components'
export default function NumberDetails (props){
    const count = (type)=>{
        var num = 0
        for(let i =0; i < props.task.taggedUsers.length; i++){
            var userObj = props.task.taggedUsers[i]
            if(userObj[type] === true){
                num +=1
            }
        }
        if(type==='isAccepted') props.setNumberOfAccept(num)
        else props.setNumberOfDecline(num)

    }

    useEffect(()=>{
        count('isAccepted')
        count('isDeclined')
        // props.setNumberOfAccept(props.numberOfAccept + 1)
    }, [props])


    return(
        <React.Fragment>
            <Text>
                <Icon name='people-outline' width={20} height={20} fill='#3366FF'/>
                {props.task.taggedUsers.length}
                </Text>
            <Text>
            <Icon name='checkmark-outline' width={20} height={20} fill='#3366FF'/>
            {props.numberOfAccept}
        </Text>

        <Text>
            <Icon name='close-outline' width={20} height={20} fill='#3366FF'/>
            {props.numberOfDecline}
        </Text>
        </React.Fragment>
    )
}