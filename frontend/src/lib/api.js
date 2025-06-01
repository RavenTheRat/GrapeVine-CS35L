/// <reference path="./api.d.ts">

const BASE_URL = "http://localhost:3000";

async function gvCreateEvent(req) {
  return gvFetch("/event/new", "POST", req, true);
}

async function gvGetEvent(req) {
  return gvFetch(`/event/${req.eventId}`, "GET", null, true);
}

async function gvUpdateEvent(req) {
  return gvFetch(`/event/${req.eventId}`, "POST", req);
}

async function gvDeleteEvent(req) {
  return gvFetch(`/event/${req.eventId}`, "DELETE");
}

async function gvGetEvents() {
  return gvFetch(`/events`, "GET", null, true);
}

async function gvAddFriend(req) {
  return gvFetch(`/friends/add`, "POST", req, true);
}

async function gvRemoveFriend(req) {
  return gvFetch(`/friends/remove`, "POST", req, true);
}

async function gvGetFriends() {
  return gvFetch(`/friends`, "GET");
}

async function gvGetFriendStatus(uid) {
  return gvFetch(`/friends/status/${uid}`, "GET");
}

async function gvGetUserByEmail(req) {
  return gvFetch(`/user/byemail/`, "POST", req, true);
}

async function gvGetComments(req) {
  return gvFetch(`/events/${req.eventId}/comments`, "GET", null, true);
}

async function gvAddComment(req) {
  return gvFetch(`/events/${req.eventId}/comments/add`, "POST", req, true);
}

async function gvFetch(endpoint, method, data = null, useJsonResponse = false) {
  const fetchParams = {
    method
  };

  if (data) {
    fetchParams.headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
    fetchParams.body = JSON.stringify(data);
  }

  return fetch(`${BASE_URL}${endpoint}`, fetchParams)
    .then(async (res) => {
      const text = await res.text().catch(_ => null);
      if (useJsonResponse && res.status == 200) {
        return JSON.parse(text);
      } else {
        return text;
      }

    })
    .catch(handleError);
}

function handleError(e) {
  // TODO: We may want to do some kind of error conversion here.
  throw e;
}

