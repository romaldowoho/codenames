export const setGameState = ({ commit } : any, gameState: object) => {
    commit('setGameState', gameState);
}

export const setNickname = ({ commit } : any, nickname: string) => {
    commit('setNickname', nickname);
}

export const addPlayer = ({ commit } : any, player : any) => {
    commit('addPlayer', player);
}

