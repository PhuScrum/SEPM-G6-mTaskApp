import React, {useState} from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Layout, Text, Input, Button } from '@ui-kitten/components';

const AddTask = ({submitHandler}) =>{
    const [value, setValue] = useState('')
    
    return (
        <Layout style={styles.containter}>
            <Input
                style={styles.input}
                value={value}
                onChangeText={setValue}
                placeholder='New Task ...'
            />
            <Button style={styles.button} onPress={()=>submitHandler(value)}>Add</Button>

        </Layout>
    )
}

const styles = StyleSheet.create({
    containter: {
        
    },
    input:{
        
        margin: 8
    },
    button:{
        margin: 8
    }
})

export default AddTask