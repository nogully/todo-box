$(document).ready(populateExistingCards);
$('.save-button').on('click', submitCard);
$('.idea-card-wrap').on('click', '.delete-button', deleteCard);
$('.idea-card-wrap').on('blur', 'p', persistTextEdit);
$('.idea-card-wrap').on('blur', 'h1', persistTitleEdit);
$(window).on('keydown', enableDisableButton);
$('.idea-card-wrap').on('click', '.upvote-button', upvoteValue);
$('.idea-card-wrap').on('click', '.downvote-button', downvoteValue); 
$('#search-box').on('keyup', searchCards);

function searchCards() {
  $('article').remove();
  arrayOfLocalStorage();
};

function CardObject (title, idea, id) {
  this.title = title;
  this.idea = idea;
  this.id = id;
  this.counter = 0;
};

function populateExistingCards () {
  var ratingArray = ['swill', 'plausible', 'genius'];
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

function arrayOfLocalStorage() {
  var newArray = [];
  // populateExistingCards();
  for (let i = 0; i < localStorage.length; i++) {
    var retrievedObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrievedObject);
    newArray.push(parsedObject);
    runSearch(newArray);
  };
};

function runSearch(newArray) {
  var searchInput = $('#search-box').val().toUpperCase();
  var searchedArray = newArray.filter(function(card) {
    return card.title.toUpperCase().includes(searchInput) || card.idea.toUpperCase().includes(searchInput);
  });
  printSearchResults(searchedArray);
};

function printSearchResults(searchedArray) {
  searchedArray.forEach(function(result) {
    createCard(result.id,result.title,result.idea,result.counter);
  });
};

function createCard(id,title,idea,counter = 0) {
  var ratingArray = ['swill', 'plausible', 'genius'];
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


function sendCardToLocalStorage(titleInput, ideaInput, dateNow){
  var cardObject = new CardObject(titleInput, ideaInput, dateNow);
  var stringCardObject = JSON.stringify(cardObject);
  localStorage.setItem(dateNow, stringCardObject);
};

function enableDisableButton() {
  if (($('#title-input').val() !== '') && ($('#idea-input').val() !== '')) {
    enableSaveButton();
  } 
  else { disableSaveButton() }
};

function getObjectAndParseIt(id) {
  var jsonObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(jsonObject);
  return parsedObject;
}

function upvoteValue() {
  var ratingArray = ['swill', 'plausible', 'genius'];
  var clickedCardId = $(this).parent('article').attr('id');
  var parsedObject = getObjectAndParseIt(clickedCardId);
  $(this).siblings('.downvote-button').removeAttr('disabled');
  if (parsedObject.counter === 2) {
    $(this).attr('disabled', true);
  } else {
    parsedObject.counter++;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedObject.counter]);
    var stringifiedObject = JSON.stringify(parsedObject);
    localStorage.setItem(clickedCardId, stringifiedObject);
  };
};

function downvoteValue() {
  var ratingArray = ['swill', 'plausible', 'genius'];
  var clickedCardId = $(this).parent('article').attr('id');
  var parsedObject = getObjectAndParseIt(clickedCardId);
  $(this).siblings('.upvote-button').removeAttr('disabled');
  if (parsedObject.counter === 0) {
    $(this).attr('disabled', true);
  } 
  else {
    parsedObject.counter--;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedObject.counter]);
    var stringifiedObject = JSON.stringify(parsedObject);
    localStorage.setItem(clickedCardId, stringifiedObject);
  };
};