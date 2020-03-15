import * as actionTypes from "../actions/actionTypes";

const initialState = {
  bots: [],
  bot: {},
  loadingStatus: {
    default: "loading",
    bot: "loading"
  }
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.TRADER_SET_LOADING_STATUS: {
      return {
        ...state,
        loadingStatus: {
          ...state.loadingStatus,
          [action.section]: action.status
        }
      };
    }

    case actionTypes.TRADER_BOT_SET_PROPERTY: {
      return {
        ...state,
        bot: {
          ...state.bot,
          bot: {
            ...state.bot.bot,
            [action.property]: action.value
          }
        },
        loadingStatus: {
          ...state.loadingStatus,
          [action.section]: action.status
        }
      };
    }

    case actionTypes.TRADER_BOT_INIT: {
      return { ...state, bot: action.bot };
    }

    case actionTypes.TRADER_BOT_UPDATE: {
      return {
        ...state,
        bot: { ...state.bot, bot: { ...state.bot.bot, ...action.bot } }
      };
    }

    case actionTypes.TRADER_OPTIONS_UPDATE: {
      return { ...state, bot: { ...state.bot, ...action.bot } };
    }

    case actionTypes.TRADER_BOT_SET_INDICATOR_PROPERTY: {
      return {
        ...state,
        bot: {
          ...state.bot,
          bot: {
            ...state.bot.bot,
            indicators: state.bot.bot.indicators.map(i => {
              if (i.name === action.indicator) {
                return {
                  ...i,
                  params: {
                    ...i.params,
                    [action.property]: action.value
                  }
                };
              }
              return i;
            })
          }
        }
      };
    }

    case actionTypes.TRADER_INIT:
      return { ...state, bots: action.bots };

    default:
      return state;
  }
}
