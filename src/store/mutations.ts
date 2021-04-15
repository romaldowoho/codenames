export const setGameState = (state : any, gameState : object) : void => {
    state.game = gameState;
}

export const setNickname = (state : any, nickname: string) : void => {
    state.nickname = nickname;
}