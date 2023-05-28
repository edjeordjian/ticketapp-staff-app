import axios from "axios";
import { BACKEND_HOST } from "../constants/generalConstants";
import {
    SIGN_IN_URL,
    GET_EVENT_URL,
    GET_EVENTS_URL,
    CHECK_EVENT_URL,
    STATS_URL,
    USER_STATS_URL
} from "../constants/URLs";
import EventListResponse from "./responses/EventListResponse";
import EventResponse from "./responses/EventResponse";
import StatsResponse from "./responses/StatsResponse";

export default class apiClient {
  constructor(token) {
    this._token = token;
  }

  // Get general
  call_get(url, params, onResponse, onError) {
    axios.get(url, {
          params: params,
          headers: {
            'Expo': "true",
            'Authorization': `Bearer ${this._token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        })
        .then((response) => {
          onResponse(response);
        })
        .catch((err) => {
          onError(err);
        });
  }

  // Post general
  call_post(url, data, onResponse, onError) {
    axios.post(url, data, {
          headers: {
            'Expo': "true",
            'Authorization': `Bearer ${this._token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        })
        .then((response) => {
          onResponse(response);
        })
        .catch((err) => {
          onError(err);
        });
  }

  call_delete(url, onResponse, onError) {
    axios.delete(url, {
          headers: {
            'Expo': "true",
            'Authorization': `Bearer ${this._token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        })
        .then((response) => {
          onResponse(response);
        })
        .catch((err) => {
          onError(err);
        });
  }

  call_patch(url, data, onResponse, onError) {
    axios.patch(url, data, {
          headers: {
            'Expo': "true",
            'Authorization': `Bearer ${this._token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        })
        .then((response) => {
          onResponse(response);
        })
        .catch((err) => {
          onError(err);
        });
  }

  // ==========================================USER SEARCH==========================================

  logIn(requestBody, onResponse, onError) {
    axios.post(`${BACKEND_HOST}${SIGN_IN_URL}`, requestBody, {
      headers: {
        'Expo': "true",
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
    .then((response) => {
      onResponse(response);
    })
    .catch((err) => {
      onError(err);
    });
  }

  // ==========================================USER SEARCH==========================================

  getEventsList(onResponse, onError, userId) {
    const _onResponse = (res) => {onResponse( new EventListResponse(res.data))}
    this.call_get(`${BACKEND_HOST}${GET_EVENTS_URL}`, {staff:userId}, _onResponse, onError);
  }

  // ==========================================SEE EVENT==========================================

  getEventInfo(eventId, onResponse, onError) {
    const _onResponse = (res) => {onResponse( new EventResponse(res.data))}
    this.call_get(`${BACKEND_HOST}${GET_EVENT_URL}`, {
            eventId: eventId,
            with_percentage: true
        },
        _onResponse,
        onError);
  }

  // ==========================================SEE EVENT==========================================

  checkValidateQR(eventId, qrCode, onResponse, onError) {
    const _onResponse = (res) => {onResponse( new EventResponse(res.data))}
    this.call_post(`${BACKEND_HOST}${CHECK_EVENT_URL}`, {eventId: eventId, eventCode: qrCode}, _onResponse, onError);
  }

  // ==========================================GET STATS==========================================
  getStats(eventId, onResponse, onError) {
    const _onResponse = (res) => {onResponse( new StatsResponse(res.data))}
    this.call_get(`${BACKEND_HOST}${STATS_URL}`, {eventId: eventId}, _onResponse, onError);
  }

    getUserStats(eventId, onResponse, onError) {
        this.call_get(`${BACKEND_HOST}${USER_STATS_URL}`, {eventId: eventId}, onResponse, onError);
    }

}