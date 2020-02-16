import { Router } from 'express';
import { Comment, Todo } from '../../../models';

const router = Router({ mergeParams: true });

router.post('/', (req, res) => {
  const comment = Comment.create();
  comment.set(Comment.CONTENTS, req.body.contents);
  comment.set(Comment.TODO_ID, req.params.todoId);
  comment.save();
  res.send(comment)
});
router.get('/', (req, res) => {
  const todo = Todo.find(req.params.todoId);
  const comments = todo.getComments();
  res.send(comments)
});
router.get('/:commentId', (req, res) => {
  const comment = Comment.find(req.params.commentId);
  res.send(comment)
});
router.put('/:commentId', (req, res) => {
  const comment = Comment.find(req.params.commentId);
  comment.set(Comment.CONTENTS, req.body.contents || comment.get(Comment.CONTENTS));
  comment.save();
  res.send(comment)
});
router.delete('/:commentId', (req, res) => {
  const comment = Comment.find(req.params.commentId);
  comment.remove();
  res.send({
    msg: 'success',
  })
});

export default router;
