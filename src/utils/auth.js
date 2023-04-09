export const BASE_URL = " https://auth.nomoreparties.co";

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => {
      try {
        if (res.status === 201) {
          return res.json();
        }
      } catch (error) {
        return (error);
      }
    })
    .then((res) => {
      return res;
    })
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        return res;
      }
    })
}

export function chekToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => data)
}


