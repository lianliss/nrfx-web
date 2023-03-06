import React from 'react';

// Components
import { CabinetBlock } from 'dapp';
import BlogCard from '../BlogCard';

// Styles
import './index.less';

function Blog() {
  return (
    <CabinetBlock className="orders-blog">
      <h3>P2P Blog</h3>
      <div className="orders-blog__cards">
        <BlogCard
          title="Get Your Binance P2P Ads to Appear Among Top Ad Search Results"
          description={
            <>
              We’ve rounded up a few strategies that can help optimize your
              Binance P2P ads so that they get maximum visibility on the
              platform.
            </>
          }
          date={new Date()}
        />
        <BlogCard
          title="Fund Password: A New Security Feature For Faster and Safer Transactions on Binance P2P"
          description={
            <>
              Our new Fund Password feature, available on the Binance app, is a
              security tool that helps make transactions on Binance P2P even
              faster and safer!
            </>
          }
          date={new Date()}
        />
        <BlogCard
          title="How To Check Your Verified Name On Binance P2P"
          description={
            <>
              Want to check your Binance-verified name before you trade crypto
              on Binance P2P? This guide will show you how to do it in a few
              easy steps.
            </>
          }
          date={new Date()}
        />
      </div>
    </CabinetBlock>
  );
}

export default Blog;
