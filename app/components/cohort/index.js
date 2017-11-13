import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import StudentBlock from './studentBlock'

import style from './style.scss'

import {
	selectStudent
} from '../../actions/core'

class Cohort extends Component {

	constructor(props){
        super(props)
        
        this.state = {
            isOnOverview: true
        }

        this._hanldeChangeViewState = this._hanldeChangeViewState.bind(this)
        this._selectStudent = this._selectStudent.bind(this)
	}


	_hanldeChangeViewState(status){
		this.setState({ isOnOverview: status })
    }

    _selectStudent(student){
        const {
            history,
            university,
            cohort,
            dispatch
        } = this.props
        history.push(`/${university.shortName}/${cohort}/${student.id}`)
        dispatch(selectStudent(student))
    }
    
    _generateOverview(){
        const {
            title,
            name,
            type,
            range, 
            instructor,
            ssm,
            ta,
            careerCoach,
            classInfo
        } = this.props

        return (
            <div className={ classNames(style.overviewContainer) }>
                <h3 className={ classNames(style.nameType) }>{ name } · { type }</h3>
                <div className={ classNames(style.infoWrapper) }>
                    <h5 className={ classNames(style.infoHeader) }>Duration</h5>
                    <span>{ range }</span>
                </div>
                <div className={ classNames(style.people) }>
                    <div className={ classNames(style.infoWrapper) }>
                        <h5 className={ classNames(style.infoHeader) }>Instructor</h5>
                        <span>{ instructor }</span>
                    </div>
                    <div className={ classNames(style.infoWrapper) }>
                        <h5 className={ classNames(style.infoHeader) }>SSM</h5>
                        <span>{ ssm }</span>
                    </div>
                    <div className={ classNames(style.infoWrapper) }>
                        <h5 className={ classNames(style.infoHeader) }>TA</h5>
                        <p>{ ta }</p>
                    </div>
                    <div className={ classNames(style.infoWrapper) }>
                        <h5 className={ classNames(style.infoHeader) }>Career Coach</h5>
                        <span>{ careerCoach }</span>
                    </div>
                </div>
                <div className={ classNames(style.infoWrapper, style.timeLocationWrapper) }>
                    <h5 className={ classNames(style.infoHeader) }>Time & Location</h5>
                    <div className={ classNames(style.flexWrapper) }>
                        {
                            classInfo.map((info, i) => {
                                const {
                                    date,
                                    time, 
                                    address
                                } = info
                                return (
                                    <div key={ title + date } className={ classNames(style.timeLocationBlock) }>
                                        <span className={ classNames(style.date) }>{ date }</span>
                                        <span className={ classNames(style.time) }>{ time }</span>
                                        <div className={ classNames(style.address) }>
                                            {
                                                address.map((a,i) => (
                                                    <p key={ a + i }>{ a }</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

	render(){
        const {
            isOnOverview
        } = this.state
        const {
            title,
            students
        } = this.props

		return (
			<div>
				<div className={ classNames(style.cohortNavWrapper) }>
                    <span 
                        className={ classNames(style.cohortNav, isOnOverview && style.cohortNavActive ) }
                        onClick={ () => this._hanldeChangeViewState(true) }
                    >
                        Overview
                    </span>
                    <span 
                        className={ classNames(style.cohortNav, !isOnOverview && style.cohortNavActive) }
                        onClick={ () => this._hanldeChangeViewState(false) }
                    >
                        Students
                    </span>
                    <span
                        className={ classNames(style.classIdHeader) }
                    >
                        { title }
                    </span>
                </div>
                {
                    isOnOverview ? (
                        this._generateOverview.call(this)
                    ) : (
                        <div className={ classNames(style.students) }>
                            {
                                students.map(std => (
                                    <StudentBlock 
                                        key={ std.id }
                                        fullName={ std.fullName }
                                        github={ std.github }
                                        student={ std }
                                        selectStudent={ this._selectStudent }
                                    />
                                ))
                            }
                        </div>
                    )
                }
			</div>
		)
	}
}

Cohort.propTypes = {}

Cohort.defaultProps = {
    title: 'UCLA201708FSF2',
    name: 'Full Stack Web Development',
    type: 'Part Time',
    range: 'Aug 7th 2017 -> Feb 10th 2018',
    instructor: 'Omar Patel',
    ssm: 'JP Alferos',
    ta: 'Keith To · Paige Pittman · Clay Haddock · Nannette Julius',
    careerCoach: 'Jenna Fuentes',
    classInfo: [
        {
            date: 'M/W',
            time: '6:30p - 9:30p', 
            address: ['UNEX 215', '10995 Le Conte Ave', 'Los Angeles, CA 90024']
        },
        {
            date: 'Tu/Th',
            time: '6:30p - 9:30p', 
            address: ['UNEX 215', '10995 Le Conte Ave', 'Los Angeles, CA 90024']
        },
        {
            date: 'Sa',
            time: '9:30a - 2:30p', 
            address: ['UNEX P1', '10995 Le Conte Ave', 'Los Angeles, CA 90024']
        },
    ],
    students: [
        {
            id: '1',
            fullName: 'John Doe',
            github: 'jd123',
        },
        {
            id: '2',
            fullName: 'John Doe',
            github: 'jd123',
        },
        {
            id: '3',
            fullName: 'John Doe',
            github: 'jd123',
        },
        {
            id: '4',
            fullName: 'John Doe',
            github: 'jd123',
        },
        {
            id: '5',
            fullName: 'John Doe',
            github: 'jd123',
        },
        {
            id: '6',
            fullName: 'John Doe',
            github: 'jd123',
        },
    ]
}

export default withRouter(connect(
	state => ({
        university: state.core.university,
		cohort: state.core.cohort,
		student: state.core.student
	})
)(Cohort))