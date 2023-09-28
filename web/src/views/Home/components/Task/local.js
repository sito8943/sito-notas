// utils
import config from "../../../../config";
import { decrypt, encrypt } from "../../../../utils/crypto";

export const createTask = (id) => {
    const tasks = decrypt(localStorage.getItem(config.tasks))
    tasks[id] = { id, content: `# Nueva Tarea ${Object.keys(tasks).length + 1} \n Escribe el contenido aquí` }

    localStorage.setItem(config.tasks, encrypt(tasks))
}

export const getTask = (id) => {
    const tasks = decrypt(localStorage.getItem(config.tasks))
    return tasks[id]
}

export const updateTask = (id, key, value) => {
    const tasks = decrypt(localStorage.getItem(config.tasks))
    tasks[id][key] = value
    localStorage.setItem(config.tasks, encrypt(tasks))
}

export const deleteTask = (id) => {
    const tasks = decrypt(localStorage.getItem(config.tasks))
    delete tasks[id]
    localStorage.setItem(config.tasks, encrypt(tasks))
}

export const initTasks = () => {
    if (localStorage.getItem(config.tasks) === null) {
        localStorage.setItem(config.tasks, encrypt({}))
        return [];
    }
    const tasks = decrypt(localStorage.getItem(config.tasks))

    return Object.keys(tasks)
}

