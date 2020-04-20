import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert, } from 'react-native'
import { Layout, Text, Input, Button, Datepicker, Icon } from '@ui-kitten/components';
import moment from 'moment-timezone'

const DateIcon = (style) => (
    <Icon {...style} name='calendar'/>
  )

const AddTask = () => {
    const [value, setValue] = useState('')
    const [desc, setDesc] = useState('')
    const [dateTime, setDateTime] = useState(moment())

    const submitHandler = (text) => {
        if (text.length > 3) {
            console.log(text)
        } else {
            Alert.alert('oops!!', 'Todos must be over 3 characters long', [
                { text: 'Understood', onPress: () => console.log('alert closed') }
            ])
        }
    }

    const time = Date.parse('20 Apr 2020 09:50:53 GMT+07:00')

    console.log(moment(time).format('DD MMM YYYY hh:mm:ss a'))
    console.log(time)
    console.log(dateTime)

    return (
        <Layout style={styles.containter}>
            <View style={styles.inputGroup}>
                <Input
                    style={styles.input}
                    value={value}
                    onChangeText={setValue}
                    placeholder='New Task ...'
                />
            </View>
            <View style={styles.inputGroup}>
                <Input
                    style={styles.input}
                    value={desc}
                    onChangeText={setDesc}
                    placeholder='Description'
                />
            </View>
            <View style={styles.inputGroup, { flexDirection: 'row' }}>
                <Datepicker
                    style={styles.input}
                    value={dateTime}
                    onChangeText={setDateTime}
                    placeholder='Date'
                    icon={DateIcon}
                />
                <Input
                    style={styles.input}
                    value={value}
                    onChangeText={setValue}
                    placeholder='New Task ...'
                />
            </View>
            <View style={{paddingTop: 8}}>
            <Button style={styles.button} onPress={() => submitHandler(value)}>Add</Button>
            </View>

        </Layout>
    )
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",

    },
    input: {
        marginHorizontal: 15,
        flex: 1
    },
    button: {
        justifyContent: 'center',
        margin: 8,
        backgroundColor: '#1E262C',
        borderStartColor: "transparent"
    },
    inputGroup: {
        width: '100%',
        paddingBottom: 8,
        //   position:'absolute' 
    }
})

export default AddTask