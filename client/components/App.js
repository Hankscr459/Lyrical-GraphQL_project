import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SongList from './SongList'
import SongCreate from './SongCreate'

const app = () => {
    return (
        <div className="container">
            <Switch>
                <Route exact={true} path="/" component={SongList} />
                <Route path='/songs/new' component={SongCreate}/>
            </Switch>
        </div>
    )
}

export default app