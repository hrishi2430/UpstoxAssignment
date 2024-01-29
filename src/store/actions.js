export const fetchHoldingDataSuccess = payload => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    payload,
  };
};
export const fetchHoldingDataFailure = payload => {
  return {
    type: 'FETCH_DATA_FAILURE',
    payload,
  };
};
