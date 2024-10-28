import React, { useContext } from "react";
import { AuthContext } from '../Context/AuthContext'
import { Navigate , Outlet } from "react-router-dom";

function AuthRouter(props) {
    const Context = useContext(AuthContext)

    return (
        <React.Fragment>
            {
                Context?.isLogin ? <Outlet/> : <Navigate to={`/login`}/>
            }
        </React.Fragment>
    )
}

export default AuthRouter;