import "./AdminWrapper.less";

import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";

import { classNames as cn } from "../../utils/index";
import Header from "../../admin/components/Header/Header";
import Menu from "../../admin/components/Menu/Menu";
import ContentBox from "../../ui/components/ContentBox/ContentBox";
import LoadingStatus from "../../index/components/cabinet/LoadingStatus/LoadingStatus";
import { adminPendingSelector } from "../../selectors";
import TelegramLoginButton from 'react-telegram-login';
import web3Backend from 'src/services/web3-backend';

export default memo(props => {
  const pending = useSelector(adminPendingSelector);

  useEffect(() => {
    window.scroll(0, 0);
  }, [props.children.props.routerParams]);

  const onTelegramAuth = async user => {
    try {
      await web3Backend.setUserTelegram(user.id);
      console.log('[onTelegramAuth]', user);
    } catch (error) {
      console.error('[onTelegramAuth]', error);
    }
  };

  return (
    <div className={cn("Admin_wrapper", { pending })}>
      <div className="Admin_wrapper__header">
        <Header />
      </div>
      <div className="Admin_wrapper__layout">
        <ContentBox className="Admin_wrapper__menu">
          <TelegramLoginButton dataOnauth={onTelegramAuth}
                               cornerRadius={12}
                               botName="GreedIsGoodAIBot" />
          <Menu />
        </ContentBox>
        <div className="Admin_wrapper__content">
          <div className="Admin_wrapper__loader">
            <LoadingStatus status={"loading"} />
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
});
