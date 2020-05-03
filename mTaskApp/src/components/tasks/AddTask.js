import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, Platform, AsyncStorage } from 'react-native'
import { Layout, Text, Input, Button, Icon } from '@ui-kitten/components';
import moment from 'moment-timezone'
import TagMembers from '../tag_members/TagMembers'
import DateTimePickerComponent from '../dateTimePicker/DateTimePickerComponent'

const DateIcon = (style) => (
    <Icon {...style} name='calendar' />
)

const combineDateTime = (date, time) => {
    const datePick = moment(date).format('DD MMM YYYY ')
    const timePick = moment(time).format('hh:mm:ss a')
    const finalTime = Date.parse(`${datePick}${timePick}`)
    return finalTime
}

const AddTask = ({ submitHandler }) => {
    const os = Platform.OS
    const tag = useSelector(state => state.tagMemberReducer.selectedItems, [])

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [date, setDate] = useState(new Date(Date.now()))
    const [time, setTime] = useState(new Date(Date.now()))


    const onChangeDate = (selectedDate) => {
        // event.preventDefault();
        const currentDate = selectedDate
        setShowDatePicker(false)
        // setShowDatePicker(os ==='ios')
        setDate(currentDate);
    };

    const onChangeTime = (selectedTime) => {
        // event.preventDefault();
        const currentTime = selectedTime
        setShowTimePicker(false)
        // setShowTimePicker(os ==='ios')
        setTime(currentTime);
    };

    console.log(AsyncStorage)
    let userId = AsyncStorage.getItem('userId')
    console.log('UserID: ',userId)

    const taskData = {
        name: name,
        description: desc,
        dateTime: combineDateTime(date, time),
        taggedUsers: tag
    }



    const displayDate = moment(date).format('LL')
    const displayTime = moment(time).format('LT')

    return (
        <View style={styles.containter}>
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
            <View style={styles.inputGroup, { flexDirection: 'row', flex: 1, marginHorizontal: 10 }}>
                <DateTimePickerComponent
                    dateVisible={showDatePicker}
                    timeVisible={showTimePicker}
                    onChangeDate={onChangeDate}
                    onChangeTime={onChangeTime}
                    setDatePickerVisible={setShowDatePicker}
                    setTimePickerVisible={setShowTimePicker}
                    dateValue={date}
                    timeValue={time}
                />
            </View>

            <View style={{ paddingTop: 8, flex: 1 }}>
                <TagMembers />
            </View>
            <View style={{ paddingTop: 8, flex: 1 }}>
                <Button style={styles.submitButton} onPress={() => submitHandler(taskData)}>Add</Button>
            </View>
            {/* {os === 'android' && <DateTimePickerAndroid />}
            {os === 'ios' && <DateTimePickerIOS />} */}

        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",

    },
    input: {
        marginVertical: 3,
        marginHorizontal: 10,
        flex: 1
    },
    submitButton: {
        justifyContent: 'center',
        margin: 8,
        backgroundColor: '#1E262C',
        borderStartColor: "transparent"
    },
    inputGroup: {
        width: '100%',
        paddingBottom: 8,
        // position: 'relative'
    },
    dateTimeText: {
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Lato-Regular',
        marginLeft: 15
    },
    pickerButton: {
        flex: 1,
        margin: 3
    },
    iosPicker: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        // height:'100%',
        // bottom: '50%'
    },
    iosPickerBackground: {
        backgroundColor: 'white',
        padding: 15,
        // position: "absolute",
    }

})

export default AddTask