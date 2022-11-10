import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async (key, defaultValue) => {
  const value = await AsyncStorage.getItem(key);
  if (!value) return defaultValue;
  return JSON.parse(value);
};

export default getItem;
