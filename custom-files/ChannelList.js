import { ChannelList } from 'stream-chat-expo';

const sort = { last_message_at: -1 };
const options = {
  state: true,
  watch: true,
};

export const ChannelListMod = () => {
  const memoizedFilters = useMemo(
    () => ({
      example: 'example-apps',
      members: { $in: ['ron'] },
      type: 'messaging',
    }),
    []
  );
  return (
    <ChannelList filters={memoizedFilters} options={options} sort={sort} />
  );
};
