export interface ToDo {
    id: number,
    title: string,
    text: string,
    created_at: Date,
    is_active: boolean,
    tags: Tag[]
}

export interface Tag {
    id: number,
    title: string
}

export interface User {
    login: string,
    password: string
}