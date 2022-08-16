import React from 'react';
import './Promo.less';
import { Button } from '../../../../../ui';
import AppButtons from '../../../../../components/AppButtons/AppButtons';
import * as actions from '../../../../../actions/landing/buttons';
import * as pages from '../../../../../index/constants/pages';
import { useRouter, Link } from 'react-router5';
import SVG from 'utils/svg-wrap';

export default (props) => {
  const router = useRouter();

  const handleClickBuyToken = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const page = props.buyPage ? props.buyPage : pages.TOKEN;

    router.navigate(page);
  };

  const handleClickActionButton = () => {
    if (props.onClick) {
      props.onClick();
    } else if (props.actionPage) {
      router.navigate(props.actionPage);
    } else {
      actions.singUp();
    }
  };

  return (
    <div className="LandingWrapper__block Promo">
      <div className="LandingWrapper__content Promo__content">
        <div className="Promo__content__text">
          <h1>{props.title}</h1>
          <p>{props.description}</p>
          <Button onClick={handleClickActionButton} className="extra_large">
            {props.actionButtonText}
          </Button>
          <AppButtons className="Promo__appButtons" />
          {props.label && (
            <div className="Promo__buyNrfx" onClick={handleClickBuyToken}>
              <div className="Promo__buyNrfx__button">{props.label}</div>
              <div className="Promo__buyNrfx__label">
                {props.labelDescription}{' '}
                <Link routeName={props.buyPage ? props.buyPage : pages.TOKEN}>
                  {props.labelLink} ›
                </Link>
              </div>
            </div>
          )}
        </div>
        <div
          className="Promo__image"
          style={{
            backgroundImage: `url(${props.image})`,
          }}
        />
      </div>
    </div>
  );
};
