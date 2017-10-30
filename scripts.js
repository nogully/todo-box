$(document).ready(populateExistingCards);
$('.save-button').on('click', submitCard);
$('.card-wrap').on('click', '.delete-button', deleteCard);
$('.card-wrap').on('blur', 'p, h1', persistTextEdit);
$('.card-wrap').on('keypress', 'p, h1', enterKeyPersistEdit);
$(window).on('keyup', enableDisableButton);
$('.card-wrap').on('click', '.upvote-button', upvoteValue);
$('.card-wrap').on('click', '.downvote-button', downvoteValue); 
$('#search-box').on('keyup', searchCards);
$('.card-wrap').on('click', '#checkbox', completeTask)


function CardObject (title, body, id) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.counter = 0;
  this.complete = false;
};

function populateExistingCards() {
  var ratingArray = ['swill', 'plausible', 'genius'];
  for (let i = 0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  createCard(parsedObject);
  };
};

function submitCard() {
  event.preventDefault();
  var cardObject = new CardObject($('#title-input').val(), $('#body-input').val(), Date.now())
  createCard(cardObject);
  $('form')[0].reset();
  disableSaveButton();
  sendCardToLocalStorage(cardObject);
};

function searchCards() {
  $('article').remove();
  arrayOfLocalStorage();
};

function arrayOfLocalStorage() {
  var newArray = [];
  for (let i = 0; i < localStorage.length; i++) {
    var retrievedObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrievedObject);
    newArray.push(parsedObject);
  };
  runSearch(newArray);
};

function runSearch(newArray) {
  var searchInput = $('#search-box').val().toUpperCase();
  var searchedArray = newArray.filter(function(object) {
    var upperCaseObjectBody = object['body'].toUpperCase();
    var upperCaseObjectTitle = object['title'].toUpperCase();
    return upperCaseObjectBody.includes(searchInput) || upperCaseObjectTitle.includes(searchInput);
  });
  printSearchResults(searchedArray);
};

function printSearchResults(searchedArray) {
  searchedArray.forEach(function(result) {
    createCard(result);
  });
};

function createCard(object){
  var ratingArray = ['swill', 'plausible', 'genius'];
  $('.card-wrap').prepend(`
    <article id="${object.id}" class="card-article">
      <h1 class="user-title" contenteditable="true">${object.title}</h1>
      <button class="delete-button" aria-label="Delete Button"></button>
      <p class="user-body" contenteditable="true">${object.body}</p>
      <button class="upvote-button" aria-label="upvote button"></button>
      <button class="downvote-button" aria-label="downvote button"></button>
      <h2>quality: <span class="rating">${ratingArray[object.counter]}</span></h2>
      <label class="completed-box" for="checkbox">Completed</label><input id="checkbox" type="checkbox">
      <hr>
    </article>`);
}

function completeTask(event) {
  var id = $(event.target).closest('article').prop('id');
  var object = getObjectAndParseIt(id)
  $(event.target).siblings('p, h1, h2, label').toggleClass('greyed-out-text');
  if ($(event.target).siblings('p').hasClass('greyed-out-text')){
    object.complete = true;
  } else {
    object.complete = false;
  }
  sendCardToLocalStorage(object);
}

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

function enableDisableButton() {
  if (($('#title-input').val() !== '') && ($('#body-input').val() !== '')) {
    enableSaveButton();
  } 
  else { disableSaveButton() }
};

function enterKeyPersistEdit(){
  if (13 == event.keyCode) {
    event.preventDefault();
    $('p, h1').blur();
    persistTextEdit();
  }
}

function persistTextEdit(event) {
  var id = $(event.target).closest('article').prop('id');
  var newBody = $(event.target).closest('article').children('p').text();
  var newTitle = $(event.target).closest('article').children('h1').text();
  var cardObject = getObjectAndParseIt(id);
  cardObject.body = newBody;
  cardObject.title = newTitle;
  sendCardToLocalStorage(cardObject);
};

function getObjectAndParseIt(id) {
  var jsonObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(jsonObject);
  return parsedObject;
}

function sendCardToLocalStorage(cardObject){
  var stringCardObject = JSON.stringify(cardObject);
  localStorage.setItem(cardObject.id, stringCardObject);
};

function upvoteValue() {
  var ratingArray = ['swill', 'plausible', 'genius'];
  var parsedObject = getObjectAndParseIt($(this).parent('article').attr('id'));
  if (parsedObject.counter < 2){
    parsedObject.counter++;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedObject.counter]);
    sendCardToLocalStorage(parsedObject);
  }
};

function downvoteValue() {
  var ratingArray = ['swill', 'plausible', 'genius'];
  var parsedObject = getObjectAndParseIt($(this).parent('article').attr('id'));
  if (parsedObject.counter <= 2 && parsedObject.counter > 0) {
    parsedObject.counter--;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedObject.counter]);
    sendCardToLocalStorage(parsedObject);
  };
};