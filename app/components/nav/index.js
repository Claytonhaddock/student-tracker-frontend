import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'

import style from './style.scss'

import {
	goHome 
} from '../../actions/core'

class Nav extends Component {

	constructor(props){
		super(props)

		this._goHome = this._goHome.bind(this)
	}


	_logout(history){
		const { dispatch } = this.props
		// dispatch(signOut(history))
	}

	_goHome(){
		const {
			dispatch
		} = this.props

		dispatch(goHome())
	}

	render(){
		const {
			university,
			cohort,
			student
		} = this.props

		const Next = () => <span className={ classNames(style.next) }> > </span>

		return (
			<div  className={ classNames(style.navFixed) }>
				<div className={ classNames(style.breadCrumb) }>
					<span 
						className={ classNames(style.home, style.clickable) }
						onClick={ this._goHome }
					>
						HOME
					</span>
					<Next />
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
						university && <Next />
					}
					<span className={ classNames(style.cohort) }>
						{
							university && (cohort ? (
									<span className={ classNames(style.clickable) }>
										{ cohort }
									</span>
								) : (
									'Select a Cohort'
								))
						}
					</span>
					{
						university && cohort && <Next />
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