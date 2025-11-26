import PropTypes from 'prop-types';

function CourseListRow({ isHeader = false, textFirstCell, textSecondCell = null }) {
  const rowStyle = isHeader
    ? 'bg-[var(--color-table-header)]/[0.66]'
    : 'bg-[var(--color-table-rows)]/[0.45]';

  const cellBorder = 'border border-gray-400';

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className={rowStyle}>
          <th colSpan="2" className={cellBorder}>{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr className={rowStyle}>
        <th className={cellBorder}>{textFirstCell}</th>
        <th className={cellBorder}>{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr className={rowStyle}>
      <td className={`${cellBorder} pl-2`}>{textFirstCell}</td>
      <td className={`${cellBorder} pl-2`}>{textSecondCell}</td>
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default CourseListRow;
