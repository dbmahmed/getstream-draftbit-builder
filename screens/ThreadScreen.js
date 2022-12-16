import React from 'react';
import * as CustomCode from '../custom-files/CustomCode.js';
import * as Thread from '../custom-files/Thread.js';
import * as getStreamChatWrapper from '../custom-files/getStreamChatWrapper.js';
import * as Utils from '../utils';
import { ScreenContainer, withTheme } from '@draftbit/ui';

const ThreadScreen = props => {
  const { theme } = props;

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <Utils.CustomCodeErrorBoundary>
        <getStreamChatWrapper.GetStreamChatProvider>
          <Thread.Screen />
        </getStreamChatWrapper.GetStreamChatProvider>
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(ThreadScreen);
