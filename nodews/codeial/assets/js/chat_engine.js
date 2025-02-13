class ChatEngine{
    constructor(chatBoxID, userEmail){
        this.chatBox = $(`#${chatBoxID}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://13.235.68.200:5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('Socket connection established!');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('A User Joined : ', data);
            });
        });

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            if(msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
                $('#chat-message-input').val('');
            }
        });

        self.socket.on('receive_message', function(data){
            // console.log('message received : ', data.message);
            let newMessage = $('<li>');
            let messageType = data.user_email == self.userEmail ? 'self-message' : 'other-message';
            newMessage.append($('<span>', {
                'html': data.message
            }));
            newMessage.append($('<sub>', {
                'html': data.user_email
            }));
            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
        })
    }
}