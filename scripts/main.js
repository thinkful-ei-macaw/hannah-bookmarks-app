import {getBookmark} from './api.js';  
import {addBookmark} from './store.js';

import {render,eventHandler} from './index.js';

function mainFunc() {
  getBookmark()
    .then((bookmark) => {
      bookmark.forEach((bookmark) => addBookmark(bookmark));
      render();
    });
  eventHandler();
  render();
}

$(mainFunc);