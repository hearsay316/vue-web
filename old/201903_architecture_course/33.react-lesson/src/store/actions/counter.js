import {INCREMENT,DECREMENT} from '../action-types'
let actions = {
    add(val){
        return {type:INCREMENT,count:val}
    },
    minus(val){
        return {type:DECREMENT,count:val}
    }
}
export default actions;