import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries} from '../src/core';

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
});
