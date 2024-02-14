import { all, put, fork, takeLatest } from "redux-saga/effects";
import {
  FETCH_CLIENTS_REQUEST,
  UPDATE_CLIENT_REQUEST,
} from "redux/constants/Clients";
import {
  fetchClientsSuccess,
  fetchClientsFailure,
  updateClientSuccess,
  updateClientFailure,
} from "../actions/Clients";
import clientsService from "services/ClientsService";

export function* fetchClients() {
  yield takeLatest(FETCH_CLIENTS_REQUEST, function* () {
    try {
      const clients = yield clientsService.getClients();
      yield put(fetchClientsSuccess(clients));
    } catch (err) {
      yield put(fetchClientsFailure(err.mess));
    }
  });
}

export function* updateClient() {
  yield takeLatest(UPDATE_CLIENT_REQUEST, function* ({ payload }) {
    try {
      const user = yield clientsService.updateClient(payload);
      yield put(updateClientSuccess(user));
    } catch (err) {
      yield put(updateClientFailure(err.mess));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(fetchClients), fork(updateClient)]);
}
