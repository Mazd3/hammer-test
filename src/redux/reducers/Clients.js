import {
  FETCH_CLIENTS_REQUEST,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_FAILURE,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILURE,
} from "../constants/Clients";
import history from "../../history";

const initState = {
  clients: [],
  loading: true,
  error: null,
};

const clients = (state = initState, action) => {
  switch (action.type) {
    case FETCH_CLIENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_CLIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_CLIENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_CLIENT_SUCCESS: {
      history.back();
      return {
        ...state,
        clients: state.clients.map((client) =>
          client.id === action.payload.id ? action.payload : client
        ),
        loading: false,
        error: null,
      };
    }
    case UPDATE_CLIENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default clients;
