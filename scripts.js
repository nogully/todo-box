$(document).ready(populateExistingCards);
$('.save-button').on('click', submitCard)

function CardObject (title, idea, id) {
  this.title = title;
  this.idea = idea;
  this.id = id;
  this.counter = 0;
};
var ratingArray = ['swill', 'plausible', 'genius'];


function populateExistingCards () {
  for (let i = 0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  createCard(parsedObject.id, parsedObject.title, parsedObject.idea, parsedObject.counter);
  };
};

function submitCard() {
   event.preventDefault();
  var titleInput = $('#title-input').val();
  var ideaInput = $('#idea-input').val();
  var dateNow = Date.now();
  createCard(dateNow, titleInput, ideaInput);
  $('form')[0].reset();
  disableSaveButton();
  sendCardToLocalStorage(titleInput, ideaInput, dateNow);
};
 

// function submitCard() 

$(window).on('keydown', function() {
  if (($('#title-input').val() !== '') && ($('#idea-input').val() !== '')) {
    enableSaveButton();
    console.log('hi');
  } else {
    disableSaveButton();
  };
});

$('.idea-card-wrap').on('click', '.upvote-button', function() {
  var clickedCardId = $(this).parent('article').attr('id');
  var theObject = localStorage.getItem(clickedCardId);
  var parsedTheObject = JSON.parse(theObject);
  $(this).siblings('.downvote-button').removeAttr('disabled');
  if (parsedTheObject.counter === 2) {
    $(this).attr('disabled', true);
  } else {
    parsedTheObject.counter++;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedTheObject.counter]);
    var stringifiedTheObject = JSON.stringify(parsedTheObject);
    localStorage.setItem(clickedCardId, stringifiedTheObject);
  };
});

$('.idea-card-wrap').on('click', '.downvote-button', function() {
  var clickedCardId = $(this).parent('article').attr('id');
  var theObject = localStorage.getItem(clickedCardId);
  var parsedTheObject = JSON.parse(theObject);
  $(this).siblings('.upvote-button').removeAttr('disabled');
  if (parsedTheObject.counter === 0) {
    $(this).attr('disabled', true);
  } else {
    parsedTheObject.counter--;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedTheObject.counter]);
    var stringifiedTheObject = JSON.stringify(parsedTheObject);
    localStorage.setItem(clickedCardId, stringifiedTheObject);
  };
});

$('.idea-card-wrap').on('click', '.delete-button', function(event) {
  deleteCard(event);
});

$('.idea-card-wrap').on('blur', 'p', function(event){
  persistTextEdit(event);
});

$('.idea-card-wrap').on('blur', 'h1', function(event){
  persistTitleEdit(event);
});

$('#search-box').on('keyup', function() {
  $('article').remove();
  arrayOfLocalStorage();
});

function arrayOfLocalStorage() {
  var newArray = [];
  for (let i = 0; i < localStorage.length; i++) {
    var retrievedObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrievedObject);
    newArray.push(parsedObject);
  };
  runSearch(newArray);
};

function createCard(id,title,idea,counter = 0) {
  $('.idea-card-wrap').prepend(`<article id="${id}" class="idea-card">
  <h1 class="user-idea" contenteditable="true">${title}</h1>
  <button class="delete-button" aria-label="Delete Button"></button>
  <p class="user-idea-details" contenteditable="true">${idea}</p>
  <button class="upvote-button" aria-label="upvote button"></button>
  <button class="downvote-button" aria-label="downvote button"></button>
  <h2>quality: <span class="rating">${ratingArray[counter]}</span></h2>
  <hr>
  </article>`);
};

function deleteCard(event) {
  var parentArticle = $(event.target).closest('article');
  var id = parentArticle.prop('id');
  parentArticle.remove();
  localStorage.removeItem(id);
};

function disableSaveButton() {
  $('.save-button').attr('disabled', true);
};

function enableSaveButton() {
  $('.save-button').removeAttr('disabled');
};

function persistTextEdit(event) {
  var parentArticle = $(event.target).closest('article');
  var id = parentArticle.prop('id');
  var newText = parentArticle.children('p').text();
  var objectFromLocal = localStorage.getItem(id);
  var object = JSON.parse(objectFromLocal);
  object.idea = newText;
  var objectString = JSON.stringify(object);
  localStorage.setItem(id, objectString);
};

function persistTitleEdit(event) {
  var parentArticle = $(event.target).closest('article');
  var id = parentArticle.prop('id');
  var newTitle = parentArticle.children('h1').text();
  var objectFromLocal = localStorage.getItem(id);
  var object = JSON.parse(objectFromLocal);
  object.title = newTitle;
  var objectString = JSON.stringify(object);
  localStorage.setItem(id, objectString);
};

function printSearchResults(searchedArray) {
  searchedArray.forEach(function(result) {
    createCard(result.id,result.title,result.idea,result.counter);
  });
};

function runSearch(newArray) {
  var searchInput = $('#search-box').val().toUpperCase();
  var searchedArray = newArray.filter(function(card) {
    return card.title.toUpperCase().includes(searchInput) || card.idea.toUpperCase().includes(searchInput);
  });
  printSearchResults(searchedArray);
};

function sendCardToLocalStorage(titleInput, ideaInput, dateNow){
  var cardObject = new CardObject(titleInput, ideaInput, dateNow);
  var stringCardObject = JSON.stringify(cardObject);
  localStorage.setItem(dateNow, stringCardObject);
};