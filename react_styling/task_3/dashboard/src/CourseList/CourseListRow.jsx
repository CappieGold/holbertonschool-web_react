import PropTypes from 'prop-types';

function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null }) {
  return (
    <tr className={isHeader
      ? "bg-[color-mix(in_srgb,var(--color-table-header)_66%,transparent)]"
      : "bg-[color-mix(in_srgb,var(--color-table-rows)_45%,transparent)]"
    }>
      {isHeader ? (
        <>
          <th className="border border-gray-400" colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
          {textSecondCell && <th className="border border-gray-400">{textSecondCell}</th>}
        </>
      ) : (
        <>
          <td className="border border-gray-400 pl-2">{textFirstCell}</td>
          <td className="border border-gray-400 pl-2">{textSecondCell}</td>
        </>
      )}
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
