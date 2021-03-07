import * as types from "redux/constants/conversation.constants";
import api from "redux/api";
import { toast } from "react-toastify";

const getConversations = () => async (dispatch) => {
  dispatch({ type: types.GET_CONVERSATIONS_REQUEST, payload: null });
  try {
    const res = await api.get(`/conversations/?page=1&limit=10`);
    dispatch({ type: types.GET_CONVERSATIONS_SUCCESS, payload: res.data.data });
    console.log("conversation", res.data.data);
  } catch (error) {
    console.log(error);
    dispatch({ type: types.GET_CONVERSATIONS_FAILURE, payload: error });
  }
};

export const conversationActions = {
  getConversations,
};

export default conversationActions;
