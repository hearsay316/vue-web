import {INCREMENT,DECREMENT} from '../action-types'
export default function reducer(state={number:0},action){
    switch(action.type){
        case INCREMENT:
            return {number:state.number+action.count};
        case DECREMENT:
            return {number:state.number-action.count};
        default:
    }
    return state;
}