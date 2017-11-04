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
		const {
			university,
			cohort,
			student
		} = this.props

		const next = <span className={ classNames(style.next) }> > </span>

		return (
			<div  className={ classNames(style.navFixed) }>
				<div className={ classNames(style.breadCrumb) }>
					<span className={ classNames(style.university) }>
						{
							university ? (
								<span className={ classNames(style.clickable) }>
									{ university.shortName }
								</span>
							) : (
								'Select an University'
							)
						}
					</span>
					{
						university && next
					}
				</div>
			</div>
		)
	}
}

Nav.propTypes = {}

Nav.defaultProps = {}

export default withRouter(connect(
	state => ({
		university: state.core.university,
		cohort: state.core.cohort,
		student: state.core.student
	})
)(Nav))