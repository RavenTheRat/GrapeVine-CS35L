/// <reference path="./api.d.ts">

const BASE_URL = "http://localhost:3000";

export async function gvCreateEvent(req) {
  return post("/createevent", req);
}

export async function gvGetEvent(req) {
  return post("/getevent", req);
}

export async function gvUpdateEvent(req) {
  return post("/getevent", req);
}

async function get(endpoint) {
  return fetch(`${BASE_URL}${endpoint}`).catch(handleError);
}

async function post(endpoint, data) {
  return fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
    .then(res => res.status == 200 ? res.text().then(t => JSON.parse(t)) : null)
    .catch(handleError);
}

function handleError(e) {
  // TODO: We may want to do some kind of error conversion here.
  throw e;
}

