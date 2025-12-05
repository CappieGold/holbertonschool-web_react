import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';

class BodySectionWithMarginBottom extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <div className="bodySectionWithMargin mb-10 max-w-full">
        <BodySection title={title}>
          {children}
        </BodySection>
      </div>
    );
  }
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default BodySectionWithMarginBottom;
