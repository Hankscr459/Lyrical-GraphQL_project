import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SongList from './SongList'
import SongCreate from './SongCreate'
import SongDetail from './SongDetail'

const app = () => {
    return (
        <div className="container">
            <Switch>
                <Route exact={true} path="/" component={SongList} />
                <Route path='/songs/new' component={SongCreate}/>
                <Route path='/songs/:id' component={SongDetail}/>
            </Switch>
        </div>
    )
}

export default app