import  {createStore} from "vuex";
import  * as mutations from './mutations'
import  * as actions from './actions'

const state = {
    game: {
        id: null,
        starting_team: null,
        winner_team: null,
        cards: [],
        blue_team: [],
        red_team: [],
        game_log: []
    },
    nickname: null
}

export  default createStore({
    state,
    actions,
    mutations
})