import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';

const TrashIcon = (props) => (
    <Icon
        {...props}
        name='star'
        fill='#8F9BB3'
    />
);

const TaskItem = ({ item, deleteHandler }) => {
    return (
        <TouchableOpacity >
            <Layout style={styles.item} level='1'>
                <Button 
                    style={styles.button} 
                    accessoryLeft={TrashIcon}
                    status='primary' 
                    onPress={() => deleteHandler(item._id)} 
                />
               
                <Text style={styles.itemText}>
                    {item.name}
                </Text>
            </Layout>
        </TouchableOpacity>
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
    
    icon: {
        width: 18,
        height: 18,
    },
    itemText: {
        marginLeft: 10,
        alignSelf:'center'
    }
})

export default TaskItem