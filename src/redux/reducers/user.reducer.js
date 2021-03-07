import * as types from "redux/constants/user.constants";
const initialState = {
  users: [],
  totalPageNum: 1,
  selectedUser: {},
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_USERS_REQUEST:
      return { ...state, loading: true };
    case types.GET_USERS_SUCCESS:
      return { ...state, users: payload.users, loading: false };
    case types.GET_USERS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default userReducer;
