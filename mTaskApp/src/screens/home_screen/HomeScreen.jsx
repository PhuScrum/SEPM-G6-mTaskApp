import React, { Component } from 'react'
import FiveDayScreen from '../five_date/FiveDayScreen'
import CalendarOverviewScreen from '../calendar_overview/CalendarOverviewScreen'
export default class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            openCalendar: false
        }
        this.openCalendar = this.openCalendar.bind(this)
    }
    openCalendar(){
        const {openCalendar} = this.state
        this.setState({openCalendar: !openCalendar})
    }

    render() {
        const {openCalendar} = this.state

        if(openCalendar){
            return (
                <CalendarOverviewScreen data={this.state} openCalendar={this.openCalendar}/>
            )
        }else{
            return (
                <FiveDayScreen data={this.state} openCalendar={this.openCalendar}/>
            )
        }
        
    }
}
