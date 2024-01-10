export interface IUser extends Document {
    _id:string,
    username: string,
    password: string,
    email: string,
    likes: [string],
    createdAt: Date | string,
    updatedAt: Date | string
}

export interface IFolder
{
    _id:            string,
    name:           string,
    description:    string,
    icon:           string,
    createdAt:      Date | string,
    updatedAt:      Date | string
}

export interface IView {
    date: string | Date,
    viewer: string
}

export interface IProperty 
{
    _id:    string,
    name:   string,
    type:   string,
    value:  string,
    createAt: Date | string,
    updatedAt: Date | string,
}

export interface ITag
{
    _id:        string,
    name:       string,
    createdAt:  Date | string,
    updatedAt:  Date | string
}

export interface IMedia
{
    _id: string,
    folderId: string,
    filePath:string,
    tags:[string],
    category:string,
    type: string,
    properties: [IProperty],
    views: [string],
    likes: [string],
    createdAt: string,
    updatedAt:  string,
}

export interface IState
{
    userReducer: IUser
    mediasReducer: IMedia[]
    foldersReducer: IFolder[]
    tagsReducer: ITag[]
    propertiesReducer: IProperty[]
}