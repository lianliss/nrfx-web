import './Table.less';

import React from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils';
import Hover from '../Hover/Hover';

function Table({ headings, children, className }) {
  return (
    <table className={utils.classNames({
      Table: true,
      Content_box: true,
      [className]: !!className
    })}>
      <thead>
        <tr>
          {React.Children.map(headings, (child, i) => {
            if (!React.isValidElement(child)) {
              return child;
            }

            return React.cloneElement(child, {
              key: i
            });
          })}
        </tr>
      </thead>

      <tbody>
        {React.Children.map(children, (child, i) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          return React.cloneElement(child, {
            dark: i % 2 === 0
          });
        })}
      </tbody>
    </table>
  )
}

export function TableCell({ children, onClick, dark }) {
  let Component = 'tr';
  let params = {};
  if (onClick) {
    Component = Hover;
    params.tagName = 'tr';
  }

  return (
    <Component
      onClick={onClick}
      className={utils.classNames({
        dark: !!dark
      })}
      {...params}
    >
      {children}
    </Component>
  )
}

TableCell.propTypes = {
  dark: PropTypes.bool
};

export function TableColumn({ children, align, style, highlighted, sub }) {
  return (
    <td
      className={utils.classNames({
        [align]: !!align,
        highlighted: !!highlighted
      })}
      style={style}
    >
      <div className="Table__td__cont">{children}</div>
      {sub && <div className="Table__sub">{sub}</div>}
    </td>
  )
}

TableColumn.propTypes = {
  highlighted: PropTypes.bool,
  align: PropTypes.oneOf(['center', 'right']),
  style: PropTypes.object,
  sub: PropTypes.string
};

export default Table;