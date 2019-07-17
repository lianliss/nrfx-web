import './Table.less';

import React from 'react';


function Table({ headings, rows, onRowClick }) {
  return (
    <table className="Table Content_box">
      <thead>
        <tr>
          {headings.map((heading, i) => (
            <th key={i}>{heading}</th>
          ))}
        </tr>
      </thead>
      
      <tbody>
        {rows.map((rowItems, ind) => (
          <tr
            key={ind}
            onClick={onRowClick}
            className={ind % 2 === 0 ? 'Table__dark__row' : 'Table__row'}
          >
            {rowItems.map((item, index) => (
              <td key={index}>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table;