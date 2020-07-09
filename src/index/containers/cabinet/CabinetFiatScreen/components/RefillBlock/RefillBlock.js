import "./RefillBlock.less";

import React, { useCallback, useState, useEffect } from "react";
import { BankLogo, Button, ContentBox } from "../../../../../../ui";
import Lang from "../../../../../../components/Lang/Lang";
import { useSelector } from "react-redux";
import { fiatSelector } from "../../../../../../selectors";
import * as actions from "../../../../../../actions";
import { calculateTimeLeft } from "../../../../site/SiteTokenScreen/components/Promo/timer";

export default () => {
  const { reservedCard } = useSelector(fiatSelector);

  const [dateNow, setDateNow] = useState();

  const handleClickOpen = useCallback(() => {
    actions.openModal("fiat_refill_card");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDateNow(Date.now());
    }, 1000);
  }, [dateNow]);

  const { status } = reservedCard.reservation;

  const timer = calculateTimeLeft(
    reservedCard.card.expire_in * 1000 - Date.now()
  );

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
        {status !== "wait_for_review" && (
          <strong>
            {timer.hours}:{timer.minutes}:{timer.seconds}
          </strong>
        )}
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
