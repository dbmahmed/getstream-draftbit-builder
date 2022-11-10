import { StreamChat } from 'stream-chat';
import { Streami18n } from 'stream-chat-expo';

const chatClient = StreamChat.getInstance('q3gtgpbkjzk7');

const filters = userId => ({
  members: { $in: [userId] },
  type: 'messaging',
});
const sort = { last_message_at: -1 };
const options = {
  state: true,
  watch: true,
};

const streami18n = new Streami18n({
  language: 'en',
});
export { streami18n, filters, sort, options, chatClient };
