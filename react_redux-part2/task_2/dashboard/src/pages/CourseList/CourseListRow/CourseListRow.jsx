import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545'
  },
  row: {
    backgroundColor: '#f5f5f5ab'
  },
  rowChecked: {
    backgroundColor: '#e6e4e4'
  }
});

export default function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
  isChecked = false,
  id,
  changeRow = () => {}
}) {
  if (isHeader) {
    return (
      <tr className={css(styles.headerRow)}>
        <th colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
        {textSecondCell ? <th>{textSecondCell}</th> : null}
      </tr>
    );
  }

  const rowStyle = isChecked ? styles.rowChecked : styles.row;

  return (
    <tr className={css(rowStyle)}>
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => changeRow(id, e.target.checked)}
        />
        {textFirstCell}
      </td>
      <td>{textSecondCell}</td>
    </tr>
  );
}
