const Notification = ({ message, notificationType }) => {
    if (message === null) {
      return null
    }
    
    console.log(notificationType)

    return (
      <div className={notificationType}>
        {message}
      </div>
    )
  }

export default Notification