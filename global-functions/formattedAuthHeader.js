import React from 'react';

const formattedAuthHeader = token => {
  return `Bearer ${token}`;
};

export default formattedAuthHeader;
