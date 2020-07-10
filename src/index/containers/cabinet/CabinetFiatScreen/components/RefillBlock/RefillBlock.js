import "./RefillBlock.less";

import React, { useCallback } from "react";
import { BankLogo, Button, ContentBox, Timer } from "../../../../../../ui";
import Lang from "../../../../../../components/Lang/Lang";
import { useSelector } from "react-redux";
import { fiatSelector } from "../../../../../../selectors";
import * as actions from "../../../../../../actions";

export default ({ onHidden }) => {
  const { reservedCard } = useSelector(fiatSelector);

  const handleClickOpen = useCallback(() => {
    actions.openModal("fiat_refill_card");
  }, []);

  const { status } = reservedCard.reservation;

  const handleFinish = () => {
    status !== "wait_for_review" && onHidden();
  };

  return (
    <ContentBox className="RefillBlock">
      <h3>
        <span>
          <Lang
            name={
              status === "wait_for_review"
                ? "cabinet_fiatWallet_waitingForReview"
                : "cabinet_fiatWallet_waitingForRefill"
            }
          />
        </span>
        <strong>
          <Timer
            hiddenAfterFinish
            onFinish={handleFinish}
            time={reservedCard.card.expire_in * 1000}
          />
        </strong>
      </h3>
      <div className="RefillBlock__row">
        <BankLogo name={reservedCard.card.bank.code} />
        <Button onClick={handleClickOpen}>
          <Lang name="global_open" />
        </Button>
      </div>
    </ContentBox>
  );
};
