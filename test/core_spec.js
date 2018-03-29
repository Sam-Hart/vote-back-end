import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
    describe('setEntries', () => {
        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('Notre Dame', 'Bora Bora');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Notre Dame', 'Bora Bora')
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const entries = ['Bora Bora', 'Rum and Pirates'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Bora Bora', 'Rum and Pirates')
            }));
        });
    });

    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of(
                    'Bora Bora',
                    'Macao',
                    'Rum and Pirates'
                )
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Bora Bora', 'Macao')
                }),
                entries: List.of('Rum and Pirates')
            }));
        });
    });

    describe('vote', () => {
        it('creates a tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trajan', 'Macao')
                }),
                entries: List()
            });
            const nextState = vote(state, 'Trajan');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trajan', 'Macao'),
                    tally: Map({
                        'Trajan': 1
                    })
                }),
                entries: List()
            }));
        });

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trajan', 'Macao'),
                    tally: Map({
                        'Trajan': 3,
                        'Macao': 2
                    })
                }),
                entries: List()
            });
            const nextState = vote(state, 'Trajan');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trajan', 'Macao'),
                    tally: Map({
                        'Trajan': 4,
                        'Macao': 2
                    })
                }),
                entries: List()
            }));
        });
    });
});
