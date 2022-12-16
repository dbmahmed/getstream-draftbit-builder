import { ChannelList } from 'stream-chat-expo';
import { useMemo } from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';

const sort = { last_message_at: -1 };
const options = {
  state: true,
  watch: true,
};

export const ChannelListMod = ({ navigation, filter }) => {
  const variables = GlobalVariables.useValues();
  const setVariables = GlobalVariables.useSetValue();

  const setChannel = c => setVariables({ key: 'CHANNEL', value: c });

  return (
    <ChannelList
      filters={filter}
      options={options}
      sort={sort}
      onSelect={channel => {
        setChannel(channel);
        navigation.navigate('ChannelScreen');
      }}
    />
  );
};
