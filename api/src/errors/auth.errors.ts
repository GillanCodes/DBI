export const loginErrors = (error:any) => {
    let errors = {logs: "", password: ""};

    if (error.message.includes("_id"))
    {
        errors.logs = "Incorrect 'Username' or 'Email'";
    }

    if (error.message.includes("Incorrect logs"))
    {
        errors.password = "Incorrect logs or password"
    }

    return errors;
};

export const registerErrors = (error:any) => {
    let errors = {username: "", email: "", password: ""};

    if (error.message.includes('username') && error.message.includes('shorter'))
    {
        errors.username = "Username is too short";
    }
    
    if (error.message.includes('password') && error.message.includes('shorter'))
    {
        errors.password = "Password is too short";
    }
    
    if (error.message.includes('email') && error.message.includes('Validator'))
    {
        errors.email = "Email is not a valid email";
    }
    
    return errors;
}