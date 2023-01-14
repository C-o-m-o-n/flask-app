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