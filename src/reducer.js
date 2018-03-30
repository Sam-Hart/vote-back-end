import {setEntries, next, vote, INITIAL_STATE} from './core';

let reducer = (state = INITIAL_STATE, action) => {
    // Determines what function is needed and calls that function
    switch (action.type) {
    case 'SET_ENTRIES':
        return setEntries(state, action.entries);
    case 'NEXT':
        return next(state);
    case 'VOTE':
        return state.update(
            'vote',
            voteState => vote(voteState, action.entry)
        );
    }
    return state;
};

export {
    reducer
};
