import axios from "axios";
import { postTypes } from "../types";
import { batch } from "react-redux";
import { publishAlertAction } from "../actions/alertActions";
import api from "../../data/api";

export const getPostsByPage = (token, page) => {
  return (dispatch) => {
    dispatch({ type: postTypes.POSTS_BY_PAGE_REQUEST });
    api
      .get("/posts", { cancelToken: token })
      .then((res) => {
        batch(() => {
          const posts = res?.data?.results?.docs;
          if (posts && Array.isArray(posts)) {
            dispatch({ type: postTypes.POSTS_BY_PAGE_SUCCESS, payload: posts });
          } else {
            console.log("Incorrect post shape. Expected type Array.");
          }
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          dispatch({ type: postTypes.RESET_POST_REDUCER });
          console.log("Request canceled", err.message);
        } else {
          dispatch({ type: postTypes.POSTS_BY_PAGE_FAILURE });

          if (Array.isArray(err?.response?.data?.errors)) {
            err.response.data.errors.forEach((error) => {
              return dispatch(publishAlertAction(error.msg, "error"));
            });
          } else {
            dispatch(publishAlertAction("Request error", "error"));
          }
        }
      });
  };
};

export const resetPostReducerAction = () => {
  return (dispatch) => {
    dispatch({ type: postTypes.RESET_POST_REDUCER });
  };
};
