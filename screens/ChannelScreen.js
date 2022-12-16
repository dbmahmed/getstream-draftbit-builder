import React from 'react';
import * as Channel from '../custom-files/Channel.js';
import * as CustomCode from '../custom-files/CustomCode.js';
import * as getStreamChatWrapper from '../custom-files/getStreamChatWrapper.js';
import * as Utils from '../utils';
import { ScreenContainer, withTheme } from '@draftbit/ui';

const ChannelScreen = props => {
  const { theme } = props;

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <Utils.CustomCodeErrorBoundary>
        <getStreamChatWrapper.GetStreamChatProvider>
          <Channel.ChannelMod navigation={props.navigation} />
        </getStreamChatWrapper.GetStreamChatProvider>
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(ChannelScreen);
