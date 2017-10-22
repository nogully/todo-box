// Create Cards

$('.save-button').on('click', function(event) {
  event.preventDefault();
  var titleInput = $('#title-input').val();
  var ideaInput = $('#idea-input').val();
  $('.idea-card-wrap').prepend(`<article id="${Date.now()}" class="idea-card">
    <h1 class="user-idea">${titleInput}</h1>
    <label for="delete-button" hidden></label>
    <button class="delete-button"></button>
    <p class="user-idea-details" contenteditable="true">${ideaInput}</p>
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


$('.idea-card-wrap').on('click', '.upvote-button', function() {
  var rating = $(this).siblings('h2').find('.rating');
  console.log(rating)
  if (rating.text() === 'Swill') {
    rating.text('Plausible');
  } else if (rating.text() === 'Plausible') {
    rating.text('Genius');
  };
});

$('.idea-card-wrap').on('click', '.downvote-button', function() {
  var rating = $(this).siblings('h2').find('.rating');
  console.log(rating)
  if (rating.text() === 'Genius') {
    rating.text('Plausible');
  } else if (rating.text() === 'Plausible') {
    rating.text('Swill');
  };
});


//FOR WHEN WE'RE USING LOCAL STORAGE???? Find Adam and Amy mod 3
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

// var ratingArray = ['Swill', 'Plausible', 'Genius'];


// var counter = 0;
