import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export default setItem;
