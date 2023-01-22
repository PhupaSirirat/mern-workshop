import { getUsername } from "./services/authorize";
import { Route, Redirect } from "react-router-dom";
import { Component } from "react";

// User route controll
// when log in success -> user should not direct to some path/url
const AdminRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => 
            getUsername() ? (
                <Component {...props} />
            ) : (
                // if user try to direct some page that we dont want by changing url
                // then redirect user to other page instead
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
        }
    />
)

export default AdminRoute;