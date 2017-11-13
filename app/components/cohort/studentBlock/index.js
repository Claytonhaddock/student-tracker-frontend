import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'

import style from './style.scss'

class StudentBlock extends Component {

	constructor(props){
        super(props)
        
        this.state = {
        }
	}

	render(){
        const {
            avatar,
            fullName,
            github,
            student,
            selectStudent
        } = this.props
		return (
			<div 
                className={ classNames(style.studentBlock) }
                onClick={ () => selectStudent(student) }
            >
                <img src={ avatar } alt="Avatar Picture"/>
                <div>
                    <p>{ fullName }</p>
                    <a href={ `https://github.com/${github}` }>
                        @{ github }
                    </a>
                </div>
			</div>
		)
	}
}

StudentBlock.propTypes = {}

StudentBlock.defaultProps = {
    avatar: 'https://avatars1.githubusercontent.com/u/27797510?v=4',
    fullName: 'John Doe',
    github: 'jd123'
}

export default withRouter(connect(
	state => ({
	})
)(StudentBlock))