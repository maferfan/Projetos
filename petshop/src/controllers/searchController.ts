import { Request, Response } from "express";
import { Pet } from "../models/pet";
import { createMenuObject } from "../helpers/createMenuObject";

const search = (req: Request, res: Response) => {
    let nome: string = req.query.q as string
    let list = Pet.getFromName(nome)

    if(!nome){
        return res.redirect('/')
    }

    res.render('pages/page', {
        menu: createMenuObject(''),
        list,
        nome
    }
    )
}

export default search