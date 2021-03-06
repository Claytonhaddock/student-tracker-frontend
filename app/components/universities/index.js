import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Box from '../common/box'
import Cohort from './cohortBlock'
import uclaIcon from '../../assets/samples/uclaIcon.png'
import style from './style.scss'

import {
	selectUniveristy,
	selectCohort
} from '../../actions/core'

class Universities extends Component {

	constructor(props){
		super(props)

		this.state = {
			selectedUniversity: null
		}

		this._generateBoxHeader = this._generateBoxHeader.bind(this)
		this._handleSelectUniversity = this._handleSelectUniversity.bind(this)
		this._handleSelectCohort = this._handleSelectCohort.bind(this)
	}



	_logout(history){
		const { dispatch } = this.props
		// dispatch(signOut(history))
	}

	_handleSelectUniversity(uni){
		const {
			dispatch
		} = this.props

		dispatch(selectUniveristy(uni))
	}

	_handleSelectCohort(cohort){
		const {
			dispatch,
			university,
			history
		} = this.props
		history.push(`/${university.shortName}/${cohort}`)
		dispatch(selectCohort(cohort))
	}

	_generateBoxHeader(uni){

		return (
			<div 
				className={ classNames(style.headerWrapper) }
				onClick={ () => this._handleSelectUniversity(uni) }
			>
				<div>
					<div 
						className={ classNames(style.uniIcon) }
						style={{ backgroundImage: `url(${uni.icon})` }}
					/>
					<div className={ classNames(style.nameAddress) }>
						<h2>{ uni.fullName }</h2>
						<h4>{ uni.address }</h4>
					</div>
				</div>
				<div>
					<div className={ classNames(style.cohorts) }>
						<span>Ongoing Cohorts</span>
						<span>{ 3 }</span>
					</div>
					<div className={ classNames(style.cohorts) }>
						<span>Completed Cohorts</span>
						<span>{ 4 }</span>
					</div>
				</div>
			</div>
		)
	}


	render(){
		const {
			universities,
			university,
		} = this.props

		const {
			selectedUniversity
		} = this.state

		return (
			<div>
				{
					universities && universities.map(uni => {
						const headerContent = this._generateBoxHeader(uni)

						return (
							<div 
								key={ uni.id }
								className={ classNames(style.uniWrapper) }
							>
								<Box
									headerContent={ headerContent }
									primaryColor={ uni.primaryColor }
									secondaryColor={ uni.secondaryColor }
								>
									{
										(university && university.id === uni.id) && (
											<div className={ classNames(style.cohortsWrapper) }>
												{
													uni.cohorts.map((cohort,i) => (
														<Cohort 
															key={ i }
															primaryColor={ uni.primaryColor }
															selectCohort={ this._handleSelectCohort }
														/>
													))
												}
											</div>
										)
									}
								</Box>	
							</div>
						)
					})
				}
			</div>
		)
	}
}

Universities.propTypes = {}

Universities.defaultProps = {
	universities: [
		{
			id: '1',
			fullName: 'University of California, Los Angeles',
			shortName: 'UCLA',
			address: 'Los Angeles, CA 90095',
			icon: uclaIcon,
			ongoingCohorts: [1,2,3,4],
			completedCohorts: [1,2,3,4,5],
			primaryColor: '#3284BF',
			secondaryColor: '#FFE800',
			cohorts: [
				1,2,3,4
			]
		}
	]
}

export default withRouter(connect(
	state => ({
		university: state.core.university,
		cohort: state.core.cohort,
		student: state.core.student
	})
)(Universities))