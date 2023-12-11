import { useSelector } from 'react-redux';
import { IState } from '../types';
import { Navigate, useLocation } from 'react-router-dom';
import { isEmpty } from '../Utils';
import { useContext, useEffect, useState } from 'react';
import { UIdContext } from '../App.context';

const ProtectedRoute = ({children} : {children:JSX.Element}) => {

    const [load, setLoad] = useState(false);

    const UId = useContext(UIdContext);
    let location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            setLoad(true)
        }, 1000)
    }, [UId])

    if (isEmpty(UId) && load)
    {
        return <Navigate to="/auth" state={{from: location}} replace />
    }
    
    return children;
}

export default ProtectedRoute;