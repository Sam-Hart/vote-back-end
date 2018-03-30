import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {reducer} from '../src/reducer';

describe('reducer', () => {
    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['Roma']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Roma']
        }));
    });
    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {
            type: 'SET_ENTRIES',
            entries: ['Rum and Pirates']
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Rum and Pirates']
        }));
    });
    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Bora Bora', 'Macao']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Bora Bora', 'Macao']
            },
            entries: []
        }));
    });
    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Trajan', 'Merlin']
            },
            entries: []
        });
        const action = {
            type: 'VOTE',
            entry: 'Merlin'
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trajan', 'Merlin'],
                tally: {
                    Merlin: 1
                }
            },
            entries: []
        }));
    });
    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Carpe Diem', 'La Isla']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Carpe Diem'},
            {type: 'VOTE', entry: 'La Isla'},
            {type: 'VOTE', entry: 'Carpe Diem'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());
        expect(finalState).to.equal(fromJS({
            winner: 'Carpe Diem'
        }));
    });
});
