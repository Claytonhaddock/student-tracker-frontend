import {
    SELECT_UNI,
    SELECT_COHORT,
    GO_HOME_DUDE
} from '../constants/core'



export const  goHome = (uni) => {
    return {
        type: GO_HOME_DUDE
    }
}

export const  selectUniveristy = (uni) => {
    return {
        type: SELECT_UNI,
        data: uni
    }
}

export const  selectCohort = (cohort) => {
    return {
        type: SELECT_COHORT,
        data: cohort
    }
}