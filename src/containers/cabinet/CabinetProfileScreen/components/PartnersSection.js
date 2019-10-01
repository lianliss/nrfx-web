import React from 'react';
import ReferralLink from './ReferralLink';
import TableOfPartners from './TableOfPartners';

class PartnersSection extends React.Component {
  render() {
    return [
      this.props.wallets(),
      <ReferralLink />,
      this.__renderTableOfPartners(),
    ]
  }

  __renderTableOfPartners = e => {
    return <TableOfPartners
      partners={
        [
          1,2,3,4,5,6
        ]
      }
    />
  }
}

PartnersSection.defaultProps = {
  wallets: <></>
};

export default PartnersSection;