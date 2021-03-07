import * as types from "redux/constants/conversation.constants";
const initialState = {
  conversations: [],
  totalPageNum: 1,
  loading: false,
};

const conversationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_CONVERSATIONS_REQUEST:
      return { ...state, loading: true };
    case types.GET_CONVERSATIONS_SUCCESS:
      return { ...state, conversations: payload.conversations, loading: false };
    case types.GET_CONVERSATIONS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default conversationReducer;
