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

    const onResetDateTime = () => {
        setDate(new Date(Date.now()))
        setTime(new Date(Date.now()))
    }

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
            <View style={styles.inputGroup}>
                <Input
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder='New Task ...'
                />
            </View>


            <View style={styles.inputGroup}>
                <DateTimePickerComponent
                    dateVisible={showDatePicker}
                    timeVisible={showTimePicker}
                    onChangeDate={onChangeDate}
                    onChangeTime={onChangeTime}
                    setDatePickerVisible={setShowDatePicker}
                    setTimePickerVisible={setShowTimePicker}
                    dateValue={date}
                    timeValue={time}
                    onResetDateTime={onResetDateTime}
                />
            </View>

            {/* <View style={{ paddingTop: 8 }}>
                <TagUser propStyle={{headerStyle: headerStyle}} tagType={'button'} isSaveTag={false} />
            </View> */}

            <View style={{ paddingTop: 8}}>
                <Button style={styles.submitButton} onPress={() => submitHandler(taskData)}>Add</Button>
            </View>
        </View>
    )
}

const headerStyle = {
    headerContainer: {
        height: 45,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerButton: {
        height: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    headerButtonCancel: {
        fontSize: 18,
        color: "#666",
        fontWeight: "400"
    },
    headerButtonDone: {
        fontSize: 18,
        color: "#006BFF",
        fontWeight: "500"
    },
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",

    },
    input: {
        marginVertical: 3,
        // marginHorizontal: 10,
        // flex: 1
    },
    submitButton: {
        justifyContent: 'center',
        margin: 8,
        backgroundColor: '#1E262C',
        borderStartColor: "transparent"
    },
    inputGroup: {
        // width: '100%',
        // paddingBottom: 8,
        marginHorizontal: 10
        // flex: 1
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