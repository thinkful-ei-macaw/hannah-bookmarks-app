 const store = {
  bookmarks:[],
  adding: false,
  error: null,
  filter: 0,
};


function findById(id){
  return store.bookmarks.find(currentBookmark => currentBookmark.id === id);
}

function addBookmark(bookmark){
  bookmark.expanded === false;
  store.bookmarks.push(bookmark);
}

function findAndUpdate(id, newData){
  let currentBookmark = this.findById(id);
  Object.assign(currentBookmark, newData);
}

function deleteBookmark(id){
  store.bookmarks = store.bookmarks.filter(currentItem => currentItem.id !== id);
}

function handleError(error){
  store.error = error;
}

export {
  store,
  findById,
  addBookmark,
  findAndUpdate,
  deleteBookmark,
  handleError
};