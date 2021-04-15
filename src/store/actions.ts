export const setGameState = ({ commit } : any, gameState: object) => {
    commit('setGameState', gameState);
}

export const setNickname = ({ commit } : any, nickname: string) => {
    commit('setNickname', nickname);
}

