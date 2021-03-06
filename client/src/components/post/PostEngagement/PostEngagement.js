import React from "react";
import "./PostEngagement.scss";

import { ReactComponent as ThumbUp } from "../../../assets/icons/thumb_up.svg";
import { ReactComponent as Comments } from "../../../assets/icons/comments.svg";

import CircleIcon from "../../shared/CircleIcon/CircleIcon";

function PostEngagement({ comments, likes }) {
  const commentCount = Array.isArray(comments) ? comments.length : null;
  const likeCount = Array.isArray(likes) ? likes.length : null;

  return (
    <div className="PostEngagement">
      <div className="PostEngagement__group">
        <span className="PostEngagement__count">{likeCount ? likeCount : 0}</span>
        <span className="PostEngagement__icon">
          <CircleIcon circleColor="indigo" iconColor="indigo" iconSize="small">
            <ThumbUp />
          </CircleIcon>
        </span>
      </div>
      <div className="PostEngagement__group">
        <span className="PostEngagement__count">{commentCount ? commentCount : 0}</span>
        <span className="PostEngagement__icon">
          <CircleIcon circleColor="indigo" iconColor="indigo" iconSize="small">
            <Comments />
          </CircleIcon>
        </span>
      </div>
    </div>
  );
}

export default PostEngagement;
