import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import globalStyle from '../utils/styles';
import {useSelector} from 'react-redux';

const PortfolioSummary = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;
  const fetchedData = useSelector(state => state.holdings.data);

  const handleToggleExpand = () => {
    const toValue = isExpanded ? 0 : 100;

    Animated.timing(heightAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsExpanded(!isExpanded);
    });
  };
  const renderRowItem = (left, right) => (
    <View style={styles.rowStyle}>
      <Text style={[globalStyle.titleTextStyle, styles.black]}>{left}:</Text>
      <Text style={globalStyle.mediumTextStyle}>₹ {right?.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={{paddingBottom: 20}}>
      <TouchableOpacity onPress={handleToggleExpand} style={styles.header}>
        <Text style={styles.headerText}>{isExpanded ? '▼' : '▲'}</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.expandedContent, {height: heightAnim}]}>
        {renderRowItem('Current Value', fetchedData?.totalCurrentValue)}
        {renderRowItem('Total Investment', fetchedData?.totalInvestmentValue)}
        {renderRowItem("Today's Profit & Loss", fetchedData?.todaysPNL)}
      </Animated.View>
      {renderRowItem('Profit & Loss', fetchedData?.totalPNL)}
    </View>
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  header: {alignItems: 'center'},
  headerText: {
    fontSize: 24,
    color: '#AF50DC',
    fontWeight: 'bold',
  },
  expandedContent: {
    overflow: 'hidden',
  },
  black: {color: 'black'},
});

export default PortfolioSummary;
