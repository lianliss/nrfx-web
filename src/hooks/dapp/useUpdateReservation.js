import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import web3Backend from 'src/services/web3-backend';
import { Web3Context } from 'src/services/web3Provider';
import * as actionTypes from 'src/actions/actionTypes';
import { walletCardReservationSelector } from 'src/selectors';
import {
  deleteCardReservation,
  setCardReservation,
} from 'src/actions/dapp/wallet';

const useUpdateReservation = () => {
  const dispatch = useDispatch();
  const { accountAddress, network } = useContext(Web3Context);
  const reservationCards = useSelector((state) => _.get(state, 'fiat.topup'));
  const cardReservation = useSelector(walletCardReservationSelector);
  const methods = useSelector((state) => state.fiat.banks);

  const updateBanks = async () => {
    await web3Backend.getBanks().then((banks) => {
      dispatch({
        type: actionTypes.FIAT_BANKS_UPDATE,
        payload: banks,
      });
    });
  };

  const updateReservation = async (fiatSymbol) => {
    const reservation = _.get(reservationCards, fiatSymbol);

    try {
      const data = await web3Backend.getReservation(
        fiatSymbol,
        accountAddress,
        network.networkID
      );

      const res = data[0];

      if (!res) {
        if (reservation) {
          // If there was reservation before get available banks again
          await updateBanks();
          dispatch({
            type: actionTypes.FIAT_TOPUP_DELETE,
            payload: fiatSymbol,
          });
          dispatch(deleteCardReservation());
        }

        return;
      }

      let payload = {};
      payload[fiatSymbol] = res;

      dispatch({
        type: actionTypes.FIAT_TOPUP_UPDATE,
        payload,
      });

      // Data for invoice
      const method = methods.find((b) => b.code === res.bank);
      const bankName = method ? method.title : res.bank;
      payload = {
        reservation: {
          id: res.operation_id,
          amount: res.amount,
          status: res.status,
          fee: res.fee,
        },
        card: {
          isCard: !!res.is_card,
          number: res.number,
          expire_in: res.book_expiration,
          address: res.address,
          routing_number: res.routing_number,
          account_type: res.account_type,
          iban: res.iban,
          bic: res.bic,
          short_code: res.short_code,
          institution_number: res.institution_number,
          transit_number: res.transit_number,
          bank: {
            code: res.bank,
            name: bankName,
            holder_name: res.holder_name,
            currency: fiatSymbol,
          },
        },
      };

      dispatch(setCardReservation(payload));
    } catch (error) {
      if (reservation && reservation[fiatSymbol]) {
        dispatch({
          type: actionTypes.FIAT_TOPUP_DELETE,
          payload: fiatSymbol,
        });
        dispatch(deleteCardReservation());
      }
    }
  };

  return { cardReservation, updateReservation, updateBanks };
};

export default useUpdateReservation;
