import React from 'react';
import * as SportsbettingAPIAuthEndpointsApi from '../apis/SportsbettingAPIAuthEndpointsApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as ChannelList from '../custom-files/ChannelList.js';
import * as CustomCode from '../custom-files/CustomCode.js';
import * as getStreamChatWrapper from '../custom-files/getStreamChatWrapper.js';
import * as Utils from '../utils';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

const ChannelListVaultScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const logToken = token => {
    return `token ${token}`;
  };

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        setGlobalVariableValue({
          key: 'USER',
          value: { id: 'ae23dc79-3690-48b1-8bcd-de7d4aa21274' },
        });
        const userToken =
          await SportsbettingAPIAuthEndpointsApi.getGetstreamTokenGET(
            Constants,
            { internalId: 'ae23dc79-3690-48b1-8bcd-de7d4aa21274' }
          );
        console.log(logToken(userToken));
        setGlobalVariableValue({
          key: 'GS_USER_TOKEN',
          value: userToken,
        });
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <Utils.CustomCodeErrorBoundary>
        <getStreamChatWrapper.GetStreamChatProvider>
          <View style={styles(theme).View2200bac7}>
            <Utils.CustomCodeErrorBoundary>
              <ChannelList.ChannelListMod navigation={props.navigation} />
            </Utils.CustomCodeErrorBoundary>
          </View>
        </getStreamChatWrapper.GetStreamChatProvider>
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

const styles = theme => StyleSheet.create({ View2200bac7: { height: '100%' } });

export default withTheme(ChannelListVaultScreen);
