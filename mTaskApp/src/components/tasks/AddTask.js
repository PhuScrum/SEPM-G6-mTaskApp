import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, Platform, AsyncStorage } from 'react-native'
import { Layout, Text, Input, Button, Icon } from '@ui-kitten/components';
import moment from 'moment-timezone'
import TagMembers from '../tag_members/TagMembers'
import DateTimePickerComponent from '../dateTimePicker/DateTimePickerComponent'
import TagUser from '../taskDetail/TagUser';

const combineDateTime = (date, time) => {
    const datePick = moment(date).format('DD MMM YYYY ')
    const timePick = moment(time).format('hh:mm:ss a')
    const finalTime = Date.parse(`${datePick}${timePick}`)
    return finalTime
}

const AddTask = ({ submitHandler }) => {
    const os = Platform.OS
    const tag = useSelector(state => state.tagMemberReducer.selectedItems, [])

    const [userId, setUserId] = useState('')
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [date, setDate] = useState(new Date(Date.now()))
    const [time, setTime] = useState(new Date(Date.now()))


    const onChangeDate = (selectedDate) => {
        const currentDate = selectedDate
        setShowDatePicker(false)
        setDate(currentDate);
    };

    const onChangeTime = (selectedTime) => {
        const currentTime = selectedTime
        setShowTimePicker(false)
        setTime(currentTime);
    };

    const taskData = {
        name: name,
        description: desc,
        dateTime: combineDateTime(date, time),
        taggedUsers: tag,
        creatorId: userId
    }

    const getUserId = async () => {
        try {
            let id = await AsyncStorage.getItem('userId')
            setUserId(id)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserId()
    }, [])

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
                <TagUser tagType={'button'} />
            </View>
            <View style={{ paddingTop: 8, flex: 1 }}>
                <Button style={styles.submitButton} onPress={() => submitHandler(taskData)}>Add</Button>
            </View>
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