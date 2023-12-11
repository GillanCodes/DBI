import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import Auth from "../Components/Auth/Auth";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "../Components/Navbar/Navbar";

export default function index()
{
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={"/auth"} Component={Auth} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }/>
            </Routes>
        </BrowserRouter>
    ) 
}