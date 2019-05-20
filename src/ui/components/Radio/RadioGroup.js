import React  from 'react';

export default function RadioGroup(props) {
  return (
    <div>
      {React.Children.map(props.children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return React.cloneElement(child, {
          selected: child.props.value === props.selected,
          onChange: props.onChange
        });
      })}
    </div>
  );
}
