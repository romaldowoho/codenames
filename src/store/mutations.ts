export const setGameState = (state : any, gameState : any) : void => {
    state.game.id = gameState.id;
    state.game.starting_team = gameState.starting_team;
    state.game.cards = gameState.cards;
}

export const setNickname = (state : any, nickname: string) : void => {
    state.nickname = nickname;
}

export const addPlayer = (state : any, player : any) => {
    state.game[player.team].push(player);
}