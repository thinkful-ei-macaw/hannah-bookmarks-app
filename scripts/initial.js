'use strict';

const store = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      description: 'dolorum tempore deserunt',
      expanded: false
    } 
    ...
  ],
  adding: false,
  error: null,
  filter: 0
};

// TEMPLATE GENERATION FUNCTIONS

const function generateNewEntry(){
  return `<button type="button" class="new-bookmark">New</button>`;
}

const function generateFilter(){
  return `<button type="button" class="filter">Filter By</button>`;
}

const function generateBookmark(){
  return `<fieldset class="bookmarks">
      <ul class="bookmark-titles">
        <button type="button" class="collapsible">Title</button>
      </ul>
    </fieldset>`;
}

// TEMPLATE RENDERING FUNCTIONS

const function render(){
  
}
