export const setGameState = (state : any, gameState : any) : void => {
    state.game.id = gameState.id;
    state.game.starting_team = gameState.starting_team;
    state.game.cards = gameState.cards;
}

export const setNickname = (state : any, nickname: string) : void => {
    state.nickname = nickname;
}

export const addPlayers = (state : any, players : any) => {
    if (!players) return;
    if (Array.isArray(players)) {
        for (const player of players) {
            state.game[player.team].push(player);
        }
    } else {
        state.game[players.team].push(players);
    }
}

export  const removePlayer = (state : any, player : any) => {
    state.game[player.team] = state.game[player.team].filter((pl : any) => pl.nickname !== player.nickname)
}