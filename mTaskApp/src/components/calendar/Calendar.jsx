import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Calendar,
  Text,
} from '@ui-kitten/components';
import tasks from '../../constants/fake_data/tasks'
import OnSpecificDateList from '../../components/list/on_specific_date/OnSpecificDateList'
import { useDispatch, useSelector } from "react-redux";
import {getTasksAction} from '../../actions/TaskAction'
import overviewCalendar_API from './API'

// console.log('tasks list: ', tasks)
// console.log('hashmap: ', hashMap)
const now = new Date();
const minDate = new Date(100, now.getMonth(), 15);
const maxDate = new Date(99999, now.getMonth() + 1, 15);
const DayCell = ({ date }, style) => (
  <View
    style={[styles.dayContainer, style.container]}>
    <Text style={style.text}>{`${date.getDate()}`}</Text>
    <Text style={[style.text, styles.value]}>
      
      {
        hashMap[date.getFullYear()] &&
        hashMap[date.getFullYear()][date.getMonth()] &&
      hashMap[date.getFullYear()][date.getMonth()][date.getDate()] ? <Text>x</Text>: null}

    </Text>
  </View>
);
var hashMap = {}
  const setUpDateHashmap = (todo)=>{
    hashMap = overviewCalendar_API.setUpDateHashmap(hashMap, tasks)
  }
setUpDateHashmap()

export default function CalendarCustomDayShowcase  () {
  
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [itemsOnSpecificDate, setItemOnSpecificDate] = React.useState([])
  const dispatch = useDispatch();
  // const todos = useSelector(state => state.taskReducer.tasks);
  // const getTasks = () => {
  //         dispatch(getTasksAction())
  //     }
  //   console.log('Todos at calendar', todos)

  
  const fetchItemSpecificDate = (selectedDate) =>{
    overviewCalendar_API.fetchItemSpecificDate(selectedDate, hashMap, dispatch, setItemOnSpecificDate)
    console.log('itemOSD', itemsOnSpecificDate)

  }
  useEffect(() => { // onComponentDidUpdate
    fetchItemSpecificDate(selectedDate)
  });

  useEffect(()=>{ // didmount
    // setUpDateHashmap()
  }, [])
  return (
      <React.Fragment>
           <Calendar
            style={{width: '100%'}}
            
            date={selectedDate}
            onSelect={setSelectedDate}
            renderDay={DayCell}
            min={minDate}
            max={maxDate}
          />
    {/* <OnSpecificDateList/> */}
      </React.Fragment>
   
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  value: {
    fontSize: 12,
    fontWeight: '400',
  },
  
    // calendar: {
    //   flexDirection: 'column',
    //   alignItems: 'stretch',
    //   flex: 1,
    // //   justifyContent: 'center',
    // //   aspectRatio: 1

    // },
});