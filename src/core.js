import {List, Map} from 'immutable';

const INITIAL_STATE = Map();

let setEntries = (state, entries) => state.set('entries', List(entries)),
    next = (state) => {
        const entries = state
            .get('entries')
            .concat(
                getWinners(state.get('vote'))
            );
        if (entries.size === 1) {
            return state
                .remove('vote')
                .remove('entries')
                .set('winner', entries.first());
        }
        return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
        });
    },
    vote = (voteState, entry) => voteState.updateIn(
        ['tally', entry],
        0,
        tally => tally + 1
    ),
    getWinners = (vote) => {
        if (!vote) return [];
        const [a, b] = vote.get('pair'),
            aVotes = vote.getIn(['tally', a], 0),
            bVotes = vote.getIn(['tally', b], 0);
        if (aVotes > bVotes) return [a];
        else if (aVotes < bVotes) return [b];
        else return [a, b];
    };

export {
    setEntries,
    next,
    vote,
    INITIAL_STATE
};
