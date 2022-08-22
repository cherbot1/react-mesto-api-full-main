import React from "react";
import { Route, Redirect } from "react-router-dom";
import {LoggedInContext} from "../contexts/LoggedInContext";


const ProtectedRoute = ({ component: Component, ...props }) => {
    const loggedIn = React.useContext(LoggedInContext);

    return (
        <Route>
            {() =>
                loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />
            }
        </Route>
    );
};

export default ProtectedRoute;