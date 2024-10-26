import express from 'express';
import FoodCaloriesController from '../app/controllers/FoodCaloriesController.js';

const router = express.Router();

router.get('/ultimateFilter', FoodCaloriesController.ultimateFilter)
router.get('/filterCtgr', FoodCaloriesController.filterCategory);
router.get('/filterFvr', FoodCaloriesController.filterFavourite);
router.post('/like', FoodCaloriesController.addToFavourite);
router.post('/unlike', FoodCaloriesController.removeFromFavourite);
router.post('/add', FoodCaloriesController.addToMenu);
router.post('/remove', FoodCaloriesController.removeFromMenu);
router.get('/search', FoodCaloriesController.search);
router.get('/sort', FoodCaloriesController.sort);
router.get('/showPanigation', FoodCaloriesController.showPanigation);
router.get('/', FoodCaloriesController.show);

export default router;
