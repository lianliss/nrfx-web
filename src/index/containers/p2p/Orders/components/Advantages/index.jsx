import React from 'react';

// Components
import { CabinetBlock } from 'dapp';
import BlogCard from '../BlogCard';

// Styles
import './index.less';

function Advantages() {
  return (
    <CabinetBlock className="orders-advantages">
      <h3>Advantages of P2P Exchange</h3>
      <div className="orders-advantages__cards">
        <BlogCard
          title="Low Transaction Fees"
          description={
            <>
              As P2P exchange is a simple platform, the overhead costs are
              negligible for buyers and sellers. <br />
              <br />
              On Binance P2P, takers are charged zero trading fees, while makers
              are charged a small amount of transaction fees upon every
              completed order. We pledge to apply the lowest P2P transaction
              fees in all markets.
            </>
          }
        />
        <BlogCard
          title="Low Transaction Fees"
          description={
            <>
              As P2P exchange is a simple platform, the overhead costs are
              negligible for buyers and sellers. <br />
              <br />
              On Binance P2P, takers are charged zero trading fees, while makers
              are charged.
            </>
          }
        />
        <BlogCard
          title="Low Transaction Fees"
          description={
            <>
              As P2P exchange is a simple platform, the overhead costs are
              negligible for buyers and sellers. <br />
              <br />
              On Binance P2P, takers are charged zero trading fees, while makers
              are charged a small amount of transaction fees upon every
              completed order. We pledge to apply the lowest P2P transaction
              fees in all markets.
            </>
          }
        />
      </div>
    </CabinetBlock>
  );
}

export default Advantages;
