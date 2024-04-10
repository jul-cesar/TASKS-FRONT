import { task } from "./Task"
import { user } from './User';

export interface comment {
    id: string
    tareaId: string
    authorId: string
    contenido: string
    user: user
    tarea: task
    fecha: Date
}