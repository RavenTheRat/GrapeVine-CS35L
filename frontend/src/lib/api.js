/// <reference path="./api.d.ts">

const BASE_URL = "http://localhost:3000";

export async function gvCreateEvent(req) {
  return gvFetch("/event/new", "POST", req, true);
}

export async function gvGetEvent(req) {
  return gvFetch(`/event/${req.eventId}`, "GET", null, true);
}

export async function gvUpdateEvent(req) {
  return gvFetch(`/event/${req.eventId}`, "POST", req);
}

export async function gvDeleteEvent(req) {
  return gvFetch(`/event/${req.eventId}`, "DELETE");
}

export async function gvGetEvents() {
  return gvFetch(`/events`, "GET", null, true);
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

