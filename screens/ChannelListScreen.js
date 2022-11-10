import React from 'react';
import * as CustomCode from '../custom-files/CustomCode.js';
import * as getStreamChatWrapper from '../custom-files/getStreamChatWrapper.js';
import * as Utils from '../utils';
import { ScreenContainer } from '@draftbit/ui';
import { StyleSheet, View } from 'react-native';

const ChannelListScreen = props => {
  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <Utils.CustomCodeErrorBoundary>
        <getStreamChatWrapper.GetStreamChatProvider>
          <View style={styles.View2200bac7} />
        </getStreamChatWrapper.GetStreamChatProvider>
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({ View2200bac7: { height: '100%' } });

export default ChannelListScreen;
