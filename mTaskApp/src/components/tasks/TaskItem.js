import React from 'react'
import { StyleSheet, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import { ListItem } from '@ui-kitten/components';
import moment from 'moment-timezone'


const TaskItem = ({ item }) => {
    // console.log(item.dateTime)
    return (
        <TouchableHighlight
            style={styles.rowFront}
            // underlayColor={'#f0ffff'}
        >
            <View>
                <ListItem 
                    style={styles.item}
                    title={item.name}
                    description={moment(item.dateTime).format('LT')}
                    onPress={() => console.log('You touched me')}
                />
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    item: {
        // marginTop:5,
        // borderColor: 'transparent',
        // borderWidth: 1,
        // borderStyle: 'solid',
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: '#EEF7FA'
    },
    button: {
        margin: 0
    },
    rowFront: {
        marginTop:2,
        // alignItems: 'center',
        backgroundColor: '#EEF7FA',
        justifyContent: 'center',
        // height: 50,
        borderRadius:12
        
    }
})

export default TaskItem