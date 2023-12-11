import React from 'react'
import { useSelector } from 'react-redux';

const ProtectedRoute = ({children} : {children:Document}) => {
    const user = useSelector((state:any) => state.userReducer);
}

export default ProtectedRoute;