import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js';
import { Slug } from '../../util/generateSlug.js';
import { generateTitle } from '../../util/generateSlug.js';
import { removeVietnameseTones } from '../../util/generateSlug.js';

import {
    multipleMongooesToOject,
    mongooesToOject,
} from '../../util/mongoose.js';

class BlogService {
    index(req, res) {
        let isLogin = req.isAuthenticated();
        const itemsPerPage = 6;

        Blog.countDocuments().then((count) => {
            const totalPages = Math.ceil(count / itemsPerPage);

            Blog.find({})
                .limit(itemsPerPage)
                .then((blogs) => {
                    blogs = multipleMongooesToOject(blogs);
                    res.render('blog', { blogs, isLogin, totalPages });
                })
                .catch((err) => {
                    res.status(500).json({ err: 'ERROR!' });
                });
        });
    }

    showPanigation(req, res) {
        const currentPage = parseInt(req.query.page);
        const itemsPerPage = 6;

        Blog.countDocuments().then((count) => {
            const totalPages = Math.ceil(count / itemsPerPage);

            Blog.find({})
                .lean()
                .skip((currentPage - 1) * itemsPerPage)
                .limit(itemsPerPage)
                .then((blogs) => {
                    res.json({ blogs, totalPages });
                })
                .catch((err) => {
                    res.status(500).json({ err: 'ERROR!' });
                });
        });
    }

    async showDetail(req, res) {
        const isLogin = req.isAuthenticated() || false;
        const blog = await Blog.findOne({ slug: req.params.slug }).lean();
        res.render('blogDetail', {
            blog,
            isLogin,
        });
    }

    async addLike(req, res) {
        const blogId = req.query.blogId;
        const userId = req.query.userId;
        const userExists = await Blog.exists({
            _id: blogId,
            likedList: userId,
        });
        if (userExists) {
            return res
                .status(400)
                .json({ error: 'User đã tồn tại trong likedList' });
        } else {
            try {
                await Blog.findOneAndUpdate(
                    { _id: blogId },
                    { $push: { likedList: userId } },
                    { new: true },
                );
                res.status(200).json('Like successfull!');
            } catch (error) {
                res.status(500).json('Like fail!');
            }
        }
    }

    async removeLike(req, res) {
        const blogId = req.query.blogId;
        const userId = req.query.userId;
        try {
            await Blog.findOneAndUpdate(
                { _id: blogId },
                { $pull: { likedList: userId } },
                { new: true },
            );
            res.status(200).json('Unlike successfull! ');
        } catch (error) {
            res.status(500).json('Unlike fail!');
        }
    }

    createBlog = async (req, res, isLogin) => {
        if (!isLogin) {
            $('#login_form').modal('show');
        } else {
            try {
                let formData = req.body;
                formData.title = generateTitle(req.body.title);
                let oldSlug = removeVietnameseTones(req.body.title);
                let newSlug = Slug.generateSlug(oldSlug);
                let checkSlug = await Blog.countDocuments({ slug: newSlug });
                if (checkSlug > 0) {
                    let i = 1;
                    while (checkSlug > 0) {
                        oldSlug += '-' + i++;
                        newSlug = Slug.generateSlug(oldSlug);
                        checkSlug = await Blog.countDocuments({
                            slug: newSlug,
                        });
                    }
                }

                formData.slug = newSlug;
                console.log(formData.slug);
                const saveBlog = await Blog.create(formData);
                await saveBlog.save();
                res.redirect('/blog');
            } catch (err) {
                console.log(err);
                res.status(500).send('Internal Server Error: ' + err.message);
            }
        }
    };
}
export default new BlogService();
