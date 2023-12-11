import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import Auth from "../Components/Auth/Auth";

export default function index()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} Component={Home} />
                <Route path={"/auth"} Component={Auth} />
            </Routes>
        </BrowserRouter>
    ) 
}