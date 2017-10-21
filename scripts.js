$('.save-button').on('click', function(event) {
  event.preventDefault();
  var titleInput = $('#title-input').val();
  var ideaInput = $('#idea-input').val();
  $('.idea-card-wrap').prepend(`<article class="idea-card">
    <h1 class="user-idea">${titleInput}</h1>
    <label for="delete-button" hidden></label>
    <button id="delete-button"></button>
    <p class="user-idea-details">${ideaInput}</p>
    <label for="upvote-button" hidden></label>
    <button id="upvote-button"></button>
    <label for="downvote-button" hidden></label>
    <button id="downvote-button"></button>
    <h2>quality: <span class="rating">swill</span></h2>
    <hr>
    </article>`);
  });
