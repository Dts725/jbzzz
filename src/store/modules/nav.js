const nav = {
  state: {
    flag: true,
    id: {
      id: 0,
      organization_name: '进博一线党组织y'
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
