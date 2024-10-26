import BlogService from '../services/BlogService.js';
class BlogController {
    createBlog = BlogService.createBlog;

    showPanigation = BlogService.showPanigation;

    index = BlogService.index;

    showDetail = BlogService.showDetail;

    addLike = BlogService.addLike;

    removeLike = BlogService.removeLike;
}

export default new BlogController();
