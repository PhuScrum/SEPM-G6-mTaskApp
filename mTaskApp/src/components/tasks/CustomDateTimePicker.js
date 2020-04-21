import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, DatePickerIOS } from 'react-native'
import { Button } from '@ui-kitten/components';
import moment from 'moment-timezone'
import DateTimePicker from '@react-native-community/datetimepicker';
// import DatePicker from 'react-native-date-picker'

const combineDateTime = (date, time) => {
    const datePick = moment(date).format('DD MMM YYYY ')
    const timePick = moment(time).format('h:mm:ss a')
    const finalTime = Date.parse(`${datePick}${timePick}`)
    return finalTime
}

const CustomDateTimePicker = ({ onDateTimeHandler }) => {
    const [date, setDate] = useState(new Date(Date.now()))
    const [time, setTime] = useState(new Date(Date.now()))
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const dateTime = combineDateTime(date, time)

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime ;
        setShowTimePicker(false);
        setTime(currentTime);
        onDateTimeHandler(dateTime)
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
      };

    const openDatePicker = () => {
        setShowDatePicker(true)
    }

    const openTimePicker = () => {
        setShowTimePicker(true)
    }
    

    return (
        <>
            <View style={styles.input}>
                <Button onPress={openDatePicker}>Show date picker!</Button>
            </View>
            <View style={styles.input}>
                    <Button onPress={openTimePicker} >Show time picker!</Button>
                </View>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    // timeZoneOffsetInMinutes={0}
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
                    // timeZoneOffsetInMinutes={0}
                    value={time}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeTime}
                />
            )}
        </>

    )

}
const styles = StyleSheet.create({
    input: {
        marginHorizontal: 15,
        flex: 1
    }
})

export default CustomDateTimePicker