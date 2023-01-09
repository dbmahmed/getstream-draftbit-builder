import React from 'react';
import * as SportsbettingAPIAuthEndpointsApi from '../apis/SportsbettingAPIAuthEndpointsApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as ChannelList from '../custom-files/ChannelList.js';
import * as CustomCode from '../custom-files/CustomCode.js';
import * as getStreamChatWrapper from '../custom-files/getStreamChatWrapper.js';
import * as Utils from '../utils';
import {
  Button,
  Checkbox,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fetch } from 'react-request';

const ChannelListScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const applyUserFilter = query => {
    setFilteredUsers(() =>
      users.filter(prev => {
        // console.log(prev.toLowerCase().includes(query.toLowerCase()))

        return !query || prev.id.toLowerCase().includes(query.toLowerCase());
      })
    );
  };

  const setInitialFilter = Variables => {
    setMemoizedFilters({
      members: { $in: [Variables.USER.id] },
      type: 'messaging',
    });
  };

  const selectMember = memId => {
    if (newGroupMembers.includes(memId))
      setNewGroupMembers(prev => prev.filter(item => item !== memId));
    else setNewGroupMembers(prev => [...prev, memId]);
  };

  const isSelectedMember = memId => {
    return newGroupMembers.includes(memId);
  };

  const isChannelCreateable = () => {
    return newChannelName.length > 0 && newGroupMembers.length > 1;
  };

  const getSelectableUsers = (Variables, fetchedUsers) => {
    return fetchedUsers?.filter(item => item?.id !== Variables.USER.id);
  };

  const setFilter = (Variables, newVal) => {
    if (newVal)
      setMemoizedFilters(prev => ({
        ...prev,
        name: { $autocomplete: newVal },
      }));
    else
      setMemoizedFilters({
        members: { $in: [Variables.USER.id] },
        type: 'messaging',
      });
  };

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setInitialFilter(Variables);
      console.log(Constants['USER']);
      console.log(Constants['AUTH_HEADER']);
      selectMember(Constants['USER']?.id);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [filteredUsers, setFilteredUsers] = React.useState(users);
  const [isCreating, setIsCreating] = React.useState(false);
  const [memoizedFilters, setMemoizedFilters] = React.useState({});
  const [newChannelName, setNewChannelName] = React.useState('');
  const [newGroupMembers, setNewGroupMembers] = React.useState([]);
  const [showUserModal, setShowUserModal] = React.useState(true);
  const [textInputValue, setTextInputValue] = React.useState('');
  const [textInputValue2, setTextInputValue2] = React.useState('');
  const [userSearch, setUserSearch] = React.useState('');
  const [users, setUsers] = React.useState([]);

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
                setFilter(Variables, newTextInputValue);
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
            <View style={styles(theme).View5448e69e}>
              {/* Name Container */}
              <View>
                <TextInput
                  onChangeText={newTextInputValue => {
                    try {
                      setNewChannelName(newTextInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={styles(theme).TextInput03ad5433}
                  placeholder={'Channel Name'}
                  value={newChannelName}
                  autoCapitalize={'none'}
                />
              </View>
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

              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps={'never'}
              >
                {/* Stream Users */}
                <SportsbettingAPIAuthEndpointsApi.FetchGetStreamUsersGET
                  onData={streamUsersData => {
                    try {
                      const valueJV5ptm6u = getSelectableUsers(
                        Variables,
                        streamUsersData?.users
                      );
                      setUsers(valueJV5ptm6u);
                      const fetchedUsers = valueJV5ptm6u;
                      setFilteredUsers(fetchedUsers);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {({ loading, error, data, refetchGetStreamUsers }) => {
                    const streamUsersData = data;
                    if (!streamUsersData || loading) {
                      return <ActivityIndicator />;
                    }

                    if (error) {
                      return (
                        <Text style={{ textAlign: 'center' }}>
                          There was a problem fetching this data
                        </Text>
                      );
                    }

                    return (
                      <>
                        {/* Empty */}
                        <>
                          {filteredUsers?.length ? null : (
                            <View>
                              <Text style={styles(theme).Texte9f9757c}>
                                {'No User Found'}
                              </Text>
                            </View>
                          )}
                        </>
                        <FlatList
                          data={filteredUsers}
                          listKey={'t0ibAKti'}
                          keyExtractor={listData => listData}
                          renderItem={({ item }) => {
                            const listData = item;
                            return (
                              <>
                                {/* row */}
                                <>
                                  {!filteredUsers?.length ? null : (
                                    <View style={styles(theme).Viewa1ae5f62}>
                                      <Checkbox
                                        onPress={newCheckboxValue => {
                                          const checkboxValue =
                                            newCheckboxValue;
                                          try {
                                            selectMember(listData?.id);
                                          } catch (err) {
                                            console.error(err);
                                          }
                                        }}
                                        checkedIcon={'AntDesign/checksquare'}
                                        defaultValue={isSelectedMember(
                                          listData?.id
                                        )}
                                      />
                                      {/* active */}
                                      <>
                                        {!listData?.online ? null : (
                                          <Icon
                                            size={24}
                                            name={'FontAwesome/circle'}
                                            color={theme.colors['Custom Color']}
                                          />
                                        )}
                                      </>
                                      {/* inactive */}
                                      <>
                                        {listData?.online ? null : (
                                          <Icon
                                            size={24}
                                            name={'FontAwesome/circle-o'}
                                            color={theme.colors['Medium']}
                                          />
                                        )}
                                      </>
                                      <Text
                                        style={styles(theme).Texte9f9757c}
                                        numberOfLines={2}
                                        textBreakStrategy={'simple'}
                                      >
                                        {listData?.id}
                                      </Text>
                                    </View>
                                  )}
                                </>
                              </>
                            );
                          }}
                          style={styles(theme).FlatList989db244}
                          contentContainerStyle={
                            styles(theme).FlatListc992f941Content
                          }
                          numColumns={1}
                        />
                      </>
                    );
                  }}
                </SportsbettingAPIAuthEndpointsApi.FetchGetStreamUsersGET>
              </KeyboardAwareScrollView>
              {/* Action */}
              <View style={styles(theme).View56e67461}>
                {/* Create */}
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        setIsCreating(true);
                        const createRes =
                          await SportsbettingAPIAuthEndpointsApi.createChannelPOST(
                            Constants,
                            {
                              channelName: newChannelName,
                              creatorId: Constants['USER']?.id,
                              members: newGroupMembers,
                            }
                          );
                        console.log(createRes);
                        setIsCreating(false);
                        setShowUserModal(false);
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={styles(theme).Button2d5f6a36}
                  disabled={!isChannelCreateable()}
                  loading={isCreating}
                  title={'Create'}
                />
                {/* Cancel */}
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
    Fetch431eb058: { minHeight: 40 },
    FlatListc992f941Content: { flex: 1 },
    Icon9d0ad012: { marginTop: 5 },
    TextInput03ad5433: {
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
    },
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
    View5448e69e: {
      backgroundColor: theme.colors['Background'],
      height: '75%',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      width: '85%',
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
    Viewa1ae5f62: {
      borderBottomWidth: 1,
      borderColor: theme.colors['Light'],
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      flexDirection: 'row',
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 5,
      paddingTop: 5,
    },
    Viewa766fe55: { paddingBottom: 20, paddingTop: 15 },
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
