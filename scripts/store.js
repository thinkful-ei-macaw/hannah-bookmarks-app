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
    // ...
  ],
  adding: false,
  error: null,
  filter: 0
};

function findById(id){
  return this.bookmarks.find(currentItem => currentItem.id === id);
}

function addBookmark(entry){
  this.bookmarks.push(entry);
}

function deleteBookmark(id){
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
}

export {
  store,
  findById,
  addBookmark,
  deleteBookmark,
};