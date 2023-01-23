import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import mock from '../mock';

const chatDb = {
	contacts: [
		{
			id: '5725a680b3249760ea21de52',
			name: 'AI Assistant',
			avatar: 'assets/images/avatars/ai.png',
			status: 'online',
			mood: 'Have a good day',
			// unread: '2'
		}
	],
	chats: [
		{
			id: '1725a680b3249760ea21de52',
			dialog: [

			]
		}
	],
	user: [
		{
			id: '5725a6802d10e277a0f35724',
			name: 'Joseph Brown',
			avatar: 'assets/images/avatars/profile.jpg',
			status: 'online',
			mood: "it's a status....not your diary...",
			chatList: [
				{
					chatId: '1725a680b3249760ea21de52',
					contactId: '5725a680b3249760ea21de52',
					lastMessageTime: '2021-06-12T02:10:18.931Z'
				}
			]
		}
	]
};

mock.onGet('/api/chat/contacts').reply(config => {
	return [200, chatDb.contacts];
});

mock.onGet('/api/chat/get-chat').reply(request => {
	const { contactId, userId } = request.params;
	const user = chatDb.user.find(_user => _user.id === userId);

	const userChat = user.chatList.find(_chat => _chat.contactId === contactId);
	const chatId = userChat ? userChat.chatId : createNewChat(contactId, userId);

	return [
		200,
		{
			chat: chatDb.chats.find(_chat => _chat.id === chatId),
			userChatList: user.chatList
		}
	];
});

mock.onGet('/api/chat/user').reply(config => {
	return [200, chatDb.user[0]];
});

mock.onPost('/api/chat/user/data').reply(request => {
	const data = JSON.parse(request.data);
	chatDb.user[0] = _.merge({}, chatDb.user[0], data);
	return [200, chatDb.user[0]];
});

function createNewChat(contactId, userId) {
	const user = chatDb.user.find(_user => _user.id === userId);
	const chatId = FuseUtils.generateGUID();
	user.chatList = [
		{
			chatId,
			contactId,
			lastMessageTime: ''
		},
		...chatDb.user[0].chatList
	];
	chatDb.chats = [
		...chatDb.chats,
		{
			id: chatId,
			dialog: []
		}
	];
	return chatId;
}

mock.onPost('/api/chat/send-message').reply(request => {
	const data = JSON.parse(request.data);
	const { chatId, messageText, contactId } = data;
	const message = {
		who: chatDb.user[0].id,
		message: messageText,
		time: new Date()
	};

	const chat = chatDb.chats.find(_chat => _chat.id === chatId);
	chat.dialog = [...chat.dialog, message];

	chatDb.user[0].chatList.find(_contact => _contact.contactId === contactId).lastMessageTime = message.time;

	return [
		200,
		{
			message,
			userChatList: chatDb.user[0].chatList
		}
	];
});

mock.onPost('/api/chat/receive-message').reply(request => {
	const data = JSON.parse(request.data);
	const { chatId, messageText, contactId } = data;
	const message = {
		who: contactId,
		message: messageText,
		time: new Date()
	};
	console.log('receive-message:', message.time);
	const chat = chatDb.chats.find(_chat => _chat.id === chatId);
	chat.dialog = [...chat.dialog, message];

	return [
		200,
		{
			message,
			userChatList: chatDb.user[0].chatList
		}
	];
});
