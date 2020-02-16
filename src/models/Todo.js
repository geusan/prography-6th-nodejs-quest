import BaseModel from "./BaseModel";
import Comment from "./Comment";

class Todo extends BaseModel {
  constructor() {
    super();
    this.attributes[Todo.IS_COMPLETED] = false;
  }
  static createInstance() {
    return new Todo();
  }
  factory(attributes) {
    return Todo.factory(attributes)
  }
  getComments() {
    return Comment
      .findAll((comment) => comment[Comment.TODO_ID] === Number(this.get(Todo.ID)));
  }
}

Todo.ID = 'id';
Todo.TITLE = 'title';
Todo.DESCRIPTION = 'description';
Todo.IS_COMPLETED = 'is_completed';
Todo.TAGS = 'tags';


export default Todo;
