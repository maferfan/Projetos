import { Request, Response } from "express"
import { Todo } from "../models/todo"
import sharp from "sharp"
import { unlink } from "fs/promises" // deletar da pasta temporária

export const todoAll = async (req: Request, res: Response) => {
    const todo = await Todo.findAll()
    res.json(todo)
    console.log(req.body)
}

export const todoCreate = async (req: Request, res: Response) => {
    const { title, done } = req.body
    try {
        const todo = await Todo.create({ title, done })
        res.json(todo)
    } catch (error) {
        console.log(error)
    }
}

export const todoUpdate = async (req: Request, res: Response) => {
    const { title, done } = req.body
    const { id } = req.params
    try {
        const todo = await Todo.findByPk(id)
        if (todo) {
            await todo.update({ title, done })
            res.json("Tarefa atualizada com sucesso.")
        } else {
            res.status(404).json("Tarefa não encontrada.")
        }
    } catch (error) {
        console.log(error)
    }
}

export const todoDelete = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const todo = await Todo.findByPk(id)

        if (todo) {
            await todo.destroy()
            res.json("Tarefa excluída.")
        } else {
            res.status(404).json('Tarefa não encontrada')
        }
    } catch (error) {
        console.log(error)
    }
}

export const uploadFile = async (req: Request, res: Response) => {
    try {
        if (req.file){
            await sharp(req.file.path).resize(300,300).toFormat('jpeg').toFile(`./public/media/${req.file.filename}`)
            await unlink(req.file.path)
            res.json({image: `${req.file.filename}`})
        }else{
            res.status(400)
            res.json({error: "Ocorreu um erro."})
        }
        
    } catch (error) {
        console.log(error)
    }
}