import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity,} from 'react-native'
import { Layout, Text, Input, Button, Datepicker, Icon } from '@ui-kitten/components';
import moment from 'moment-timezone'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux'
import {addTaskAction} from '../../actions/TaskAction'

const DateIcon = (style) => (
    <Icon {...style} name='calendar' />
)

const combineDateTime = (date, time) => {
    const datePick = moment(date).format('DD MMM YYYY ')
    const timePick = moment(time).format('h:mm:ss a')
    const finalTime = Date.parse(`${datePick}${timePick}`)
    return finalTime
}

const AddTask = ({submitHandler}) => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [date, setDate] = useState(new Date(Date.now()))
    const [time, setTime] = useState(new Date(Date.now()))


    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(false);
        setTime(currentTime);
    };

    const taskData = {
        name: name,
        description: desc,
        dateTime: combineDateTime(date,time)
    }

    const dateTime = combineDateTime(date, time)

    return (
        <Layout style={styles.containter}>
            <View style={styles.inputGroup, { flex: 1 }}>
                <Input
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder='New Task ...'
                />
            </View>
            <View style={styles.inputGroup, { flex: 1 }}>
                <Input
                    style={styles.input}
                    value={desc}
                    onChangeText={setDesc}
                    placeholder='Description'
                />
            </View>
            <View style={styles.inputGroup, { flexDirection: 'row', flex: 1 }}>
                <View style={styles.input}>
                    <Button onPress={()=> setShowDatePicker(true)}>Show date picker!</Button>
                </View>
                <View style={styles.input}>
                    <Button onPress={()=> setShowTimePicker(true)} >Show time picker!</Button>
                </View>
                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
                {showTimePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={time}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeTime}
                    />
                )}
            </View>
            <View style={{ paddingTop: 8, flex: 1 }}>
                <Button style={styles.button} onPress={() => submitHandler(taskData)}>Add</Button>
            </View>

        </Layout>
    )
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",

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
        position: 'relative'
    }
})

export default AddTask