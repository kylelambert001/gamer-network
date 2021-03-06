import axios from "axios";
import { postTypes } from "../types";
import { createAlert } from "./alertActions";
import api from "../../data/api";
import { batch } from "react-redux";
import { hideCurrentModal } from "./modalActions";
import { REQUEST_ERROR, REQUEST_FAILED } from "../../data/errors";

export const initialisePostReducer = () => ({ type: postTypes.INITIALISE_POST_REDUCER });

const loadPostsRequest = () => ({
  type: postTypes.LOAD_POSTS_REQUEST,
});

const loadPostsSuccess = (payload) => ({
  type: postTypes.LOAD_POSTS_SUCCESS,
  payload,
});

const loadPostsFailure = () => ({
  type: postTypes.LOAD_POSTS_FAILURE,
});

export const loadPosts = (page, token) => {
  return async (dispatch) => {
    dispatch(loadPostsRequest());
    try {
      const config = {
        method: "get",
        url: "/posts",
        params: {
          page: page,
        },
        cancelToken: token,
      };
      const res = await api(config);
      const results = res?.data?.results;

      if (!results) {
        throw new Error("No results found in response");
      }

      dispatch(loadPostsSuccess(results.docs));
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Axios request cancelled");
      } else {
        dispatch(loadPostsFailure());
        if (err.response) {
          const errors = err.response?.data?.errors;
          if (errors) {
            errors.forEach((error) => {
              dispatch(createAlert(error.msg, true));
            });
          }
        } else if (err.request) {
          dispatch(createAlert(REQUEST_ERROR, true));
        } else {
          dispatch(createAlert(REQUEST_FAILED, true));
        }
      }
    }
  };
};

const loadPostsByIdRequest = () => ({
  type: postTypes.LOAD_POSTS_REQUEST,
});

const loadPostsByIdSuccess = (payload) => ({
  type: postTypes.LOAD_POSTS_SUCCESS,
  payload,
});

const loadPostsByIdFailure = () => ({
  type: postTypes.LOAD_POSTS_FAILURE,
});

export const loadPostsById = ({ page, id, token }) => {
  return async (dispatch) => {
    dispatch(loadPostsByIdRequest());
    try {
      const config = {
        method: "get",
        url: `/posts/${id}`,
        params: {
          page: page,
        },
        cancelToken: token,
      };
      const res = await api(config);
      const results = res?.data?.results;

      if (!results) {
        throw new Error("No results found in response");
      }

      dispatch(loadPostsByIdSuccess(results.docs));
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Axios request cancelled");
      } else {
        dispatch(loadPostsByIdFailure());
        if (err.response) {
          const errors = err.response?.data?.errors;
          if (errors) {
            errors.forEach((error) => {
              dispatch(createAlert(error.msg, true));
            });
          }
        } else if (err.request) {
          dispatch(createAlert(REQUEST_ERROR, true));
        } else {
          dispatch(createAlert(REQUEST_FAILED, true));
        }
      }
    }
  };
};

const addPostRequest = () => ({
  type: postTypes.ADD_POST_REQUEST,
});

const addPostSuccess = (payload) => ({
  type: postTypes.ADD_POST_SUCCESS,
  payload,
});

const addPostFailure = () => ({
  type: postTypes.ADD_POST_FAILURE,
});

export const addPost = (form, token) => {
  return async (dispatch) => {
    if (!form) {
      return dispatch(createAlert("Post text is required", true));
    }

    const { text, image } = form;

    try {
      dispatch(addPostRequest());
      const config = {
        method: "post",
        url: "/posts",
        data: {
          text,
          image,
        },
        cancelToken: token,
      };

      const res = await api(config);
      const post = res?.data?.post;

      if (!post) {
        throw new Error("Error found in response");
      }

      batch(() => {
        dispatch(addPostSuccess(post));
        dispatch(hideCurrentModal());
        dispatch(createAlert("Post created", false));
      });
    } catch (err) {
      dispatch(addPostFailure());
      if (axios.isCancel(err)) {
        console.log("Axios request cancelled");
      } else {
        if (err.response) {
          const errors = err.response?.data?.errors;
          if (errors) {
            errors.forEach((error) => {
              dispatch(createAlert(error.msg, true));
            });
          }
        } else if (err.request) {
          dispatch(createAlert(REQUEST_ERROR, true));
        } else {
          dispatch(createAlert(REQUEST_FAILED, true));
        }
      }
    }
  };
};

const deletePostRequest = (id) => ({
  type: postTypes.DELETE_POST_REQUEST,
  payload: id,
});

const deletePostSuccess = (id) => ({
  type: postTypes.DELETE_POST_SUCCESS,
  payload: id,
});

const deletePostFailure = (id) => ({
  type: postTypes.DELETE_POST_FAILURE,
  payload: id,
});

export const deletePost = (id, token) => {
  return async (dispatch) => {
    if (!id) {
      return dispatch(createAlert("Post ID is required"), true);
    }

    try {
      dispatch(deletePostRequest(id));

      const config = {
        method: "delete",
        url: `/posts/${id}`,
        cancelToken: token,
      };

      const res = await api(config);

      if (res.status !== 204) {
        throw new Error("Error found in response");
      }

      batch(() => {
        dispatch(createAlert("Post deleted", false));
        dispatch(deletePostSuccess(id));
      });
    } catch (err) {
      dispatch(deletePostFailure());
      if (axios.isCancel(err)) {
        console.log("Axios request cancelled");
      } else {
        if (err.response) {
          const errors = err.response?.data?.errors;
          if (errors) {
            errors.forEach((error) => {
              dispatch(createAlert(error.msg, true));
            });
          }
        } else if (err.request) {
          dispatch(createAlert(REQUEST_ERROR, true));
        } else {
          dispatch(createAlert(REQUEST_FAILED, true));
        }
      }
    }
  };
};
