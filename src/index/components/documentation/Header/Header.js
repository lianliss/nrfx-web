import './Header.less';
import React from 'react';

import Logo from 'src/ui/components/Logo/Logo';
import { BaseLink } from 'react-router5';
import router from 'src/router';
import * as PAGES from 'src/index/constants/pages'
import ContentBox from 'src/ui/components/ContentBox/ContentBox'

export default props => {
  return (
    <ContentBox className="DocumentationHeader">
      <BaseLink router={router} routeName={PAGES.MAIN}>
        <Logo />
      </BaseLink>
      <div className="Header__title">Documentation</div>
      {/*<div className="Header__menu"></div>*/}
    </ContentBox>
  )
}
