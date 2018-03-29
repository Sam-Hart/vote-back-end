import {List, Map} from 'immutable';

let setEntries = (state, entries) => state.set('entries', List(entries)),
    next = (state) => {
        const entries = state.get('entries');
        return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
        });
    },
    vote = (state, entry) => state.updateIn(
        ['vote', 'tally', entry],
        0,
        tally => tally + 1
    );

export {
    setEntries,
    next,
    vote
};
