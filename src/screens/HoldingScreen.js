import React from 'react';
import {useSelector} from 'react-redux';
import {useFetchData} from '../customHooks';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HoldingsListItem from '../components/HoldingsListItem';
import {EndPoint} from '../utils/endpoints';
import {
  fetchHoldingDataFailure,
  fetchHoldingDataSuccess,
} from '../store/actions';
import globalStyle from '../utils/styles';
import PortfolioSummary from '../components/PortfolioSummary';

const HoldingScreen = () => {
  // Created custom hook to call api, and save data in redux as well return it, and handle error and loading state
  const {data, isLoading, error} = useFetchData(EndPoint.FetchHoldings, {
    successAction: fetchHoldingDataSuccess,
    failureAction: fetchHoldingDataFailure,
  });
  const fetchedData = useSelector(state => state.holdings.data);

  // TODO: We can create generic header to it in all screen for time being added here
  const Header = () => (
    <View style={styles.headerStyle}>
      <Text style={[globalStyle.titleTextStyle, styles.textColor]}>
        Upstox Holding
      </Text>
    </View>
  );

  return (
    <>
      <Header />
      {isLoading && <ActivityIndicator />}
      {/* We can show some generic error message */}
      {error && <Text>Error: {error.message}</Text>}
      {fetchedData?.userHolding?.length > 0 && (
        <FlatList
          data={fetchedData?.userHolding}
          keyExtractor={(item, index) => item?.symbol}
          style={styles.flatListContainer}
          renderItem={({item}) => <HoldingsListItem item={item} />}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
      )}
      <PortfolioSummary />
    </>
  );
};
export default HoldingScreen;

const styles = StyleSheet.create({
  divider: {borderBottomWidth: 1, borderBottomColor: '#ECECED'},
  textColor: {color: 'white'},
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7D007E',
    padding: 16,
  },
  flatListContainer: {height: '100%', backgroundColor: '#C3C3C8'},
});
