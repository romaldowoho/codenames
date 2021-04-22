export const setGameState = ({ commit } : any, gameState: object) => {
    commit('setGameState', gameState);
}

export const setNickname = ({ commit } : any, nickname: string) => {
    commit('setNickname', nickname);
}

export const addPlayers = ({ commit } : any, players : any) => {
    commit('addPlayers', players);
}

export  const removePlayer = ({ commit } : any, player : any) => {
    commit('removePlayer', player);
}

