import React from 'react'
import {Text, Icon} from '@ui-kitten/components'
export default function NumberDetails (props){


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