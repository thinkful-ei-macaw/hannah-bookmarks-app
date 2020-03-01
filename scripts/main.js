import {getBookmark,
  createBookmark,
  updateBookmark,
  findAndDelete} from '../scripts/api.js';  
import {store,
  findById,
  addBookmark,
  findAndUpdate,
  deleteBookmark,
  handleError} from '../scripts/store.js';

import {render,eventHandler} from '..scripts/index.js';

function mainFunc() {
  getBookmark()
    .then((bookmark) => {
      bookmark.forEach((bookmark) => store.createBookmark(bookmark));
      render();
    });
  eventHandler();
  render();
}

$(mainFunc);