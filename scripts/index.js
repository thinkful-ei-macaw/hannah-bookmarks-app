import {store,
  findById,
  addBookmark,
  findAndUpdate,
  deleteBookmark,
  handleError} from './store.js';
import {createBookmark,
  updateBookmark,
  findAndDelete} from './api.js';

// TEMPLATE GENERATION FUNCTIONS

function generateInitialView(){
  return `<div class="buttons">
  <button type="button" id="new" class="new-bookmark">New</button>
  <select id="dropdown">
    <div class="dropdown-menu">
      <option ${store.filter === 0 ? 'selected' : ''} value=0>Show by rating</option>
      <option ${store.filter === 1 ? 'selected' : ''} value=1>All</option>
      <option ${store.filter === 2 ? 'selected' : ''} value=2> &#9733;	&#9733;  and above</option>
      <option ${store.filter === 3 ? 'selected' : ''} value=3> &#9733; &#9733; &#9733;  and above</option>
      <option ${store.filter === 4 ? 'selected' : ''} value=4> &#9733; &#9733; &#9733; &#9733;  and above</option>
      <option ${store.filter === 5 ? 'selected' : ''} value=5> &#9733; &#9733; &#9733; &#9733; &#9733;  only</option>
    </div>
    </select>
    <ul class="bookmark-titles">${generateBookmarks()}</ul>
   <div class="error-container"> </div>
   </div>`;
}

function generateBookmarks(){
  let bookmarks=[...store.bookmarks];
  if (store.filter>0){
    bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.filter);
  }
  let html = '';
  bookmarks.forEach(bookmark => {
    html+=`
    <li class="bookmark-titles">
      <button type="button" data-id="${bookmark.id}" class="accordion">
        ${bookmark.title} ${translateRating(bookmark.rating)}
      </button>
      ${bookmark.expanded ? `
      <div class="content">
        <p>
        ${bookmark.desc}
        </p>
        <a href="${bookmark.url}" target="_blank">Visit Site</a>
        <button type="button" data-id="${bookmark.id}" class="delete">Delete</button>
      </div>` : ''}
    </li>
  `;
  });
  return html;
}

function generateAddView(){
  return `<form class="add-bookmark-form">
  <input type="text" name="bookmark-name" placeholder="Name"/>
  <input type="text" name="url" placeholder="https://www.example.com"/>
  <div class="rating">
    <p>Select Rating:</p>
    <input type="radio" id="star1" name="rating" value="1" class="radio-btn hide"/><label class="full" for="star1" title="1 stars">1 &#9733;</label>
    <input type="radio" id="star2" name="rating" value="2" class="radio-btn hide"/><label class="full" for="star2" title="2 stars">2 &#9733;s</label>
    <input type="radio" id="star3" name="rating" value="3" class="radio-btn hide"/><label class="full" for="star3" title="3 stars">3 &#9733;s</label>
    <input type="radio" id="star4" name="rating" value="4" class="radio-btn hide"/><label class="full" for="star4" title="4 stars">4 &#9733;s</label>
    <input type="radio" id="star5" name="rating" value="5" class="radio-btn hide"/><label class="full" for="star5" title="5 star">5 &#9733;s</label>
  </div>
    <input type="text" name="desc" placeholder="Bookmark Description"/>
    <div class="add-buttons">
    <input type="submit" id="add-submit" value="Submit">
    <button name="cancel-add" id="cancel-add-button"> Cancel </button>
    </div>
  </form>`;
}

  

// TEMPLATE RENDERING FUNCTIONS
function render(){
  
  let html = '';
  html += generateError();

  if(store.adding === true){
    html += generateAddView();
  } else {
    html += generateInitialView();
  }

  $('main').html(html)
  
}


// EVENT HANDLER FUNCTIONS
function handleButtonClick(){
  $('main').on('click','#new', function(event){
    event.preventDefault();
    store.adding = true;
    render();
    
  });
}

function handleCreate(){
  $('main').unbind('submit').on('submit', '.add-bookmark-form', function(event){
    event.preventDefault();
    let newBookmarkName = $('input[type="text"][name="bookmark-name"]').val();
    let newBookmarkUrl = $('input[type="text"][name="url"]').val();
    let newBookmarkRating = $('input[type="radio"]:checked').val();
    let newBookmarkDescr = $('input[type="text"][name="desc"').val();
    createBookmark(
      newBookmarkName,
      newBookmarkUrl,
      newBookmarkDescr,
      newBookmarkRating
    )
      .then((newBookmark)=> {
        addBookmark(newBookmark);
        store.adding = false;
        render();
      })
      .catch((error) => {
        handleError(error.message);
        render();
      });
    
  });
}



function handleExpand(){
  $('main').unbind('click').on('click','.accordion',function(event){
    let id = $(event.currentTarget).data('id');
    let bookmark = findById(id);
    bookmark.expanded = !bookmark.expanded;
    render();
  });
}


function handleFilter(){
  $('main').unbind('change').on('change', '#dropdown', event => {
    event.preventDefault();
    let filter = $('#dropdown').val();
    store.filter = parseInt(filter);
    render();
  });
}



function handleCancelAdd(){
  $('main').on('click', 'button[name="cancel-add"]', event => {
    event.preventDefault();
    store.adding = false;
    render();
  });
}

function handleDelete(){
  $('main').on('click', '.delete', function(event){
    let id = $(event.currentTarget).data('id');
    findAndDelete(id)
      .then(() => {
        deleteBookmark(id);
        render();
      });
  });
}

function translateRating(rating){
   let stars = '';
  for (let i = 0; i < rating; i++){
    stars += '&#9733; ';
  }
  return stars;
}


function generateError() {
  let html = '';
  if (store.error) {
    html = `
    <section class="error-content">
      <button id="cancel-error">X</button>
      <p>${store.error}</p>
    </section>
    `;
  }
  return html;
}

function handleCloseError() {
  $('main').on('click', '#cancel-error', () => {
    store.error = null;
    render();
  });
}


function eventHandler(){
  handleExpand();
  handleButtonClick();
  handleCreate();
  handleDelete();
  handleCancelAdd();
  handleCloseError();
  handleFilter();
  render();
}

$(eventHandler());

export {
  render,
  eventHandler
};