import React from 'react';
import { useSelector } from 'react-redux';

// Components
import CabinetContent from '../CabinetContent/CabinetContent';
import SwapForm from '../SwapForm/SwapForm';
import SwapFormAdaptive from '../SwapFormAdaptive/SwapFormAdaptive';
import { Button } from 'src/ui';

// Constants
import { userSelector } from 'src/selectors';

// Styles
import './Exchanger.less';

function Exchanger({ adaptive }) {
  const user = useSelector(userSelector);

  return (
    <CabinetContent>
      {user ? adaptive ? <SwapFormAdaptive /> : <SwapForm /> : <div></div>}
    </CabinetContent>
  );
}

export default Exchanger;
