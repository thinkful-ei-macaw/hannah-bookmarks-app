import {store} from '../scripts/store.js';
import {addBookmark, getBookmark, deleteBookmark } from '../scripts/api.js';


// TEMPLATE GENERATION FUNCTIONS

function generateInitialView(){
  return `<div class="buttons">
  <button type="button" id="new" class="new-bookmark">New</button>
  <div class="dropdown">
  <button type="button" class="drpbtn">Filter By</button>
  <div class="dropdown-rating">
    <button id="filter-5" class="btn">5<i class="fa fas fa-star"></i></button>
    <button id="filter-4" class="btn">4<i class="fa fas fa-star"></i></button>
    <button id="filter-3" class="btn">3<i class="fa fas fa-star"></i></button>
    <button id="filter-2" class="btn">2<i class="fa fas fa-star"></i></button>
    <button id="filter-1" class="btn">1<i class="fa fas fa-star"></i></button>
  </div>
</div>
  <fieldset class="bookmarks">
    <ul class="bookmark-titles">
      <button type="button" id="expand" class="accordion">Title</button>
      <div class="content" style="display: none;">
        <p>
          Phasellus congue mattis vestibulum. Suspendisse tellus nisi, porttitor in lorem lobortis, vulputate consectetur tortor. Curabitur tempor luctus ante nec mollis. Aenean vel neque dapibus, rutrum felis id, cursus quam. Aenean pulvinar sapien non justo molestie, id feugiat lacus mollis. Praesent in felis ut leo viverra consectetur in eu nibh. Nulla ac ex quam.
        </p>
      </div>
    </ul>
  </fieldset>`;
}

function generateAddView(){
  return `<form>
      <label for="add-bookmark">Add New Bookmark</label>
      <input type="text" id="add-bookmark" placeholder="Your Link Here"></input>
    </form> 
    <div class="new-bookmark">
      <label for="bookmark-entry"></label>
      <input for="bookmark-title" type="text" placeholder="Title"></input>
      <i id="select-5" class="fa fas fa-star"></i>
      <i id="select-4" class="fa fas fa-star"></i>
      <i id="select-3" class="fa fas fa-star"></i>
      <i id="select-2" class="fa fas fa-star"></i>
      <i id="select-1" class="fa fas fa-star"></i>
      <textarea for="bookmark-description" name="bookmark-description" placeholder="Add a description"></textarea>
    </div> 
    <div>
      <button class="cancel" for="cancel-submission" type="button">Cancel</button>
      <button class="create" for="create-submission" type="button">Create</button>
    </div>`;
}

function generateExpandedView(){
  return `<button type="button" class="new-bookmark">New</button>
  <button type="button" class="filter">Filter By</button>
  <fieldset class="bookmarks">
    <ul class="bookmark-titles">
      <button type="button" id="expand" class="accordion">Title</button>
      <div class="content" style="display: block">
        <p>
          Phasellus congue mattis vestibulum. Suspendisse tellus nisi, porttitor in lorem lobortis, vulputate consectetur tortor. Curabitur tempor luctus ante nec mollis. Aenean vel neque dapibus, rutrum felis id, cursus quam. Aenean pulvinar sapien non justo molestie, id feugiat lacus mollis. Praesent in felis ut leo viverra consectetur in eu nibh. Nulla ac ex quam.
        </p>
      </div>
      <button type="button" class="delete">Delete</button>
      <div>
      <button type="button" class="original-site">Visit Site</button>
      </div>
    </ul>
  </fieldset>`;
}

// TEMPLATE RENDERING FUNCTIONS

function render(){
  let bookmarks = [...store.bookmarks];
  if (store.adding === false){
    $('main').html(generateInitialView());
    return;
  }
  else if (store.bookmarks.expanded === true){
    $('main').html(generateExpandedView());
  }
  else {
    $('main').html(generateAddView());
  }
}

$(render());

// EVENT HANDLER FUNCTIONS
// $(function(){ handleFormSubmission(); handleButtonClick(); render(); })

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
  $('main').on('click','.create',function(event){

  });
}

function handleExpand(){
  $('main').on('click','#expand',function(event){
    store.bookmarks.expanded=true;
    $($(event.currentTarget).siblings().get(0)).toggle()
  });
}

function eventHandler(){
  render();
  handleButtonClick();
  handleCancel();
  handleExpand();
}

$(eventHandler());