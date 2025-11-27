import React from 'react';

/**
 * HOC (Higher Order Component) which adds logging
 * to the assembly and disassembly of a component.
 * @param {React.Component} WrappedComponent - The component to be wrapped
 * @returns {React.Component} - The new component with logging
 */
function WithLogging(WrappedComponent) {
  const wrappedComponentName = 
    WrappedComponent.displayName || 
    WrappedComponent.name || 
    'Component';

  class WithLoggingComponent extends React.Component {
    componentDidMount() {
      console.log(`Component ${wrappedComponentName} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${wrappedComponentName} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLoggingComponent.displayName = `WithLogging(${wrappedComponentName})`;

  return WithLoggingComponent;
}

export default WithLogging;
