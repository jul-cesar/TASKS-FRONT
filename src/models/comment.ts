import { task } from "./Task"
import { user } from './User';

export interface comment {
    id: string
    taskId: string
    authorId: string
    content: string
    user: user
    task: task
    createdAt: Date
}