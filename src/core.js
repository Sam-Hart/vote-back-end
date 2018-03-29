import {List} from 'immutable';

let setEntries = (state, entries) => state.set('entries', List(entries));
export {setEntries};
