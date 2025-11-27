import React from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, notifications } = this.props;

    return (
      <div className="absolute right-0 top-0">
        <p className="text-right mb-1 cursor-pointer">
          Your notifications
        </p>
        
        {displayDrawer && (
          <div className="relative border-2 border-dashed border-[var(--color-main)] bg-white w-[25vw] p-1.5">
            <button 
              className="absolute top-1 right-1 cursor-pointer bg-transparent border-none text-lg"
              aria-label="Close"
            >
              ×
            </button>
            
            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul className="list-square list-inside m-0 p-0">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
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
