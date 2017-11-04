import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'

import style from './style.scss'

class Student extends Component {

	constructor(props){
		super(props)
	}


	_logout(history){
		const { dispatch } = this.props
		// dispatch(signOut(history))
	}

	render(){
		return (
			<div>
				student
			</div>
		)
	}
}

Student.propTypes = {}

Student.defaultProps = {}

export default withRouter(connect(
	state => ({
	})
)(Student))