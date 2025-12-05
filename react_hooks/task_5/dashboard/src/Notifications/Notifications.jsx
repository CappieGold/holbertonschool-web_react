import { memo } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

function Notifications({
  displayDrawer = false,
  notifications = [],
  handleDisplayDrawer = () => {},
  handleHideDrawer = () => {},
  markNotificationAsRead = () => {}
}) {
  const shouldBounce = notifications.length > 0 && !displayDrawer;

  return (
    <>
      <div
        className={`notification-title absolute right-3 top-1 whitespace-nowrap cursor-pointer ${shouldBounce ? 'animate-bounce' : ''}`}
        onClick={handleDisplayDrawer}
      >
        Your notifications
      </div>
      {displayDrawer && (
        <div className="notification-items relative border-[3px] border-dotted border-[color:var(--main-color)] right-3 p-1.5 w-[380px] float-right mt-7 max-[912px]:w-full max-[912px]:fixed max-[912px]:top-0 max-[912px]:left-0 max-[912px]:right-0 max-[912px]:bottom-0 max-[912px]:z-50 max-[912px]:float-none max-[912px]:m-0 max-[912px]:p-3 max-[912px]:bg-white max-[912px]:overflow-y-hidden max-[912px]:h-screen max-[430px]:overflow-y-hidden max-[430px]:h-screen">
          {notifications.length > 0 ? (
            <div className="relative">
              <p className="m-0 max-[912px]:text-[20px]">Here is the list of notifications</p>
              <button
                onClick={handleHideDrawer}
                aria-label="Close"
                className="absolute cursor-pointer right-0 top-0 bg-transparent"
              >
                <img src={closeIcon} alt="close icon" className="w-3 h-3" />
              </button>
              <ul className="list-[square] pl-5 max-[912px]:p-0 max-[912px]:list-none">
                {notifications.map((notification) => (
                  <NotificationItem
                    id={notification.id}
                    key={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={markNotificationAsRead}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <p className="max-[912px]:text-[20px]">No new notification for now</p>
          )}
        </div>
      )}
    </>
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
  ),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func
};

function areEqual(prevProps, nextProps) {
  if (prevProps.displayDrawer !== nextProps.displayDrawer) {
    return false;
  }

  if (prevProps.notifications.length !== nextProps.notifications.length) {
    return false;
  }

  for (let i = 0; i < prevProps.notifications.length; i++) {
    if (prevProps.notifications[i].id !== nextProps.notifications[i].id) {
      return false;
    }
  }

  return true;
}

export default memo(Notifications, areEqual);
