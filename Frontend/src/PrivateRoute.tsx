import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/Auth";
import apiAxios from "./components/apiAxios";

const frontEndURL = process.env.REACT_APP_CLIENT_URL //URL do backend

function PrivateRoute({ component: Component, ...rest }:any) {
    const { authTokens, setUserName, setUserAccessLevel } = useAuth();
    const [tokenIsAuthenticated] = useState(true)

    useEffect(() => {
        console.log('teste validação2')
        validToken()
    }, []);

    useEffect(() => {
        console.log('teste validação')
        let valid = setInterval(validToken, 10000);
        return () => clearInterval(valid);
    }, []);

    async function validToken() {
        await apiAxios.get(`/profile`, { headers: { 'Authorization': `bearer ${authTokens.accessToken}` } })
            .then(({ data }) => {
 //               setUserName(data.username)
 //              setUserAccessLevel(data.accesslevel)
            })
            .catch(() => {
                window.location.href = `${frontEndURL}/login`;
            }
            )
    }

    return (
        <Route
            {...rest}
            render={props =>
                !!tokenIsAuthenticated ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/login" />
                    )
            }
        />
    );
}

export default PrivateRoute;
