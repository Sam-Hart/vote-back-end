import {createStore} from 'redux';
import {reducer} from './reducer';

let makeStore = () => createStore(reducer);

export default makeStore;
