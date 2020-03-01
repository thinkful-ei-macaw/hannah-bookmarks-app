import {store,
  findById,
  addBookmark,
  findAndUpdate,
  deleteBookmark,
  handleError}} from '../scripts/store.js';
import {getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark} from '../scripts/api.js';

// TEMPLATE GENERATION FUNCTIONS

function generateInitialView(){
  return `<div class="buttons">
  <button type="button" id="new" class="new-bookmark">New</button>
  <select id="dropdown">
      <option value=0 selected>Show by rating</option>
      <option value=0>All</option>
      <option value=2> &#9733;	&#9733;  and above</option>
      <option value=3> &#9733; &#9733; &#9733;  and above</option>
      <option value=4> &#9733; &#9733; &#9733; &#9733;  and above</option>
      <option value=5> &#9733; &#9733; &#9733; &#9733; &#9733;  only</option>
    </select>
  
   <div class="error-container"> </div>
   </div>`;
}

function generateAddView(){
  return `<form class="add-bookmark-form">
  <input type="text" name="bookmark-name" value="Name"/>
  <input type="text" name="url" value="https://www."/>
  <div class="rating">
    <input type="radio" id="star5" name="rating" value="5" class="radio-btn hide"/><label class="full" for="star5" title="5 stars">&#9733;</label>
    <input type="radio" id="star4" name="rating" value="4" class="radio-btn hide"/><label class="full" for="star4" title="4 stars">&#9733;</label>
    <input type="radio" id="star3" name="rating" value="3" class="radio-btn hide"/><label class="full" for="star3" title="3 stars">&#9733;</label>
    <input type="radio" id="star2" name="rating" value="2" class="radio-btn hide"/><label class="full" for="star2" title="2 stars">&#9733;</label>
    <input type="radio" id="star1" name="rating" value="1" class="radio-btn hide"/><label class="full" for="star1" title="1 star">&#9733;</label>
  </div>
    <input type="text" name="description" value="Bookmark Description"/>
    <button name="cancel-add" id="cancel-add-button"> Cancel </button>
    <input type="submit" id="add-submit" value="Submit">
  </form>`;
}

function generateExpandedView(bookmark){
  const stars = translateRating(bookmark.rating);
  if(bookmark.expanded === false) {
    return `
  <form class="bookmark-container" data-id="${bookmark.id}">
  <div class="bookmark-thumbnail">  
    <p>${bookmark.title}
      <span class="star-rating">${stars}</span>
        
    </p>
  </div>
  </form>
  `;
 }
  else if(bookmarks.expanded === true) {
    return `
  <form class="expanded-container" data-id="${bookmarks.id}">
    <h2>${bookmarks.title}</h2>
    <span class="star-rating"> ${stars} </span>
    <h3>Visit:</h3>
    <a href=${bookmarks.url}>${bookmarks.url}</a>
    <h3>Description</h3>
    <p>${bookmarks.desc}</p>
    <button type="submit" class="delete-button"> &#128465; </button>
    <button type="button" name="cancel-expand" class="cancel-button"> Cancel </button>
  </form>
  `;
  }
};

function templateEdit(){ 

  return `
  <form class="edit-bookmark-form">
    <input type="text" name="bookmark-name" value="Name"/>
    <input type="text" name="url" value="Url"/>
    <div class="rating">
      <input type="radio" id="star5" name="rating" value="5" class="radio-btn hide"/><label class="full" for="star5" title="5 stars">&#9733;</label>
      <input type="radio" id="star4" name="rating" value="4" class="radio-btn hide"/><label class="full" for="star4" title="4 stars">&#9733;</label>
      <input type="radio" id="star3" name="rating" value="3" class="radio-btn hide"/><label class="full" for="star3" title="3 stars">&#9733;</label>
      <input type="radio" id="star2" name="rating" value="2" class="radio-btn hide"/><label class="full" for="star2" title="2 stars">&#9733;</label>
      <input type="radio" id="star1" name="rating" value="1" class="radio-btn hide"/><label class="full" for="star1" title="1 stars">&#9733;</label>
    </div>
    <input type="text" name="description" value="Bookmark Description"/>
    <button type="button" name="cancel"> Cancel </button>
    <input type="submit" value="Submit">
  `;
  };
  

// TEMPLATE RENDERING FUNCTIONS

function render(){
  $('main').html(generateInitialView());
  if(store.adding === true){
    $('main').append(generateAddView());
  }
  let bookmarks = [...store.bookmarks];
  if(store.filter > 0) {
    bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.filter);
  }
}
//   getBookmark().then((data)=>{
//     bookmarks = data;
//     bookmarks.map((bookmark) => {
  
//  $('.bookmark-titles').append(`
//       <button type="button" id="expand" class="accordion">${bookmark.title}</button>
//       <div class="content" style="display: block">
//       <a href="${bookmark.url}" class="original-site">Visit Site</a>
//         <p>${bookmark.desc}</p>
//         <div>
//         <button type="button" class="delete">Delete</button>
//         </div>
//       </div>
//  `)

// })

//   });

//   if (store.adding === false){
//     $('main').html(generateInitialView());
//     return;
//   }
//   else if (store.bookmarks.expanded === true){
//     $('main').html(generateExpandedView());
//   }
//   else {
//     $('main').html(generateAddView());
//   }
// }


// EVENT HANDLER FUNCTIONS
// $(function(){ handleFormSubmission(); handleButtonClick(); render(); })

function handleBookmarkList(bookmarks){
  return bookmarks.map(bookmark => (generateExpandedView(bookmark))).join('');
}


function handleButtonClick(){
  $('main').on('click','#new', function(event){
    event.preventDefault();
    store.adding = true;
    render();
    console.log('click');
    
  });
}

function handleCancel(){
  $('main').on('click','.cancel',function(event){
    event.preventDefault();
    store.adding = false;
    render();
  });
}

function handleCreate(){
  $('main').on('submit','.add-bookmark-form',function(event){
    event.preventDefault();
    let newBookmarkName = $('input[type="text"][name="bookmark-name"]').val();
    let newBookmarkUrl = $('input[type="text"][name="url"]').val();
    let newBookmarkRating = $('input[type="radio"]:checked').val();
    let newBookmarkDescr = $('input[type="text"][name="description"').val();
    api.createBookmark(newName,
      newUrl,
      newDescription,
      newRating
    )
      .then((newBookmark)=> {
          store.addBookmark(newBookmark);
          store.adding = false;
          render();
      })
      .catch((error) => {
        store.handleError(error.message);
        console.error(error.message);
        renderError();
      })
  });
}



function handleExpand(){
  $('main').on('click','.bookmark-container',function(event){
    let id=findBookmarkIdFromElement(event.currentTarget);
    let bookmark = store.findById(id);
   bookmark.expanded = !bookmark.expanded;
   render();
  });
}

function handleDelete(){
  $('main').on('click', '.delete-button', event => {
    console.log('handleDelete is running');
    event.preventDefault();
    const id = findBookmarkIdFromElement(event.currentTarget);
    api.deleteBookmark(id)
      .then(()=> {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        console.log(error);
        store.handleError(error.message);
        renderError();
      });
  });
}

function handleFilter(){
  $('main').on('change', '#dropdown', event => {
    event.preventDefault();
    let filter = $('option:selected').val();
    console.log(filter);
    store.filter = filter;
    render();
  });
};

function handleCancelExpand(){
  $('main').on('click', 'button[name="cancel-expand"]', event => {
    event.preventDefault();
    let id = findBookmarkIdFromElement(event.currentTarget);
    let bookmark = store.findById(id);
    if(bookmarks.expanded === true){
      bookmarks.expanded = false;
    }
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

function translateRating(rating){
  if(rating === 1) {
    return `&#9733;`;
  }
  else if(rating === 2) {
    return `&#9733; &#9733;`;
  }
  else if(rating === 3) {
    return `&#9733; &#9733; &#9733;`;
  }
  else if(rating  === 4) {
    return `&#9733; &#9733; &#9733; &#9733;`;
  }
  else if(rating === 5) {
    return `&#9733; &#9733; &#9733; &#9733; &#9733;`;
  }
  else{
    return '';
  }
}

function findBookmarkIdFromElement(bookmark) {
  return $(bookmark)
    .closest('form')
    .data('id')
}

function generateError(message) {
  return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
}

function handleCloseError() {
  $('main').on('click', '#cancel-error', () => {
    store.error = null;
    renderError();
  });
}

function renderError() {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
}



function eventHandler(){
  render();
  handleBookmarkList();
  handleButtonClick();
  handleCancel();
  handleExpand();
  handleCreate();
  handleDelete();
  handleEdit();
  handleCancelExpand();
  handleCancelAdd();
  handleCloseError();
  translateRating();
  handleFilter();
  renderError();
}

$(eventHandler());