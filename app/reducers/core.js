import {
    SELECT_UNI
} from '../constants/core'

const initialState = {
}

const core = (state = initialState, action) => {
	switch(action.type){
		case SELECT_UNI: 
			return {
				...state,
				university: action.data
			}
		
		default:
			return state
	}
}

export default core