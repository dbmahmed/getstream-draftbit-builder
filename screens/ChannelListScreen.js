import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as ChannelList from '../custom-files/ChannelList.js';
import * as CustomCode from '../custom-files/CustomCode.js';
import * as getStreamChatWrapper from '../custom-files/getStreamChatWrapper.js';
import * as Utils from '../utils';
import {
  Button,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const ChannelListScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const setFilter = newVal => {
    setMemoizedFilters(prev => ({
      ...prev,
      name: { $in: [newVal] },
    }));
  };

  const setInitialFilter = Variables => {
    setMemoizedFilters({
      members: { $in: [Variables.USER.id] },
      type: 'messaging',
    });
  };

  const applyUserFilter = query => {
    setFilteredUsers(() =>
      users.filter(prev => {
        console.log(prev.toLowerCase().includes(query.toLowerCase()));

        return prev.toLowerCase().includes(query.toLowerCase());
      })
    );
  };

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setInitialFilter(Variables);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [filteredUsers, setFilteredUsers] = React.useState(users);
  const [memoizedFilters, setMemoizedFilters] = React.useState({});
  const [showUserModal, setShowUserModal] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
  const [userSearch, setUserSearch] = React.useState('');
  const [users, setUsers] = React.useState(['rima', 'billi', 'mishu']);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
    >
      <View style={styles(theme).View09806914}>
        <Icon size={24} name={'Feather/menu'} />
        <Touchable
          onPress={() => {
            try {
              setShowUserModal(true);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Icon size={24} name={'AntDesign/addusergroup'} />
        </Touchable>
      </View>
      {/* SearchBar */}
      <View style={styles(theme).View05ddd90c}>
        {/* container */}
        <View style={styles(theme).Viewfb9b4af6}>
          <View style={styles(theme).View3232fd8e}>
            <Icon
              style={styles(theme).Icon9d0ad012}
              name={'Feather/search'}
              size={28}
            />
          </View>
          <TextInput
            onChangeText={newTextInputValue => {
              try {
                setTextInputValue(newTextInputValue);
                setFilter(newTextInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles(theme).TextInputbc061578}
            value={textInputValue}
            editable={true}
            placeholder={'Enter a value...'}
            placeholderTextColor={theme.colors['Light Inverse']}
          />
        </View>
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
      {/* User Modal */}
      <>
        {!showUserModal ? null : (
          <View style={styles(theme).View5c2056e9}>
            {/* Container */}
            <View style={styles(theme).Viewb2b90115}>
              {/* SearchBar */}
              <View style={styles(theme).Viewa766fe55}>
                {/* container */}
                <View style={styles(theme).Viewfb9b4af6}>
                  <View style={styles(theme).View47f15540}>
                    <Icon name={'Feather/search'} size={16} />
                  </View>
                  <TextInput
                    onChangeText={newTextInputValue => {
                      try {
                        setUserSearch(newTextInputValue);
                        applyUserFilter(newTextInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={styles(theme).TextInputbc061578}
                    value={userSearch}
                    editable={true}
                    placeholder={'Enter a value...'}
                    placeholderTextColor={theme.colors['Light Inverse']}
                  />
                </View>
              </View>
              <FlatList
                data={filteredUsers}
                listKey={'t0ibAKti'}
                keyExtractor={listData => listData}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <>
                      {/* row */}
                      <View style={styles(theme).Viewbddde8cc}>
                        <Text style={styles(theme).Texte9f9757c}>
                          {listData}
                        </Text>
                      </View>
                    </>
                  );
                }}
                style={styles(theme).FlatList989db244}
                contentContainerStyle={styles(theme).FlatListc992f941Content}
                numColumns={1}
              />
              {/* Action */}
              <View style={styles(theme).View56e67461}>
                <Button style={styles(theme).Button2d5f6a36} title={'Create'} />
                <Button
                  onPress={() => {
                    try {
                      setShowUserModal(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={styles(theme).Button3fb1b360}
                  title={'Cancel'}
                />
              </View>
            </View>
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

const styles = theme =>
  StyleSheet.create({
    Button2d5f6a36: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      textAlign: 'center',
    },
    Button3fb1b360: {
      backgroundColor: theme.colors['Error'],
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      textAlign: 'center',
    },
    FlatListc992f941Content: { flex: 1 },
    Icon9d0ad012: { marginTop: 5 },
    TextInputbc061578: {
      backgroundColor: theme.colors['Light'],
      borderBottomRightRadius: 8,
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderRightWidth: 1,
      borderTopRightRadius: 8,
      borderTopWidth: 1,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
      width: '90%',
    },
    Texte9f9757c: { color: theme.colors.strong },
    View05ddd90c: {
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 15,
    },
    View09806914: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 5,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 25,
    },
    View2200bac7: { height: '100%' },
    View3232fd8e: {
      borderBottomLeftRadius: 8,
      borderBottomWidth: 1,
      borderColor: theme.colors['Background'],
      borderLeftWidth: 1,
      borderTopLeftRadius: 8,
      borderTopWidth: 1,
      flex: 1,
      height: '100%',
    },
    View47f15540: {
      borderBottomLeftRadius: 8,
      borderBottomWidth: 1,
      borderColor: theme.colors['Background'],
      borderLeftWidth: 1,
      borderTopLeftRadius: 8,
      borderTopWidth: 1,
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      paddingLeft: 4,
    },
    View56e67461: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 20,
    },
    View5c2056e9: {
      alignItems: 'center',
      backgroundColor: theme.colors['Strong'],
      height: '100%',
      justifyContent: 'center',
      opacity: 1,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    Viewa766fe55: { paddingBottom: 20, paddingTop: 15 },
    Viewb2b90115: {
      backgroundColor: theme.colors['Background'],
      height: '65%',
      paddingLeft: 20,
      paddingRight: 20,
      width: '85%',
    },
    Viewbddde8cc: {
      borderBottomWidth: 1,
      borderColor: theme.colors['Light'],
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingTop: 5,
    },
    Viewfb9b4af6: {
      alignItems: 'center',
      backgroundColor: theme.colors['Light'],
      borderRadius: 13,
      flexDirection: 'row',
      height: 65,
      justifyContent: 'space-around',
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
    },
  });

export default withTheme(ChannelListScreen);
