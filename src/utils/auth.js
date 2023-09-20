import { checkResponse, BASE_URL } from './utils';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const register = ({name, email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then((res) => checkResponse(res));
}

export const authorize = ({email, password})=> {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => checkResponse(res));
}

  // getContent () {
  //   return fetch(this._userUrl, {
  //     method: "GET",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: this._token,
  //     },
  //   }).then((res) => checkResponse(res));
  // };