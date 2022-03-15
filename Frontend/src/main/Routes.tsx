import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from './../pages/Home'
import NewLanche from '../pages/NewLanche'
import NewIngrediente from '../pages/NewIngrediente'
import EditLanche from '../pages/EditLanche'
import EditIngrediente from '../pages/EditIngrediente'
import consultLanche from '../pages/consultLanches'
import consultIngredientes from '../pages/consultIngredientes'
import Cadast from './../pages/Cadast'
import Login from './../pages/Login'
import { AuthContext } from '../hooks/Auth'
import PrivateRoute from '../PrivateRoute'



const Routes = () => {
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') || '');
    const [userName, setUserName] = useState('');
    const [userAccessLevel, setUserAccessLevel] = useState('');

    const setTokens = (data: any) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, userName, setUserName, userAccessLevel, setUserAccessLevel }}>
            <Switch>
                {/* <Route exact path='/' component={Login} /> */}
                <Route exact path='/login' component={Login} />
                <PrivateRoute path='/home' component={Home} />
                <PrivateRoute path='/NewLanche' component={NewLanche} />
                <PrivateRoute path='/NewIngrediente' component={NewIngrediente} />
                <PrivateRoute path='/consultLanche' component={consultLanche} />
                <PrivateRoute path='/consultIngredientes' component={consultIngredientes} />
                <PrivateRoute path='/editLanche' component={EditLanche} />
                <PrivateRoute path='/editIngrediente' component={EditIngrediente} />
                <PrivateRoute exact path='/cadastro' component={Cadast} />

                <Redirect from='*' to='/login' />
            </Switch>
        </AuthContext.Provider>
    )
}

export default Routes