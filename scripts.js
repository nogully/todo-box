$('.save-button').on('click', function(){
  // finish this function
$('idea-card-wrap').prepend(`<article class="idea-card">
  <h1 class="user-idea"></h1>
  <label for="delete-button" hidden></label>
  <button id="delete-button"></button>
  <p class="user-idea-details"></p>
  <label for="upvote-button" hidden></label>
  <button id="upvote-button"></button>
  <label for="downvote-button" hidden></label>
  <button id="downvote-button"></button>
  <h2>quality: <span class="rating">swill</span></h2>
  <hr>
  </article>`)
}
