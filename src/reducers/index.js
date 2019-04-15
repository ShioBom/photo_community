const initialState = {
  login: JSON.parse(sessionStorage.getItem("userInfo") || "{}"),
  FollowList: JSON.parse(sessionStorage.getItem("FollowList") || "[]")
};

//定义改变状态的方法,对state进行增删查改
const reducers = function(state = initialState, action) {
  switch (action.type) {
    //向仓储里添加登录信息
    case "add":
      state.login = action.obj;
      //将数据存储到sessionStorage中
      sessionStorage.setItem("userInfo", JSON.stringify(action.obj));
      return state;
    case "remove":
      let newState3 = JSON.parse(JSON.stringify(state));
      newState3 = {
        FollowList:[],
        login:{}
      }
      return newState3;
    //向仓储里添加关注列表
    case "addFollowList":
      state.FollowList = action.obj;
      sessionStorage.setItem("FollowList", JSON.stringify(action.obj));
      return state;
    //移除某条关注
    case "removeFollow":
      let newState = JSON.parse(JSON.stringify(state));
      newState.FollowList.splice(action.ind, 1);
      if (newState.FollowList.length === 0) {
        sessionStorage.removeItem("FollowList");
      } else {
        sessionStorage.setItem("FollowList", JSON.stringify(newState.FollowList));
      }
      return newState;
    //添加某条关注
    case "addFollow":
      let newState2 = JSON.parse(JSON.stringify(state));
      newState2.FollowList.push(action.obj);
      sessionStorage.setItem("FollowList", JSON.stringify(newState2.FollowList));
      return newState2;
    default:
      return state;
  }
};
export default reducers;
