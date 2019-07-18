import './CabinetInvestmentsScreen.less';

import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';

import CabinetWrapper from '../../../wrappers/Cabinet/CabinetWrapper';
import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';


function CabinetInvestmentsScreen({ wallets, history }) {
  return (
    <CabinetWrapper>
      <PageContainer>
        test
      </PageContainer>
    </CabinetWrapper>
  )
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(CabinetInvestmentsScreen);