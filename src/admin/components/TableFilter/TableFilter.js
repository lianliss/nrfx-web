import React from 'react';

export default props => {
  console.log(111, props);
  return null;
  return (
    <div>
      {Object.keys(props.params.filters).map(name => (
        <div>123</div>
      ))}
    </div>
  )
}