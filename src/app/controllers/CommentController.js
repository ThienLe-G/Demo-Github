import CommentService from '../services/CommentService.js';
class CommentController {
    createComment = CommentService.createComment;

    getBlogComments = CommentService.getBlogComments;

    getReplyComments = CommentService.getReplyComments;

    addLike = CommentService.addLike;

    removeLike = CommentService.removeLike;
}

export default new CommentController();
