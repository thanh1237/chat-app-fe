import * as types from "redux/constants/user.constants";
import api from "redux/api";
import { toast } from "react-toastify";

const getUsers = () => async (dispatch) => {
  dispatch({ type: types.GET_USERS_REQUEST, payload: null });
  try {
    const res = await api.get(`/users/?page=1&limit=10`);
    dispatch({ type: types.GET_USERS_SUCCESS, payload: res.data.data });
    console.log("user", res.data.data);
  } catch (error) {
    console.log(error);
    dispatch({ type: types.GET_USERS_FAILURE, payload: null });
  }
};

export const userActions = {
  getUsers,
};

export default userActions;
