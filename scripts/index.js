import store from './store.js';
import api from './api.js';


// TEMPLATE GENERATION FUNCTIONS

function generateInitialView(){
  return `<div class="buttons">
  <button type="button" class="new-bookmark">New</button>
  <div class="dropdown">
  <button type="button" class="drpbtn">Filter By</button>
  <div class="dropdown-rating">
    <button class="btn">5<i class="fa fas fa-star"></i></button>
    <button class="btn">4<i class="fa fas fa-star"></i></button>
    <button class="btn">3<i class="fa fas fa-star"></i></button>
    <button class="btn">2<i class="fa fas fa-star"></i></button>
    <button class="btn">1<i class="fa fas fa-star"></i></button>
  </div>
</div>
  <fieldset class="bookmarks">
    <ul class="bookmark-titles">
      <button type="button" class="collapsible">Title</button>
    </ul>
  </fieldset>`;
}

function generateAddView(){
  `<form>
      <label for="add-bookmark">Add New Bookmark</label>
      <input type="text" id="add-bookmark" placeholder="Your Link Here"></input>
    </form> 
    <div class="new-bookmark">
      <label for="bookmark-entry"></label>
      <input for="bookmark-title" type="text" placeholder="Title"></input>
      <i class="fa fas fa-star"></i>
      {/* <!-- .checked {
        color: orange;
      } --> */}
      <i class="fa fas fa-star"></i>
      <i class="fa fas fa-star"></i>
      <i class="fa fas fa-star"></i>
      <i class="fa fas fa-star"></i>
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
      <button type="button" class="collapsible">Title</button>
      <button type="button" class="delete">Delete</button>
      <div>
      <button type="button" class="original-site">Visit Site</button>
      </div>
      <div class="content">Phasellus congue mattis vestibulum. Suspendisse tellus nisi, porttitor in lorem lobortis, vulputate consectetur tortor. Curabitur tempor luctus ante nec mollis. Aenean vel neque dapibus, rutrum felis id, cursus quam. Aenean pulvinar sapien non justo molestie, id feugiat lacus mollis. Praesent in felis ut leo viverra consectetur in eu nibh. Nulla ac ex quam.</div>
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
  else if (bookmarks.expanded === true){
    $('main').html(generateExpandedView());
  }
  else {
    $('main').html(generateAddView());
  }
}

$(render());

// $(function(){ handleFormSubmission(); handleButtonClick(); render(); })