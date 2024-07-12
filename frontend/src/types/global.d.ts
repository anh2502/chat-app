type ConversationType = {
	id: string;
	fullName: string;
	profilePic: string;
};
type MessageType = {
	id: string;
	body: string;
	senderId: string;
	createAt: string;
	shouldShake?: boolean;
};