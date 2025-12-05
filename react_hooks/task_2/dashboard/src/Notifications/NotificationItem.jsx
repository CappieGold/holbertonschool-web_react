import { memo } from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ 
  id = 0, 
  type = 'default', 
  value = '', 
  html = undefined, 
  markAsRead = () => {} 
}) {
  const baseClasses = "pl-1 max-[912px]:text-[20px] max-[912px]:w-full max-[912px]:border-b max-[912px]:border-black max-[912px]:p-[10px_8px]";
  
  const colorClass = type === 'default' 
    ? "text-[color:var(--default-notification-item)]" 
    : "text-[color:var(--urgent-notification-item)]";

  const handleClick = () => {
    markAsRead(id);
  };

  if (html !== undefined) {
    return (
      <li
        className={`${colorClass} ${baseClasses}`}
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        onClick={handleClick}
      />
    );
  }

  return (
    <li
      className={`${colorClass} ${baseClasses}`}
      data-notification-type={type}
      onClick={handleClick}
    >
      {value}
    </li>
  );
}

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string
  }),
  value: PropTypes.string,
  markAsRead: PropTypes.func
};


export default memo(NotificationItem);
