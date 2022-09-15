import * as types from '../types';

const initialState = {
  isLoggedIn: false,
  token: false,
  use: {},
  isLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      return newState;
    }

    case types.LOGIN_FAILED: {
      const newState = { ...initialState };
      return newState;
    }

    default: {
      return state;
    }
  }
}
