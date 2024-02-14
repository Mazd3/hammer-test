import {
  FETCH_CLIENTS_REQUEST,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_FAILURE,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILURE,
} from "../constants/Clients";

export const fetchClientsRequest = () => ({
  type: FETCH_CLIENTS_REQUEST,
});

export const fetchClientsSuccess = (users) => ({
  type: FETCH_CLIENTS_SUCCESS,
  payload: users,
});

export const fetchClientsFailure = (error) => ({
  type: FETCH_CLIENTS_FAILURE,
  payload: error,
});

export const updateClientRequest = (user) => ({
  type: UPDATE_CLIENT_REQUEST,
  payload: user,
});

export const updateClientSuccess = (user) => ({
  type: UPDATE_CLIENT_SUCCESS,
  payload: user,
});

export const updateClientFailure = (error) => ({
  type: UPDATE_CLIENT_FAILURE,
  payload: error,
});
