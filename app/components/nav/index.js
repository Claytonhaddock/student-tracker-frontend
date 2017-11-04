import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'

import style from './style.scss'

class Nav extends Component {

	constructor(props){
		super(props)
	}


	_logout(history){
		const { dispatch } = this.props
		// dispatch(signOut(history))
	}

	render(){

		return (
			<div  className={ classNames(style.navFixed) }>
				Nav
			</div>
		)
	}
}

Nav.propTypes = {}

Nav.defaultProps = {}

export default withRouter(connect(
	state => ({
	})
)(Nav))