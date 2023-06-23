import { Router } from "express";
import pagesController from "../controllers/pagesController";
import searchController from "../controllers/searchController"

const router = Router()

router.get('/', pagesController.home)
router.get('/dogs', pagesController.dogs)
router.get('/cats', pagesController.cats)
router.get('/fishes', pagesController.fishes)

router.get('/search', searchController)

export default router