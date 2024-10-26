import FoodService from '../services/FoodService.js';

class FoodCaloriesController {
    show(req, res) {
        FoodService.index(req, res);
    }
    search(req, res) {
        FoodService.search(req, res);
    }
    addToMenu(req, res) {
        FoodService.addToMenu(req, res);
    }
    removeFromMenu(req, res) {
        FoodService.removeFromMenu(req, res)
    }
    sort(req, res) {
        FoodService.sort(req, res);
    }
    addToFavourite(req, res) {
        FoodService.addToFavourite(req, res);
    }
    removeFromFavourite(req, res) {
        FoodService.removeFromFavourite(req, res);
    }
    filterFavourite(req, res) {
        FoodService.filterFavourite(req, res);
    }
    filterCategory(req, res) {
        FoodService.filterCategory(req, res);
    }
    ultimateFilter(req, res) {
        FoodService.ultimateFilter(req, res);
    }

    showPanigation = FoodService.showPanigation;
}

export default new FoodCaloriesController();
