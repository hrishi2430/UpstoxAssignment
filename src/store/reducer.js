const initialState = {
  data: [],
  loading: false,
  error: null,
};
const getHoldingData = data => {
  // TODO: I have added all calculation in reducer to keep all data in redux store, so that I can access it anywhere
  /*    4. P&L = Current value (Individual item) (minus) Investment value (Individual
        item)
        5. Current value (Individual item) = LTP * Quantity
        6. Investment value (Individual item) = Avg. Price * Quantity
        7. Current value total = sum of all the Current values
        8. Total investment = sum of all the Investment values
        9. Total PNL = Current value total - Total Investment
        10.Today’s PNL = sum of ((Close - LTP ) * quantity) of all the holdings,
        {
            "symbol": "TCS",
            "quantity": 10,
            "ltp": 3250.50,
            "avgPrice": 2480.30,
            "close": 3312
        },
    */
  data.totalCurrentValue = 0;
  data.totalInvestmentValue = 0;
  data.totalPNL = 0;
  data.todaysPNL = 0;
  data?.userHolding?.forEach((element, index) => {
    element.currentValue = element.ltp * element.quantity;
    element.investmentValue = element.avgPrice * element.quantity;
    element.PNL = element.currentValue - element.investmentValue;
    element.todaysPNL = (element.close - element.ltp) * element.quantity;

    data.totalCurrentValue += Number(element.currentValue);
    data.totalInvestmentValue += Number(element.investmentValue);
    data.totalPNL = data.totalCurrentValue - data.totalInvestmentValue;
    data.todaysPNL = data.todaysPNL - Number(element.todaysPNL);
  });
  return data;
};

const holdingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return {...state, data: getHoldingData(action.payload)};
    case 'FETCH_DATA_FAILURE':
      return {...state, error: action.payload};
    default:
      return state;
  }
};

export default holdingReducer;
