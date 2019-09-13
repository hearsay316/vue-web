import React, { Component } from "react";
import CommentContext,{MyContext} from "../context";


// contextType Consumer
class CommentItem extends Component{
  static contextType = CommentContext; // this.context = {}
  render() {
    this.context = CommentItem.contextType.Provider.value;
    console.log(this.context);
    let { comment } = this.props;
    return <li>
      {comment.username} {comment.content}
      <button
        onClick={() => {
          this.context.increment();
        }}
      >
        点赞
    </button>
  </li>
  }
}

export default CommentItem;
