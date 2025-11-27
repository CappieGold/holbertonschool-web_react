import React from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends React.PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;

    const colorClass = type === 'urgent'
      ? 'text-[var(--color-urgent-notification-item)] before:bg-[var(--color-urgent-notification-item)]'
      : 'text-[var(--color-default-notification-item)] before:bg-[var(--color-default-notification-item)]';

    const liClasses = `${colorClass} list-none flex items-baseline gap-2 before:content-[''] before:inline-block before:w-2 before:h-2 before:shrink-0`;

    if (html) {
      return (
        <li
          data-notification-type={type}
          className={liClasses}
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        />
      );
    }

    return (
      <li
        data-notification-type={type}
        className={liClasses}
        onClick={() => markAsRead(id)}
      >
        {value}
      </li>
    );
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
  html: null,
  value: '',
  markAsRead: () => { },
  id: 0
};

export default NotificationItem;
