import { Request, Response } from "express";

const home = (req: Request, res: Response) => {
    res.render('pages/page')
}

const dogs = (req: Request, res: Response) => {
    res.render('pages/page')
}

const cats = (req: Request, res: Response) => {
    res.render('pages/page')
}

const fishes = (req: Request, res: Response) => {
    res.render('pages/page')
}

export default ({
    home, dogs, cats, fishes
})