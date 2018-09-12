const nav = {
  state: {
    flag: true,
    id: {
      id: 0,
      organization_name: '组织架构'
    }
  },


  mutations: {
    BREAD_NAV: (state, msg) => {
      state.flag = msg;
    },
    BREAD_SID_ID: (state, msg) =>{
      state.id = msg;
    }
  }


}
export default nav
