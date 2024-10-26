import AdminService from '../services/AdminService.js';

class AdminController {
    showFoods(req, res) {
        AdminService.showFoods(req, res);
    }
    showVideos(req, res) {
        AdminService.showVideos(req, res);
    }
    showBlog(req, res) {
        AdminService.showBlog(req, res);
    }
    showUsers(req, res) {
        AdminService.showUsers(req, res);
    }
    showComments(req, res) {
        AdminService.showComments(req, res);
    }
    createVideo(req, res) {
        AdminService.createVideo(req, res);
    }

    createUser = AdminService.createUser;

    createFood(req, res) {
        AdminService.createFood(req, res);
    }

    createBlog(req, res) {
        AdminService.createBlog(req, res);
    }

    updateVideo(req, res) {
        AdminService.updateVideo(req, res);
    }

    deleteVideo(req, res) {
        AdminService.deleteVideo(req, res);
    }

    updateFood(req, res) {
        AdminService.updateFood(req, res);
    }

    deleteFood(req, res) {
        AdminService.deleteFood(req, res);
    }

    updateBlog(req, res) {
        AdminService.updateBlog(req, res);
    }

    deleteBlog(req, res) {
        AdminService.deleteBlog(req, res);
    }

    deleteComment(req, res) {
        AdminService.deleteComment(req, res);
    }

    updateComment(req, res) {
        AdminService.updateComment(req, res);
    }

    updateUserStatus = AdminService.updateUserStatus;
}

export default new AdminController();
