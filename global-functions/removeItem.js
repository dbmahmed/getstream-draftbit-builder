import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const removeItem = async key => {
  await AsyncStorage.removeItem(key);
};

export default removeItem;
