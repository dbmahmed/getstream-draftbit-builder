import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as ChannelList from '../custom-files/ChannelList.js';
import * as CustomCode from '../custom-files/CustomCode.js';
import * as getStreamChatWrapper from '../custom-files/getStreamChatWrapper.js';
import * as Utils from '../utils';
import { Icon, ScreenContainer, withTheme } from '@draftbit/ui';
import { StyleSheet, TextInput, View } from 'react-native';

const ChannelListScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const memoizedFilters = React.useMemo(
    () => ({
      example: Variables.APP_ID,
      members: { $in: [Variables.USER.id] },
      // member: { user: { name: { $autocomplete: [variables.USER.id] } } },
      name: { $in: ['TestChannel1'] },
      type: 'messaging',
    }),
    []
  );
  const { theme } = props;

  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      {/* SearchBar */}
      <View style={styles(theme).View306720b5}>
        {/* container */}
        <View style={styles(theme).View4682f1d8}>
          <Icon size={24} name={'Feather/search'} />
          <TextInput
            onChangeText={newTextInputValue => {
              try {
                setTextInputValue(newTextInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles(theme).TextInput3049cea1}
            value={textInputValue}
            editable={true}
            placeholder={'Enter a value...'}
            placeholderTextColor={theme.colors['Light Inverse']}
          />
        </View>
        <Utils.CustomCodeErrorBoundary>
          <getStreamChatWrapper.GetStreamChatProvider>
            <View style={styles(theme).View2200bac7}>
              <Utils.CustomCodeErrorBoundary>
                <ChannelList.ChannelListMod
                  navigation={props.navigation}
                  filter={memoizedFilters}
                />
              </Utils.CustomCodeErrorBoundary>
            </View>
          </getStreamChatWrapper.GetStreamChatProvider>
        </Utils.CustomCodeErrorBoundary>
      </View>
    </ScreenContainer>
  );
};

const styles = theme =>
  StyleSheet.create({
    TextInput3049cea1: {
      backgroundColor: theme.colors['Light'],
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
      width: '90%',
    },
    View2200bac7: { height: '100%' },
    View306720b5: {
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 30,
    },
    View4682f1d8: {
      alignItems: 'center',
      backgroundColor: theme.colors['Light'],
      borderRadius: 13,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 0,
      paddingTop: 10,
    },
  });

export default withTheme(ChannelListScreen);
