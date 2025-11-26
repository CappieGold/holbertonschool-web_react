import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';

class CourseList extends React.Component {
  render() {
    const { courses } = this.props;

    return (
      <div className="w-4/5 mx-auto">
        <table id="CourseList" className="w-full">
          {courses.length > 0 && (
            <thead>
              <CourseListRow textFirstCell="Available courses" isHeader={true} />
              <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
            </thead>
          )}
          <tbody>
            {courses.length === 0 ? (
              <CourseListRow textFirstCell="No course available yet" isHeader={false} />
            ) : (
              courses.map((course) => (
                <CourseListRow
                  key={course.id}
                  textFirstCell={course.name}
                  textSecondCell={course.credit}
                  isHeader={false}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      credit: PropTypes.number.isRequired
    })
  )
};

CourseList.defaultProps = {
  courses: []
};

export default WithLogging(CourseList);
