import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert, } from 'react-native'
import { Layout, Text, Input, Button, Datepicker, Icon } from '@ui-kitten/components';
import moment from 'moment-timezone'
import DateTimePicker from '@react-native-community/datetimepicker';

const DateIcon = (style) => (
    <Icon {...style} name='calendar' />
)

const AddTask = () => {
    const [value, setValue] = useState('')
    const [desc, setDesc] = useState('')
    const [dateTime, setDateTime] = useState(new Date(Date.now()))

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateTime;
        setShow(Platform.OS === 'ios');
        setDateTime(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const submitHandler = (text) => {
        if (text.length > 3) {
            console.log(text)
        } else {
            Alert.alert('oops!!', 'Todos must be over 3 characters long', [
                { text: 'Understood', onPress: () => console.log('alert closed') }
            ])
        }
    }

    const time = Date.parse(dateTime)

    console.log(moment(dateTime).format('DD MMM YYYY hh:mm:ss a'))
    console.log(time)
    console.log(dateTime)

    return (
        <Layout style={styles.containter}>
            <View style={styles.inputGroup, { flex: 1 }}>
                <Input
                    style={styles.input}
                    value={value}
                    onChangeText={setValue}
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
                {/* <Datepicker
                    style={styles.input}
                    value={dateTime}
                    onChangeText={setDateTime}
                    placeholder='Date'
                    icon={DateIcon}
                /> */}
                <Input
                    style={styles.input}
                    value={value}
                    onChangeText={setValue}
                    placeholder='New Task ...'
                />
            </View>
            <View style={styles.inputGroup, { flexDirection: 'row', flex: 1 }}>
                <View style={styles.input}>
                    <Button onPress={showDatepicker}>Show date picker!</Button>
                </View>
                <View style={styles.input}>
                    <Button onPress={showTimepicker} >Show time picker!</Button>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={dateTime}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
            <View style={{ paddingTop: 8, flex: 1 }}>
                <Button style={styles.button} onPress={() => submitHandler(value)}>Add</Button>
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