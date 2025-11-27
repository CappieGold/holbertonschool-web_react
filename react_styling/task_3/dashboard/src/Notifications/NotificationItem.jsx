import React from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends React.PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;

    if (type === 'default') {
      return (
        <li
          className="text-[color:var(--default-notification-item)] pl-1"
          data-notification-type={type}
          onClick={() => markAsRead(id)}
        >
          {value}
        </li>
      );
    } else if (type === 'urgent' && html !== undefined) {
      return (
        <li
          className="text-[color:var(--urgent-notification-item)] pl-1"
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        />
      );
    } else {
      return (
        <li
          className="text-[color:var(--urgent-notification-item)] pl-1"
          data-notification-type={type}
          onClick={() => markAsRead(id)}
        >
          {value}
        </li>
      );
    }
  }
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string
  }),
  value: PropTypes.string,
  markAsRead: PropTypes.func,
  id: PropTypes.number
};

NotificationItem.defaultProps = {
  type: 'default',
  html: undefined,
  value: '',
  markAsRead: () => {},
  id: 0
};

export default NotificationItem;
