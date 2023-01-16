document.addEventListener('DOMContentLoaded', () =>{
  var socket = io.connect('http://' + document.domain + ':'+ location.port);
  let room;
  joinRoom('Lounge')
  // receives ,message from the server
  socket.on('message', function(data){
    const p = document.createElement('p');
    const span_username = document.createElement('span');
    const span_timestamp = document.createElement('span');
    const br = document.createElement('br');
    if (data.username) {
      span_username.innerHTML = data.username;
      span_timestamp.innerHTML = data.time_stamp;
      p.innerHTML = span_username.outerHTML + ':' + data.msg + br.outerHTML+ span_timestamp.outerHTML;
      var messageDisplay = document.querySelector('#message-display');
      messageDisplay.append(p);
    }else{
      systemMsg(data['msg']);
    }
  });
  
  //sends the message to the server
  var messageButton = document.querySelector('#message-button');
  var messageInput = document.querySelector('#message-input');
  messageButton.onclick = function(){
    socket.send({'msg': messageInput.value, 'username': username, 'room':room})
  };
  
  //room seleection 
  document.querySelectorAll('.select-room').forEach(p => {
    p.onclick = function(){
      let newRoom = p.innerHTML;
      if(newRoom == room){
        msg = `you are already in ${room} room.`;
        systemMsg(msg);
      }else{
        leaveRoom(room);
        joinRoom(newRoom);
        room = newRoom;
      };
    };
  });
  //leaving room
  function leaveRoom(room) {
    socket.emit('leave', {'username': username, 'room': room})
  };
  //joining room
  function joinRoom(room) {
    socket.emit('join', {'username': username, 'room': room})
    //clears the screen after user leaves a room
    document.querySelector('#message-display').innerHTML='';
  };
  //system Messsage
  function systemMsg(msg){
    p = document.createElement('p');
    p.innerHTML = msg;
    document.querySelector('#message-display').append(p); 
  }
});








function like(post_id) {
  const likeCount = document.getElementById(`likes-count-${post_id }`)
  const likeButton = document.getElementById(`like-icon-${post_id}`);

  fetch(`/like/${post_id}`, {method: 'POST'})
  .then((res) => res.json()).then((data) => {
      likeCount.innerHTML = data["likes"]
      if (data['liked'] == true) {
        likeButton.className = "fas fa-thumbs-up"
      }else{
        likeButton.className = "far fa-thumbs-up"
      }
  });
  console.log(likeCount.value);
};