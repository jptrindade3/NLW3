import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; //é importante baixar as tipagens referentes ao rrd, pq nem todos os pacotes já vem junto dessa tipagem pro TS, e temos que adicionar manualmente com o npm install

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';


function Routes(){
    return(
        <BrowserRouter>
            <Switch> {/* o Switch deixa com que só uma das rotas seja chamada por vez*/}
                <Route path="/" exact component={Landing}/>
                <Route path="/app" component={OrphanagesMap}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;