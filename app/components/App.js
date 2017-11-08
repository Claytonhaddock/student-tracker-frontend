import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'

import Nav from './nav'
import Universities from './universities'
import Cohort from './cohort'
import Student from './student'

const App = ({}) => 
    <Router>
        <div>
            <Route path="/" component={ Nav } />
			<Switch>
                <Route path="/:uni/:cohort/:student" component={ Student } />
                <Route path="/:uni/:cohort/" component={ Cohort } />
                <Route path="/:uni" component={ Universities } />
			</Switch>
        </div>
    </Router>

export default App