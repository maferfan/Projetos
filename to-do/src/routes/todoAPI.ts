import { Router } from "express";
import multer from "multer";
import { todoAll, todoCreate, todoDelete, todoUpdate, uploadFile } from "../controllers/todoController";

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp')    
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + ".jpg")
    },
})
const upload = multer({
    storage: storageConfig
})

const router = Router()

router.get('/', todoAll)
router.post('/', todoCreate)
router.put('/tarefa/:id', todoUpdate)
router.delete('/tarefa/:id', todoDelete)

router.post('/upload', upload.single('avatar'), uploadFile)
export default router