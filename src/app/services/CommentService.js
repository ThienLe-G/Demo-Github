import Comment from '../models/Comment.js';

class CommentService {
    constructor() {
        this.createComment = this.createComment.bind(this);
    }

    async createComment(req, res) {
        const comment = req.body;
        comment.imgUrl = req.file?.path || '';
        if (comment.parentId) {
            this.updateResponseComment(comment.parentId);
        }
        Comment.create(comment)
            .then((comment) => res.json('Send comment successfully!'))
            .catch((err) => res.json(err));
    }

    updateResponseComment = async (id) => {
        try {
            const comment = await Comment.findByIdAndUpdate(
                { _id: id },
                { $inc: { responseTimes: 1 } },
                { new: true },
            ).exec();
        } catch (err) {
            console.log(err);
        }
    };

    getBlogComments = (req, res) => {
        const blogId = req.query.blogId;
        Comment.find({ blogId })
            .sort({ createdAt: -1 })
            .then((comments) => res.json(comments))
            .catch((err) => res.json(err));
    };

    getReplyComments = (req, res) => {
        const parentId = req.query.parentId;
        Comment.find({ parentId })
            .then((comments) => res.json(comments))
            .catch((err) => res.jon(err));
    };

    async addLike(req, res) {
        const commentId = req.query.commentId;
        const userId = req.query.userId;
        const userExists = await Comment.exists({
            _id: commentId,
            likedList: userId,
        });
        if (userExists) {
            return res.status(400).json({ error: 'Be liked!' });
        } else {
            try {
                await Comment.findOneAndUpdate(
                    { _id: commentId },
                    { $push: { likedList: userId } },
                    { new: true },
                );
                console.log('oke');
                res.status(200).json('Like successfull!');
            } catch (error) {
                console.log(error);
                res.status(500).json('Like fail!');
            }
        }
    }

    async removeLike(req, res) {
        const commentId = req.query.commentId;
        const userId = req.query.userId;
        try {
            await Comment.findOneAndUpdate(
                { _id: commentId },
                { $pull: { likedList: userId } },
                { new: true },
            );
            console.log('Unlike successfull!');
            res.status(200).json('Unlike successfull!');
        } catch (error) {
            console.log(error);
            res.status(500).json('Unlike fail!');
        }
    }
}

export default new CommentService();
