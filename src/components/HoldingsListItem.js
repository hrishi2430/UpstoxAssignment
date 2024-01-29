import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import globalStyle from '../utils/styles';

const HoldingsListItem = ({item}) => {
  return (
    <View style={styles.inlineContent}>
      <View>
        <Text
          style={[
            globalStyle.normalTextStyle,
            globalStyle.boldFont,
            styles.spacing,
          ]}>
          {item.symbol}
        </Text>
        <Text style={globalStyle.normalTextStyle}>Qty: {item.quantity}</Text>
      </View>
      <View style={styles.alignRightEnd}>
        <Text style={[globalStyle.normalTextStyle, styles.spacing]}>
          LTP: ₹
          <Text style={globalStyle.boldFont}>{item?.ltp?.toFixed(2)}</Text>
        </Text>
        <Text style={globalStyle.normalTextStyle}>
          P/L: ₹
          <Text style={globalStyle.boldFont}>{item?.PNL?.toFixed(2)}</Text>
        </Text>
      </View>
    </View>
  );
};
HoldingsListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  inlineContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  alignRightEnd: {justifyContent: 'flex-end', alignItems: 'flex-end'},
  spacing: {
    paddingBottom: 12,
  },
});

export default HoldingsListItem;
