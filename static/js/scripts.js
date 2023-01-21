document.addEventListener('DOMContentLoaded', () =>{
  var socket = io.connect('http://' + document.domain + ':'+ location.port);
  let room;
  joinRoom('Lounge')
  // receives ,message from the server
  socket.on('message', function(data){
    const p = document.createElement('p');
    const span_username = document.createElement('span');
    const span_timestamp = document.createElement('small');
    const span_user_img = document.createElement('img');
    const br = document.createElement('br');
    const hr = document.createElement('hr');
    if (data.username) {
      span_username.innerHTML = data.username;
      span_user_img.src = `../../static/assets/profile_img/${  data.profileImg.slice(1)}`;
      span_user_img.style = "height:30px; width:30px; border-radius:50%; float:right;";
      
      span_timestamp.innerHTML = data.time_stamp;
      span_timestamp.class = "msg_time";
      p.innerHTML = span_username.outerHTML +span_user_img.outerHTML+ hr.outerHTML + data.msg + br.outerHTML +  span_timestamp.outerHTML + br.outerHTML ;
      var messageDisplay = document.querySelector('#message-display');
      var timeDisplay = document.querySelector('.msg_time');
      messageDisplay.append(p);
      //timeDisplay.append(span_timestamp);
    span_user_img.onclick = function() {
      alert('i was clicked');
    };
      
    }else{
      systemMsg(data['msg']);
    }
  });
  
  //sends the message to the server
  var messageButton = document.querySelector('#message-button');
  var messageInput = document.querySelector('#message-input');
  messageButton.onclick = function(){
    socket.send({'msg': messageInput.value, 'username': username,'profileImg': profileImg, 'room':room});
    messageInput.value = ''
  };
  
  //room seleection 
  document.querySelectorAll('.select-room').forEach(p => {
    p.onclick = function(){
      let newRoom = p.innerHTML;
      p.class = '.active';
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
    document.querySelector('.system-msg').innerHTML = ''; 
  };
  //system Messsage
  function systemMsg(msg){
    h5 = document.createElement('h5');
    h5.innerHTML = msg;
    document.querySelector('.system-msg').append(h5); 
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