import PropTypes from 'prop-types';

function NotificationItem({ type, html, value }) {
  const styles = {
    color: type === 'urgent' ? 'red' : 'blue'
  };

  if (html) {
    return (
      <li
        data-notification-type={type}
        style={styles}
        dangerouslySetInnerHTML={html}
      />
    );
  }

  return (
    <li
      data-notification-type={type}
      style={styles}
    >
      {value}
    </li>
  );
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string
  }),
  value: PropTypes.string
};

NotificationItem.defaultProps = {
  type: 'default',
  html: null,
  value: ''
};

export default NotificationItem;
