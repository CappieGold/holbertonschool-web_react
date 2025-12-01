import React from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends React.PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;

    const baseClasses = "pl-1 max-[912px]:text-[20px] max-[912px]:w-full max-[912px]:border-b max-[912px]:border-black max-[912px]:p-[10px_8px]";
    const colorClass = type === 'default' 
      ? "text-[color:var(--default-notification-item)]" 
      : "text-[color:var(--urgent-notification-item)]";

    if (html !== undefined) {
      return (
        <li
          className={`${colorClass} ${baseClasses}`}
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        />
      );
    }

    return (
      <li
        className={`${colorClass} ${baseClasses}`}
        data-notification-type={type}
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
  html: undefined,
  value: '',
  markAsRead: () => {},
  id: 0
};

export default NotificationItem;
