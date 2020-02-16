import CommentRouter from './Comment';
import { Router } from "express";
import { Todo } from '../../models';

const router = Router();

router.post('/', (req, res) => {
  const todo = Todo.create();
  todo.set(Todo.TITLE, req.body.title)
  todo.set(Todo.DESCRIPTION, req.body.title)
  todo.set(Todo.TAGS, req.body.title)
  todo.save();
  res.send({
    data: todo.toJSON()
  })
});
router.get('/', (req, res) => {
  const todos = Todo.findAll();
  res.send({
    data: todos
  })
});
router.get('/:todoId', (req, res) => {
  const todo = Todo.find(req.params.todoId);
  res.send({
    data: todo,
  })
});
router.put('/:todoId', (req, res) => {
  const todo = Todo.find(req.params.todoId)
  todo.set(Todo.TITLE, req.body.title || todo.get(Todo.TITLE))
  todo.set(Todo.DESCRIPTION, req.body.title || todo.get(Todo.DESCRIPTION))
  todo.set(Todo.TAGS, req.body.title || todo.get(Todo.TAGS))
  todo.save();
  res.send({
    data: todo.toJSON(),
  })
});
router.delete('/:todoId', (req, res) => {
  const todo = Todo.find(req.params.todoId);
  todo.remove();
  res.send({
    msg: 'success'
  })
});
router.put('/:todoId/complete', (req, res) => {
  const todo = Todo.find(req.params.todoId);
  todo.set(Todo.IS_COMPLETED, true)
  todo.save();
  res.send({
    data: todo.toJSON(),
  })
});
router.use('/:todoId/comments', CommentRouter);


export default router;
