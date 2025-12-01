import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';

class CourseList extends React.Component {
  render() {
    const { courses } = this.props;

    return (
      <div className="courses mx-auto my-32 w-4/5">
        {courses.length > 0 ? (
          <table id="CourseList" className="w-full border-collapse border border-gray-500">
            <thead>
              <CourseListRow textFirstCell="Available courses" isHeader={true} />
              <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
            </thead>
            <tbody>
              {courses.map((course) => (
                <CourseListRow
                  key={course.id}
                  textFirstCell={course.name}
                  textSecondCell={course.credit}
                  isHeader={false}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <table id="CourseList" className="w-full border-collapse border border-gray-500">
            <thead>
              <CourseListRow isHeader={true} textFirstCell="No course available yet" />
            </thead>
          </table>
        )}
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
