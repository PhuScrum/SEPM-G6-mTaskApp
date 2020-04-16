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
import { useDispatch } from "react-redux";

var hashMap = {}
const getDateFromDateTime = ()=>{
  //set up hashmap
  for(let i=0; i < tasks.length; i++){
    var dateTime = new Date(tasks[i].dateTime)
    var date = dateTime.getDate()
    var month = dateTime.getMonth()
    var year = dateTime.getFullYear()
    // console.log(year)
    // set up hashmap {year: {month: {date: [tasks]}}}
    if(hashMap[year]){
      if(hashMap[year][month]){
        if(hashMap[year][month][date]){
          hashMap[year][month][date].push(tasks[i])
        }else{
          hashMap[year][month][date] = [tasks[i]]
        }
      }else{
        hashMap[year][month] = {[date]: [tasks[i]]}
      }
    }else{
      hashMap[year] = {[month]: {[date]: [tasks[i]]}}
    }
    
  }
}
getDateFromDateTime()
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


export default function CalendarCustomDayShowcase  () {

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [itemsOnSpecificDate, setItemOnSpecificDate] = React.useState([])
  const dispatch = useDispatch();

  
  const fetchItemSpecificDate = (selectedDate) =>{
    // nếu chọn ngày
    if(selectedDate){
      selectedYear = selectedDate.getFullYear()
      selectedMonth = selectedDate.getMonth()
      selectedDate = selectedDate.getDate()
      console.log(selectedYear, selectedMonth, selectedDate)
      if( //check null for every undefined number in the hashmap
        hashMap[selectedYear] &&
        hashMap[selectedYear][selectedMonth]&&
        hashMap[selectedYear][selectedMonth][selectedDate]){ 
        setItemOnSpecificDate(hashMap[selectedYear][selectedMonth][selectedDate])
        var tasksOnSpecificDate = hashMap[selectedYear][selectedMonth][selectedDate]
        dispatch({
          type: "getTasksOnSpecificDate",
          tasksOnSpecificDate
        })
      }else{
        dispatch({
          type: "getTasksOnSpecificDate",
          tasksOnSpecificDate: []
        })
      }
      
    }
    else{ // nếu ngày là null. khi users chuyển trang qua. 
      var dateToday = new Date().getDate()
      var monthToday = new Date().getMonth()
      var yearToday = new Date().getFullYear()
      setItemOnSpecificDate(hashMap[yearToday][monthToday][dateToday])
      var tasksOnSpecificDate = hashMap[yearToday][monthToday][dateToday]
      console.log('tasks when opening calendar overview', tasksOnSpecificDate)
      dispatch({
        type: "getTasksOnSpecificDate",
        tasksOnSpecificDate
      })
    }
    console.log('itemOSD', itemsOnSpecificDate)
    
  }
  useEffect(() => {
    fetchItemSpecificDate(selectedDate)
  });
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