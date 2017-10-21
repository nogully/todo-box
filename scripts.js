// Create Cards

$('.save-button').on('click', function(event) {
  event.preventDefault();
  var titleInput = $('#title-input').val();
  var ideaInput = $('#idea-input').val();
  $('.idea-card-wrap').prepend(`<article id="${Date.now()}" class="idea-card">
    <h1 class="user-idea">${titleInput}</h1>
    <label for="delete-button" hidden></label>
    <button class="delete-button"></button>
    <p class="user-idea-details">${ideaInput}</p>
    <label for="upvote-button" hidden></label>
    <button class="upvote-button"></button>
    <label for="downvote-button" hidden></label>
    <button class="downvote-button"></button>
    <h2>quality: <span class="rating">Swill</span></h2>
    <hr>
    </article>`);
  // ask about this
  $('form')[0].reset();
  // It works, but is it wrong?
  
  });

// Delete Cards

$('.idea-card-wrap').on('click', '.delete-button', function() {
  $(this).parent('article').remove();
})

var ratingArray = ['Swill', 'Plausible', 'Genius'];


var counter = 0;

$('.idea-card-wrap').on('click', function(event) {
  if ($(event.target).is('.upvote-button')) {
    console.log('clicked upvote-button')
    $(this).find('.downvote-button').removeAttr('disabled');
    console.log(this)
    if (counter === 2) {
      console.log($(this), this)
      $(this).find('.upvote-button').attr('disabled', true);
    } else {
      counter++;
      $(this).find('.rating').text(ratingArray[counter]);
      console.log(counter)
      return counter;
    };
  } else if ($(event.target).is('.downvote-button')) {
    $(this).find('.upvote-button').removeAttr('disabled');
    if (counter === 0) {
      $(this).find('.downvote-button').attr('disabled', true);
    } else {
      counter--;
      $(this).find('.rating').text(ratingArray[counter]);
      return counter;
    };
  };
});


// Individual ratings, disable hits all cards

// $('.idea-card-wrap').on('click', '.upvote-button', function() {
//   counter = 0
//   console.log($(this).siblings('.downvote-button'))
//   $(this).siblings('.downvote-button').removeAttr('disabled');
//   if (counter === 2) {
//     $(this).attr('disabled', true);
//   } else {
//     counter++;
//     $(this).siblings('h2').find('.rating').text(ratingArray[counter]);

//     return counter;
//   };
// });

// $('.idea-card-wrap').on('click', '.downvote-button', function() {

//   $(this).siblings('.upvote-button').removeAttr('disabled');
//   if (counter === 0) {
//     $(this).attr('disabled', true);
//   } else {
//     counter--;
//     $(this).siblings('h2').find('.rating').text(ratingArray[counter]);
//     return counter;
//   };
// });

// Ratings move YAY


// $('.idea-card-wrap').on('click', '.upvote-button', function() {
//   $('.downvote-button').removeAttr('disabled');
//   if (counter === 2) {
//     $(this).attr('disabled', true);
//   } else {
//     counter++;
//     $('.rating').text(ratingArray[counter]);
//     return counter;
//   };
// });

// $('.idea-card-wrap').on('click', '.downvote-button', function() {
//   $('.upvote-button').removeAttr('disabled');
//   if (counter === 0) {
//     $(this).attr('disabled', true);
//   } else {
//     counter--;
//     $('.rating').text(ratingArray[counter]);
//     return counter;
//   };
// });