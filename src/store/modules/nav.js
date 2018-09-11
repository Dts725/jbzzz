const nav ={
  state: {
      flag: true
    },


    mutations: {
      BREAD_NAV: (state, msg) => {
        state.flag = msg;
      }
    }


}
  export default nav
