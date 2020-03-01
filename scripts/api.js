// import { promises } from "dns";
// randomly showed up?

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/hannah';

function fetchApi(...args){
  let error;
  return fetch(...args)
    .then(res =>{
      if(!res.ok){
        error = { code: res.status};
        if (!res.headers.get('content-type').includes('json')){
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

function getBookmark(){
  return fetchApi(`${BASE_URL}/bookmarks`);
};

function createBookmark(title, url, description, rating){
  const newBookmark=JSON.stringify({
    "title": title,
    "url": url,
    "description": description,
    "rating": rating
  });

  console.log(newBookmark);

  return fetchApi(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: newBookmark
  });
};
// createBookmark("google","https://www.google.com");

function updateBookmark(id, updateData){
  const newData = JSON.stringify(updateData);
  return bookmarkApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newData
  });
};


function deleteBookmark(id){
  return fetchApi(`${BASE_URL}/bookmarks/${id}`,{
    method: 'DELETE'
  });
};

export {
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark
};