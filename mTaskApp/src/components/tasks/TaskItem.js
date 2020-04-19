import React from 'react'
import { StyleSheet, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import { Divider, List, ListItem } from '@ui-kitten/components';
import moment from 'moment-timezone'


const TrashIcon = (props) => (
    <Icon
        {...props}
        name='star'
        fill='#8F9BB3'
    />
);


const TaskItem = ({ item }) => {
    // console.log(item.dateTime)
    return (
        <TouchableHighlight
            style={styles.rowFront}
            underlayColor={'#f0ffff'}
        >
            <View>
                <ListItem 
                    style={{borderRadius:12}}
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
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemText: {
        marginLeft: 10,
        alignSelf:'center'
    },
    button: {
        margin: 0
    },
    rowFront: {
        
        // alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        // height: 50,
        borderRadius:12
        
    }
})

export default TaskItem