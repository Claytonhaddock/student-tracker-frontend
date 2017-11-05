import {
	SELECT_UNI,
	GO_HOME_DUDE,
	SELECT_COHORT,
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
		
		default:
			return state
	}
}

export default core