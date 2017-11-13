import {
	SELECT_UNI,
	GO_HOME_DUDE,
	SELECT_COHORT,
	SELECT_STUDENT,
	NAV_GO_TO
} from '../constants/core'

const initialState = {
	university: null,
	cohort: null,
	student: null
}

const core = (state = initialState, action) => {
	switch(action.type){
		case GO_HOME_DUDE: 
			return {
				...state,
				university: null,
				cohort: null,
				student: null
			}

		case NAV_GO_TO: 
			return {
				...state,
				...action.data
			}
	
		case SELECT_UNI: 
			return {
				...state,
				university: action.data
			}

		case SELECT_COHORT: 
			return {
				...state,
				cohort: action.data
			}

		case SELECT_STUDENT: 
			return {
				...state,
				student: action.data
			}
		
		default:
			return state
	}
}

export default core