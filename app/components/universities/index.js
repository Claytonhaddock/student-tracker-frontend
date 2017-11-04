import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Box from '../common/box'
import uclaIcon from '../../assets/samples/uclaIcon.png'
import style from './style.scss'

class Universities extends Component {

	constructor(props){
		super(props)

		this._generateBoxHeader = this._generateBoxHeader.bind(this)
	}


	_logout(history){
		const { dispatch } = this.props
		// dispatch(signOut(history))
	}

	_generateBoxHeader(uni){

		return (
			<div className={ classNames(style.headerWrapper) }>
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
			universities
		} = this.props

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
									<span>Children</span>
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
			address: 'Los Angeles, CA 90095',
			icon: uclaIcon,
			ongoingCohorts: [1,2,3,4],
			completedCohorts: [1,2,3,4,5],
			primaryColor: '#3284BF',
			secondaryColor: '#FFE800'
		}
	]
}

export default withRouter(connect(
	state => ({
	})
)(Universities))