const part = {
  state: {

    framworkerTwo: 101, //架构二
    framworkerthree: [98, 104], //架构三
    framworkerthreeRouter: '', //架构三
    GeneralPartyBranch: '' //二层结构

  },

  mutations: {
    FRAM_TWO: (state, msg) => {
      state.framworkerTwo = msg
    },
    FRAN_THREE: (state, msg) => {
      state.framworkerthree = msg
    },
    FRAN_THREE_ROUTER: (state, msg) => {
      state.framworkerthreeRouter = msg
    },
    FRAN_BPG : (state, msg) => {
      state.GeneralPartyBranch = msg
    }
  }
}
export default part
