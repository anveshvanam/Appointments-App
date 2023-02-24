// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {title, date, isStarred, id} = appointmentDetails

  const onClickStar = () => {
    toggleStar(id)
  }

  return (
    <li className="appointmentItem">
      <div>
        <p className="heading">{title}</p>
        <p className="date">{date}</p>
      </div>

      <button
        type="button"
        className="star-button"
        onClick={onClickStar}
        data-testid="star"
      >
        <img
          src={
            isStarred
              ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
          }
          className="star"
          alt="star"
        />
      </button>
    </li>
  )
}
export default AppointmentItem
