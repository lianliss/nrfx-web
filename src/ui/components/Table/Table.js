// styles
import './Table.less';
// external
import React from 'react';
import PropTypes from 'prop-types';
// internal
import Hover from '../Hover/Hover';
import * as utils from '../../utils';

import Collapse from '../Collapse/Collapse';
import ContentBox from '../ContentBox/ContentBox';

function Table({ headings, children, className, header, hidden, adaptive, compact, skipContentBox, inline }) {

  const Wrapper = adaptive ? Collapse : (skipContentBox ? props => <div {...props} /> : ContentBox);

  return (
    <Wrapper title={header} className={utils.classNames(className, {
      TableMain: true,
    })}>
      {header && !adaptive && <div
        className="Table__header"
      >
        <span>{header}</span>
      </div>}

      <table className={utils.classNames({
        Table: true,
        compact: !!compact,
        inline: !!inline,
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
              dark: !inline && i % 2 === 0
            });
          })}
        </tbody>
      </table>
    </Wrapper>
  )
}

export function TableCell({ children, onClick, dark, className}) {
  let Component = 'tr';
  let params = {};
  if (onClick) {
    Component = Hover;
    params.tagName = 'tr';
  }

  return (
    <Component
      onClick={onClick}
      className={utils.classNames(className, {
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

export function TableColumn({ children, align, style, highlighted, sub, className }) {
  return (
    <td
      className={utils.classNames(className, {
        [align]: !!align,
        highlighted: !!highlighted
      })}
      style={style}
    >
      <div className="Table__td__cont">
        {children}
        {sub !== undefined && <div className="Table__sub">{sub}</div>}
      </div>
    </td>
  )
}

TableColumn.propTypes = {
  highlighted: PropTypes.bool,
  align: PropTypes.oneOf(['center', 'right', 'left']),
  style: PropTypes.object,
  sub: PropTypes.string,
  compact: PropTypes.bool,
  skipContentBox: PropTypes.bool,
  inline: PropTypes.bool,
};

export default Table;
