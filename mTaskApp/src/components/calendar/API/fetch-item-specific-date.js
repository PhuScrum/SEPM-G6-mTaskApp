const fetchItemSpecificDate = (selectedDate, hashMap, dispatch, setItemOnSpecificDate)=>{
/**
 * from the date hashmap, extract tasks on a specific date and dispatch to overview-calendar store.
 */
// nếu chọn ngày
if(selectedDate){
    selectedYear = selectedDate.getFullYear()
    selectedMonth = selectedDate.getMonth()
    selectedDate = selectedDate.getDate()
    // console.log(selectedYear, selectedMonth, selectedDate)
    if( //check null for every undefined number in the hashmap. Nếu là ngày không null, khi user chọn mỗi ngày để xem tasks
      hashMap[selectedYear] &&
      hashMap[selectedYear][selectedMonth]&&
      hashMap[selectedYear][selectedMonth][selectedDate])
      { 
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
    if( hashMap[yearToday] &&
        hashMap[yearToday] && hashMap[monthToday] &&
        hashMap[yearToday] && hashMap[monthToday] && hashMap[dateToday])
      {
        setItemOnSpecificDate(hashMap[yearToday][monthToday][dateToday])
        var tasksOnSpecificDate = hashMap[yearToday][monthToday][dateToday]
        // console.log('tasks when opening calendar overview', tasksOnSpecificDate)
        dispatch({
          type: "getTasksOnSpecificDate",
          tasksOnSpecificDate
        })
    }
  
  }
  
}

export default fetchItemSpecificDate