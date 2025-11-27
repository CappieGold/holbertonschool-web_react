import React from 'react';
import PropTypes from 'prop-types';

class BodySection extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <div className="bodySection mb-5">
        <h2 className="font-bold text-xl mt-8">{title}</h2>
        {children}
      </div>
    );
  }
}

BodySection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default BodySection;
