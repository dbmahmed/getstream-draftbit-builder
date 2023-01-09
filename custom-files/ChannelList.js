import { ChannelList } from 'stream-chat-expo';
import * as GlobalVariables from '../config/GlobalVariableContext';

const sort = { last_message_at: -1 };
const options = {
  state: true,
  watch: true,
};

export const ChannelListMod = ({ navigation, filter }) => {
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
