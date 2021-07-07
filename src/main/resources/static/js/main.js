'use strict'

var usernamePage = document.querySelector('#username-Page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#messageInput');
var messageArea = ducument.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var username = null;


function connect(event) {

    username = document.querySelector('#name').value.trim();

    if (username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new Socket('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

function onConnected(){
    stompClient.subscribe('/topic/public', onMessageReceived)

    stompClient.send("/app/chat.addUser", {}, JSON.stringify({sender: username, type: 'JOIN'}))

    connectingElement.classList.add('hidden');
}

function onError(error) {
    
    connectingElement.textContent = 'Não foi possível conectar ao servidor WebSocket. Atualize esta página para tentar novamente!';
    connectingElement.getElementsByClassName.color = 'red';
}

usernameForm.addEventListener('submit', connect, true);