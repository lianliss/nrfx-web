import './Bot.less';

import React from 'react';
import { connect } from 'react-redux';

import CabinetBaseScreen from '../../../CabinetBaseScreen/CabinetBaseScreen';
import PageContainer from '../../../../../components/cabinet/PageContainer/PageContainer';
import LoadingStatus from '../../../../../components/cabinet/LoadingStatus/LoadingStatus';

import * as traderActions from '../../../../../../actions/cabinet/trader';

import BotInfo from '../../components/BotInfo/BotInfo';
import BotForm from '../../components/BotForm/BotForm';
import TradeList from '../../components/History/History';
import {ProfileSidebarItem} from '../../../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import * as pages from '../../../../../constants/pages';
import {ReactComponent as PlusCircleSvg} from '../../../../../../asset/24px/angle-left.svg';
import router from '../../../../../../router';

class Index extends CabinetBaseScreen {
  load() {
    this.props.loadBot(this.props.routerParams.id);
  }

  render() {
    if (this.isLoading) {
      return <LoadingStatus status={this.loadingStatus} onRetry={() => this.load()} />;
    }

    return (
      <PageContainer
        leftContent={this.__renderRightContent()}
        sidebarOptions={[
          <ProfileSidebarItem
            onClick={() => router.navigate(pages.TRADER)}
            icon={<PlusCircleSvg />}
            label={'Create Bot'}
          />,
        ]}
      >
        {this.__renderContent()}
      </PageContainer>
    )
  }

  __renderContent() {
    return (
      <div>
        <BotInfo />
        <div className="Bot__forms">
          <BotForm />
          <div />
        </div>
      </div>
    )
  }
  __renderRightContent() {
    return <TradeList />
  }
}

export default connect(state => ({
  loadingStatus: state.trader.loadingStatus
}), {
  loadBot: traderActions.loadBot
})(Index);
