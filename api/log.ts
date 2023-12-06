import * as fs from "fs";
import config from "./config/config";
import * as path from "path";

//Init color vars
const Reset = "\x1b[0m",
FgRed = "\x1b[31m",
FgGreen = "\x1b[32m",
FgYellow = "\x1b[33m",
FgCyan = "\x1b[36m",
FgBlack = "\x1b[30m",
BgGreen = "\x1b[42m"

//init constant
let appName:string = config.APP_NAME;
const timestamp:Date = new Date();
const time = (): string => { 
	return new Date(new Date().valueOf() * 1).toLocaleDateString("fr-FR", {hour: "2-digit", minute: "2-digit", second:"2-digit", weekday: "long", year: "numeric", month: "short", day:"numeric"})
}
const fileName:string = `${timestamp.getDate()}_${timestamp.getMonth() + 1}_${timestamp.getFullYear()}.log`;
const sanitizedPath = path.join(__dirname, config.LOG_FOLDER);
const filePath:string = `${sanitizedPath}${fileName}`;

//Check if "logs" folder exist ?
fs.readdir(sanitizedPath, (err , data) => {
    if (err) fs.mkdir(sanitizedPath, (err:any) => {
        if (err) throw Error(err);
    });
});

//check if log file exist
fs.readFile(filePath, (err, data) => {
    if (err) fs.writeFile(filePath, '', (err:any) => {
        if (err) throw Error(err);
    });
});

const log = (message:string|object|null|undefined|number, type?:string|number|undefined|null): void => {
    switch(type)
    {
        case 0:
        case "error":
            var ln = `[${time()}] [ERROR] ${appName} - ${message}`;
            fs.appendFileSync(filePath, `${ln}\n`);
            console.log(FgRed, ln, Reset);
            break;
        case 1:
        case "success":
            var ln = `[${time()}] [SUCCESS] ${appName} - ${message}`;
            fs.appendFileSync(filePath, `${ln}\n`);
            console.log(FgGreen, ln, Reset);
            break;
        case 2:
        case "warn":
            var ln = `[${time()}] [WARN] ${appName} - ${message}`;
            fs.appendFileSync(filePath, `${ln}\n`);
            console.log(FgYellow, ln, Reset);
            break;
        case 3:
        case "info":
            var ln =  `[${time()}] [INFO] ${appName} - ${message}`;
            fs.appendFileSync(filePath, `${ln}\n`);
            console.log(FgCyan, ln, Reset);
            break;
        case 4:
        case "debug":
            var ln =  `[${time()}] [DEBUG] ${appName} - ${message}`;
            fs.appendFileSync(filePath, `${ln}\n`);
            console.log(BgGreen + FgBlack, ln, Reset);
            break;
        default:
            var ln =  `[${time()}] [---] ${appName} - ${message}`;
            fs.appendFileSync(filePath, `${ln}\n`);
            console.log(Reset, ln, Reset);
            break;
    }
    return;
}

export default log;