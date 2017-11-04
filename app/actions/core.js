import {
    SELECT_UNI
} from '../constants/core'

export const  selectUniveristy = (uni) => {
    return {
        type: SELECT_UNI,
        data: uni
    }
}