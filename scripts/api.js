// import { promises } from "dns";
// randomly showed up?

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/hannah';

const function fetchApi(...args){
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
  })
}

const function getBookmarks(){
  return fetchApi(`${BASE_URL}/bookmarks`);
}

const function addBookmark(title, url, description, rating){
  const newBookmark=JSON.stringify({
    title,
    url,
    description,
    rating
  });
  return fetchApi(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: newBookmark
  });
}

const function deleteBookmark(id){
  return fetchApi(`${BASE_URL}/bookmarks/${id}`,{
    method: 'DELETE'
  });
}

export default {
  addBookmark,
  getBookmarks,
  deleteBookmark
};