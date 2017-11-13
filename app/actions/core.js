import {
    SELECT_UNI,
    SELECT_COHORT,
    SELECT_STUDENT,
    GO_HOME_DUDE,
    NAV_GO_TO
} from '../constants/core'



export const  goHome = () => {
    return {
        type: GO_HOME_DUDE
    }
}

export const  navGoTo = (newObj) => {
    return {
        type: NAV_GO_TO,
        data: newObj
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

export const  selectStudent = (student) => {
    return {
        type: SELECT_STUDENT,
        data: student
    }
}