// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

const initialAppointmentsList = []

class Appointments extends Component {
  state = {
    appointmentsList: initialAppointmentsList,
    title: '',
    date: '',
    starredActive: false,
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
    }))
    this.setState({title: '', date: ''})
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !prevState.isStarred}
        }
        return eachItem
      }),
    }))
    this.setState(prevState => ({isStarred: !prevState.isStarred}))
  }

  onClickFilterStarred = () => {
    this.setState(prevState => ({starredActive: !prevState.starredActive}))
  }

  filterStarredList = () => {
    const {appointmentsList, starredActive} = this.state
    if (starredActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {appointmentsList, starredActive, title, date} = this.state
    const filteredList = this.filterStarredList()

    const imageElement = (
      <img
        src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
        alt="appointments"
        className="image"
      />
    )

    return (
      <div className="bg-container">
        <div className="app-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="app-input-container">
            <form className="input-form" onSubmit={this.onSubmitForm}>
              <label htmlFor="titleInput">TITLE</label>
              <input
                type="text"
                className="title-input"
                id="titleInput"
                onChange={this.onChangeTitleInput}
                value={title}
              />
              <label htmlFor="dateInput">DATE</label>
              <input
                type="date"
                className="date-input"
                id="dateInput"
                onChange={this.onChangeDateInput}
                value={date}
              />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            {imageElement}
          </div>
          <hr className="h-line" />
          <h1 className="heading">appointments</h1>
          <button
            className="starred-button"
            type="button"
            onClick={this.onClickFilterStarred}
          >
            Starred
          </button>
          <div className="appointments-container">
            <ul className="appointments-list">
              {filteredList.map(eachItem => (
                <AppointmentItem
                  appointmentDetails={eachItem}
                  key={eachItem.id}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
