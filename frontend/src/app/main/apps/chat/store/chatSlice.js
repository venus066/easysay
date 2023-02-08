import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {setSelectedContactId} from './contactsSlice';
import {closeMobileChatsSidebar} from './sidebarsSlice';
import {updateUserChatList} from './userSlice';

export const getChat = createAsyncThunk(
  'chatApp/chat/getChat',
  async ({ contactId, isMobile }, { dispatch, getState }) => {
    const { id: userId } = getState().chatApp.user;
    const response = await axios.post('/api/chat/get-chat', {
      params: {
        contactId,
        userId,
      },
    });

    const { chat, userChatList } = await response.data;

    dispatch(setSelectedContactId(contactId));
    dispatch(updateUserChatList(userChatList));

    if (isMobile) {
      dispatch(closeMobileChatsSidebar());
    }

    return chat;
  }
);

export const sendMessage = createAsyncThunk(
  'chatApp/chat/sendMessage',
  async ({ messageText, chatId, contactId }, { dispatch, getState }) => {
    const message = {
      who: getState().chatApp.user.id,
      message: messageText,
      time: new Date()
    };

    /*const chat = getState().chatApp.chat;
    chat.dialog = [...chat.dialog, message];

    const chatList = getState().chatApp.user.chatList;
    const userChatList = [
        ...chatList
    ];
    userChatList[0].lastMessageTime = message.time.toISOString();

    dispatch(updateUserChatList(userChatList));*/

    dispatch(
      receiveMessage({
        messageText,
        chatId,
        contactId,
      })
    );

    return message;
  }
);

export const receiveMessage = createAsyncThunk(
  'chatApp/chat/receiveMessage',
  async ({ messageText, chatId, contactId }, { dispatch, getState }) => {
    const response = await axios.post(`/api/completion`, {
    // const response = await axios.post('http://35.90.249.133:5000/api/completion', {
    // const response = await axios.post('http://localhost:5000/api/completion', {
      prompt: messageText,
    });

    const responseText = response.data.bot.trim();
    console.log('responseText', responseText);
    const message = {
        message: responseText,
        who: contactId,
        time: new Date(),
    };

    /*const chat = getState().chatApp.chat;
    chat.dialog = [...chat.dialog, message];

    const userChatList = getState().chatApp.user.chatList;
    userChatList[0].lastMessageTime = message.time.toISOString();

    dispatch(updateUserChatList(userChatList));*/

    /*dispatch(
      getChat({
        contactId,
      })
    );*/

    return message;
  }
);

const chatSlice = createSlice({
  name: 'chatApp/chat',
  initialState: null,
  reducers: {
    removeChat: (state, action) => action.payload,
  },
  extraReducers: {
    [getChat.fulfilled]: (state, action) => action.payload,
    [sendMessage.fulfilled]: (state, action) => {
      state.dialog = [...state.dialog, action.payload];
    },
    [receiveMessage.fulfilled]: (state, action) => {
      state.dialog = [...state.dialog, action.payload];
    },
  },
});

export default chatSlice.reducer;
