import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
    describe('A List', () => {
        let addBoardGame = (currentState, game) => currentState.push(game);
        it('is immutable', () => {
            let state = List.of('Castles of Burgundy', 'Bora Bora');
            let nextState = addBoardGame(state, 'Trajan');
            expect(nextState).to.equal(
                List.of(
                    'Castles of Burgundy',
                    'Bora Bora',
                    'Trajan'
                )
            );
            expect(state).to.equal(
                List.of(
                    'Castles of Burgundy',
                    'Bora Bora'
                )
            );
        });
    });
    describe('a tree', () => {
        let addBoardGame = (currentState, boardGame) => {
            return currentState.set(
                'boardGames',
                currentState.get('boardGames').push(boardGame)
            );
        };

        it('is immutable', () => {
            let state = Map({
                boardGames: List.of(
                    'Castles of Burgundy',
                    'Notre Dame'
                )
            });
            let nextState = addBoardGame(state, 'Macao');
            expect(nextState).to.equal(Map({
                boardGames: List.of(
                    'Castles of Burgundy',
                    'Notre Dame',
                    'Macao'
                )
            }));
            expect(state).to.equal(Map({
                boardGames: List.of(
                    'Castles of Burgundy',
                    'Notre Dame'
                )
            }));
        });
    });
});
