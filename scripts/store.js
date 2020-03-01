 const store = {
  bookmarks:[],
  adding: false,
  error: null,
  filter: 0,
};


function findById(id){
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
}

function addBookmark(bookmark){
  bookmark.expanded === false;
  this.bookmarks.push(bookmark);
}

function findAndUpdate(id, newData){
  let currentBookmark = this.findById(id);
  Object.assign(currentBookmark, newData);
}

function deleteBookmark(id){
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
}

function handleError(error){
  this.error = error;
}

export {
  store,
  findById,
  addBookmark,
  findAndUpdate,
  deleteBookmark,
  handleError
};