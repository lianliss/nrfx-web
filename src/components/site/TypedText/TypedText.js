/* eslint-disable */

import './TypedText.less';

import React, { useState, useEffect } from 'react';

let currentProductIndex = 0;

export default class TypedText extends React.PureComponent {
  state = {
    currentString: ''
  }

  componentDidMount() {
    this.typeMessage();
  }

  typeMessage() {
    const { products } = this.props;
    const currentProduct = products[currentProductIndex];
    const currentProductArr = currentProduct ? currentProduct.split("") : [];
    let curString = '';
    let currentLetter = 0;
    let int1 = setInterval(() => {
      if (!currentProductArr[currentLetter]) {
        if (currentProductIndex < products.length) {
          currentProductIndex++;
        } else {
          currentProductIndex = 0;
        }
        setTimeout(() => {
          this.deleteMessage(curString);
        }, 500);
        clearInterval(int1);
      } else {
        curString += currentProduct[currentLetter++];
        this.setState({ currentString: curString });
      }
    }, 100);
  }

  deleteMessage(str) {
    let int = setInterval(() => {
      if (str.length === 0) {
        setTimeout(() => {
          this.typeMessage();
        }, 500);
        clearInterval(int);
      } else {
        str = str.split('');
        str.pop();
        str = str.join('');
        this.setState({ currentString: str });
      }
    }, 50);
  }

  render() {
    const { currentString } = this.state;

    return (
      <div className="TypedText">{currentString}</div>
    )
  }
}
