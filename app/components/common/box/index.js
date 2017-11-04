import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'

import style from './style.scss'

class Box extends Component {

	constructor(props){
		super(props)
	}

	render(){
        const {
            primaryColor, 
            secondaryColor, 
            headerContent,
            children
        } = this.props


		return (
			<div>
                <div 
					className={ classNames(style.boxContainer) }
					style={{ 
                        borderColor: primaryColor, 
                        color: secondaryColor
                    }}
				>
					<div  
                        className={  classNames(style.headerWrapper) }
                        style={{ backgroundColor: primaryColor }}
                    >
                        { headerContent }
					</div>
                    <div className={ classNames(style.contentWrapper) } >
                        { children }
                    </div>
                </div>
			</div>
		)
	}
}

Box.propTypes = {}

Box.defaultProps = {
    customStyle: {}
}

export default Box