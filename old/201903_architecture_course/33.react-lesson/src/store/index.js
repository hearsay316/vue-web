import reducer from './reducers/index';
import {createStore} from '../redux'
let store  = createStore(reducer)
window.store = store;
export default store