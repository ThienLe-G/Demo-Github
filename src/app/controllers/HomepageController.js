import homepageService from '../services/HomepageService.js';

class HomepageController {
    index(req, res) {
        homepageService.index(req, res);
    }

    showVideos(req, res) {
        homepageService.showVideos(req, res);
    }

    aboutUs(req, res){
        homepageService.aboutUs(req,res);
    }
}

export default new HomepageController();
