import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Std from '../../../assets/images/std.svg'
import Board from '../../../assets/images/board.svg'

import style from './style.scss'

class Cohort extends Component {

	constructor(props){
		super(props)
	}



	render(){
        const {
            primaryColor,
            type,
            cohortId,
            startDate,
            endDate,
            classes,
            students,
            selectCohort
        } = this.props

		return (
			<div 
                className={ classNames(style.cohortContainer) }
                style={{ backgroundColor: primaryColor}}
                onClick={ () => selectCohort(cohortId) }
            >
                <div className={ classNames(style.textWrapper) }>
                    <div className={ classNames(style.meta) }>
                        <h3>{ cohortId }</h3>
                        <span>{ type }</span>
                    </div>
                    <div className={ classNames(style.dateInfo) }>
                        <div>
                            <span>
                                Start Date
                            </span> 
                            <span>
                                { startDate }
                            </span>
                        </div>
                        <div>
                            <span>
                                End Date
                            </span> 
                            <span>
                                { endDate }
                            </span>
                        </div>
                    </div>
                </div>

                <div className={ classNames(style.numbersWrapper) } >
                    <div className={ classNames(style.number) }>
                        <span>{ classes.length }</span>
                        <div 
                            className={ classNames(style.symbol) }
                            style={{ backgroundImage: `url(${Board})` }}

                        />
                    </div>
                    <div className={ classNames(style.number) }>
                        <span>{ 20 }</span>
                        <div 
                            className={ classNames(style.symbol) }
                            style={{ backgroundImage: `url(${Std})` }}
                        />
                    </div>
                </div>

			</div>
		)
	}
}

Cohort.propTypes = {}

Cohort.defaultProps = {
    primaryColor:`#3284BF`,
    cohortId: 'UCLA201708FSF2',
    type: 'Part Time',
    startDate: '07 Aug 2017',
    endDate: '10 Feb 2017',
    classes: [1,2],
    students: [1,2,3,4,5]
}

export default Cohort