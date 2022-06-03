import React from 'react';
import { useSelector } from 'react-redux';

// Components
import CabinetContent from '../CabinetContent/CabinetContent';
import SwapForm from '../SwapForm/SwapForm';
import SwapFormAdaptive from '../SwapFormAdaptive/SwapFormAdaptive';
import { Button, ContentBox } from 'src/ui';

// Utils
import { userSelector } from 'src/selectors';
import { openModal } from 'src/actions';
import { LOGIN } from 'src/components/AuthModal/fixtures';

// Styles
import './Exchanger.less';

function Exchanger({ adaptive }) {
  const user = useSelector(userSelector);

  return (
    <CabinetContent>
      {user ? (
        adaptive ? (
          <SwapFormAdaptive />
        ) : (
          <SwapForm />
        )
      ) : (
        <div className="Exchanger">
          <h2>Exchanger</h2>
          <ContentBox className="Exchanger__needAuth">
            <p>Log in to continue</p>
            <Button
              size="middle"
              type="lightBlue"
              onClick={() => openModal('auth', { type: LOGIN })}
            >
              Login
            </Button>
          </ContentBox>
        </div>
      )}
    </CabinetContent>
  );
}

export default Exchanger;
