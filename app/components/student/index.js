import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'

import style from './style.scss'

class Student extends Component {

	constructor(props){
		super(props)

		this.state = {
			isWritingNewSession: false,
			sessions: props.sessions
		}

		this._toggleWritingSession = this._toggleWritingSession.bind(this)
		this._handleSubmit = this._handleSubmit.bind(this)
	}

	_toggleWritingSession(status){
		this.setState({ isWritingNewSession: status })
	} 

	_handleTextInput(type, input){
		this.setState({ [type]: input })
	}

	_handleSubmit(){
		const newSession = {
			date: (new Date()).toLocaleDateString(),
			reflection: this.state.newReflection,
			action: this.state.newAction
		}
		this.setState({ sessions: [ newSession, ...this.state.sessions ], isWritingNewSession: false })
	}

	render(){
		const {
			avatar,
			fullName,
			github,
			educationBackground,
			careerBackground,
			endGoal,
			codingExperience,
			latestHW
		} = this.props

		const {
			isWritingNewSession,
			sessions,
			newReflection,
			newAction
		} = this.state

		const latestSession= sessions[0]
		return (
			<div className={ classNames(style.studentContainer) }>
				{ !isWritingNewSession && (
					<div>
						<div className={ classNames(style.basicInfoWrapper) }>
							<img src={ avatar } alt="Avatar Picture"/>
							<div>
								<h2>{ fullName }</h2>
								<a href={ `https://www.github.com/${github}` }>@{ github }</a>
							</div>
						</div>
						<div className={ classNames(style.backgroundInfo) }>
							<div>
								<span className={ classNames(style.header) }>Education Background</span>
								<p className={ classNames(style.info) }>{ educationBackground }</p>
							</div>
							<div>
								<span className={ classNames(style.header) }>Career Background</span>
								<p className={ classNames(style.info) } >{ careerBackground }</p>
							</div>
							<div>
								<span className={ classNames(style.header) }>Coding Experience</span>
								<p className={ classNames(style.info) }>{ codingExperience }</p>
							</div>
							<div>
								<span className={ classNames(style.header) }>End Goal</span>
								<p className={ classNames(style.info) }>{ endGoal }</p>
							</div>
						</div>
					</div>
				)}
				<div className={ classNames(style.intructionalWrapper) }>
					<div className={ classNames(style.header) }>
						<span>
							Session
						</span>	
						{ 
							isWritingNewSession ? (
								<div 
									className={ classNames(style.cancel) }
									onClick={ () => this._toggleWritingSession(false) }
								/>
							) : (
								<div 
									className={ classNames(style.write) }
									onClick={ () => this._toggleWritingSession(true) }
								/>
							) 
						}
					</div>
					<div>
						<div className={ classNames(style.sessionWrapper) }>
							<span>{latestHW.date}</span>
							<div className={ classNames(style.session) }>
								<h5>Latest HW Feedback
									<span>{latestHW.assignment}: {latestHW.grade}</span>
								</h5>
								<p>{ latestHW.feedback }</p>
							</div>
						</div>
						<div className={ classNames(style.sessionWrapper) }>
							<span>{ latestSession.date }</span>
							<div className={ classNames(style.session) }>
								<h5>Reflection</h5>
								<p>{ latestSession.reflection }</p>
							</div>
							<div className={ classNames(style.session) }>
								<h5>Action</h5>
								<p>{ latestSession.action }</p>
							</div>
						</div>
					</div>
					{
						isWritingNewSession && (
							<div>
								<div className={ classNames(style.sessionWrapper) }>
									<div className={classNames(style.session)}>
										<h5>Reflection</h5>
										<textarea 
											className={ classNames(style.textarea) }
											onChange={ e => this._handleTextInput('newReflection', e.target.value) }											
										>
											{ newReflection }
										</textarea>
									</div>
									<div className={classNames(style.session)}>
										<h5>Action</h5>
										<textarea 
											className={ classNames(style.textarea) }
											onChange={ e => this._handleTextInput('newAction', e.target.value) }											
										>
											{ newAction }
										</textarea>
									</div>
									<button
										onClick={ this._handleSubmit }
										className={ classNames(style.submit) }
									>
										Submit
									</button>
								</div>
							</div>
						)
					}
				</div>
			</div>
		)
	}
}

Student.propTypes = {}

Student.defaultProps = {
	avatar: 'https://avatars1.githubusercontent.com/u/27797510?v=4',
	fullName: 'John Doe',
	github: 'jd123',
	educationBackground: 'UCLA B.S. Biology',
	careerBackground: 'EMT for 3 years',
	endGoal: 'Position as Frontend Junior Developer',
	codingExperience: 'Basic HTML/CSS',
	sessions : [
		{
			date: '11/07/2017',
			reflection: 'Working on the backend is slight more challenging than the frontend, having a difficult time remembering debugging and with async functions.',
			action: 'Practice javascript algorithm in Code War, also approach potential clients for project 2'
		}
	],
	latestHW: {
		date: '11/05/2017',
		grade: 'B+',
		assignment: 'Express.js',
		feedback: `You app works well and code looks clean. However, I would catch error in all your server response. Otherwise, Nice work!`
	}
}

export default withRouter(connect(
	state => ({
	})
)(Student))