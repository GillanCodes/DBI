export interface IUser extends Document {
    _id:string,
    username: string,
    password: string,
    email: string
}

export interface IAction {
    _id:string,
    ownerId:string
    title: string,
    description: string,
    color: string,
    image:string,
    type: string, 
    recurrence: string,
    time:string,
    counter:number,
    step:number,
}