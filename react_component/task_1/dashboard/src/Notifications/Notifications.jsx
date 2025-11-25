import PropTypes from 'prop-types';
import './Notifications.css';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

function Notifications({ displayDrawer = false, notifications = [] }) {
  const handleClose = () => {
    console.log('Close button has been clicked');
  };

  return (
    <div className="NotificationsComponent">
      <div className="notification-title">
        Your notifications
      </div>
      {displayDrawer && (
        <div className="Notifications">
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label="Close"
            onClick={handleClose}
          >
            <img src={closeIcon} alt="close icon" style={{ width: '15px', height: '15px' }} />
          </button>
          <p>
            {notifications.length > 0 
              ? 'Here is the list of notifications' 
              : 'No new notification for now'}
          </p>
          {notifications.length > 0 && (
            <ul>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string
      })
    })
  )
};

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: []
};

export default Notifications;
