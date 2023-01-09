import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as ChannelList from '../custom-files/ChannelList.js';
import * as CustomCode from '../custom-files/CustomCode.js';
import * as getStreamChatWrapper from '../custom-files/getStreamChatWrapper.js';
import * as Utils from '../utils';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { StyleSheet, View } from 'react-native';

const ChannelListVaultScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const logToken = token => {
    return `token ${token}`;
  };

  const { theme } = props;

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <Utils.CustomCodeErrorBoundary>
        <getStreamChatWrapper.GetStreamChatProvider1>
          <View style={styles(theme).View2200bac7}>
            <Utils.CustomCodeErrorBoundary>
              <ChannelList.ChannelListMod
                navigation={props.navigation}
                filter={memoizedFilters}
              />
            </Utils.CustomCodeErrorBoundary>
          </View>
        </getStreamChatWrapper.GetStreamChatProvider1>
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

const styles = theme => StyleSheet.create({ View2200bac7: { height: '100%' } });

export default withTheme(ChannelListVaultScreen);
