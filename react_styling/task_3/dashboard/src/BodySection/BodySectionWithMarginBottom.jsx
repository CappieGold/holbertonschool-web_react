import React from 'react';
import PropTypes from 'prop-types';

class BodySectionWithMarginBottom extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <div className="bodySectionWithMargin mb-10">
        <h2 className="font-bold border-b-[3px] border-b-[var(--color-main)] mb-4">{title}</h2>
        {children}
      </div>
    );
  }
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default BodySectionWithMarginBottom;
