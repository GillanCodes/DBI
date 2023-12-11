export interface IUser extends Document {
    _id:string,
    username: string,
    password: string,
    email: string,
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

export interface ITag extends Document{
    _id:        string,
    name:       string,
    createdAt:  Date | string,
    updatedAt:  Date | string
}

export interface IImage extends Document
{
    _id: string,
    folderId: string,
    filePath:string,
    tags:[string],
    category:string,
    properties: [IProperty],
    views: [string],
    createdAt: Date | string,
    updatedAt: Date | string,
}