import BaseModel from "./BaseModel";

class Comment extends BaseModel{
  static createInstance() {
    return new Comment();
  }
  factory(attributes) {
    return Comment.factory(attributes)
  }
}

Comment.ID = 'id';
Comment.CONTENTS = 'contents';
Comment.TODO_ID = 'todo_id';

export default Comment;
