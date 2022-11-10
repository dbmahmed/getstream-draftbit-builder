import { ChannelList } from 'stream-chat-expo';
import { useMemo } from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';

const sort = { last_message_at: -1 };
const options = {
  state: true,
  watch: true,
};

export const ChannelListMod = ({ navigation }) => {
  const variables = GlobalVariables.useValues();
  const memoizedFilters = useMemo(
    () => ({
      example: 'example-apps',
      members: { $in: [variables.USER.id] },
      type: 'messaging',
    }),
    []
  );
  return (
    <ChannelList
      filters={memoizedFilters}
      options={options}
      sort={sort}
      onSelect={channel => {
        setChannel(channel);
        navigation.navigate('Channel');
      }}
    />
  );
};
