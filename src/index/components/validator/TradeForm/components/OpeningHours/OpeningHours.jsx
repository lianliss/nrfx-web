import React from 'react';
import _ from 'lodash';

// Components
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import { Row, Button } from 'ui';

// Utils
import defaultAnswer from '../../constants/defaultAnswer';
import Hours from '../Hours/Hours';
import Column from '../Column/Column';

const hexToArrays = schedule => {
  let binary = _.replace(schedule, "0x", "")
    .split('')
    .map(hex => {
      const str = parseInt(hex, 16).toString(2);
      return str.length >= 4
        ? str
        : (new Array(4 - str.length)).fill('0').join('') + str;
    })
    .join('');
  const offset = (new Date()).getTimezoneOffset() / 60;
  const offsetHours = Math.abs(offset);
  if (offset) {
    if (offset < 0) {
      binary = [binary.slice(offsetHours), binary.slice(0, offsetHours)].join('');
    } else {
      binary = [binary.slice(binary.length - offsetHours), binary.slice(0, binary.length - offsetHours)]
    }
  }
  return _.chunk(
    binary
      .split('')
      .map(v => !!Number(v)),
    24
  )
};

const arraysToHex = arrays => {
  let binary = _.flatten(arrays).map(v => Number(v)).join('');
  const offset = (new Date()).getTimezoneOffset() / 60;
  const offsetHours = Math.abs(offset);
  if (offset) {
    if (offset > 0) {
      binary = [binary.slice(offsetHours), binary.slice(0, offsetHours)].join('');
    } else {
      binary = [binary.slice(binary.length - offsetHours), binary.slice(0, binary.length - offsetHours)].join('');
    }
  }
  return "0x" + _.chunk(
    binary,
    8
  ).map(c => {
    const str = parseInt(c.join(""), 2).toString(16);
    return str.length > 1
      ? str
      : "0" + str;
  }).join("");
};

function OpeningHours({schedule, onChange, onSave, isProcess, isChanged}) {
  
  const [arrays, setArrays] = React.useState(hexToArrays(schedule));
  
  React.useEffect(() => {
    setArrays(hexToArrays(schedule));
  }, [schedule]);
  
  return (
    <div className="ValidatorTradeForm-opening-hours more-information__item">
      <ColumnTitle title="Opening hours" description={defaultAnswer} />
      {_.chunk(arrays, 4).map((chunk, chunkKey) => <Row className="ValidatorTradeForm-row" key={chunkKey} wrap>
        {chunk.map((array, arrayKey) => {
          let day = '';
          const index = chunkKey * 4 + arrayKey;
          switch (index) {
            case 0: day = 'Sunday'; break;
            case 1: day = 'Monday'; break;
            case 2: day = 'Tuesday'; break;
            case 3: day = 'Wednesday'; break;
            case 4: day = 'Thursday'; break;
            case 5: day = 'Friday'; break;
            case 6: day = 'Saturday'; break;
            default:
          }
          return <Hours day={day}
                        data={arrays[index]}
                        key={index}
                        onChange={subArray => {
                          arrays[index] = subArray;
                          console.log('HOURS', subArray, arrays, arraysToHex(arrays));
                          setArrays(arrays);
                          onChange(arraysToHex(arrays));
                        }}
          />
        })}
        {chunk.length < 4 && <><Column className="right bottom">
          <Button
            state={isProcess ? "loading" : ''}
            disabled={isProcess || !isChanged}
            onClick={onSave}
          >
            Save
          </Button>
        </Column></>}
      </Row>)}
    </div>
  );
}

export default OpeningHours;
