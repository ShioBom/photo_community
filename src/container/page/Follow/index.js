import { connect } from 'react-redux';
import Follow from "../../../components/page/Follow";

const mapStateToProps = function (state) {
   return {
       login:state.login,
       FollowList: state.FollowList
   }
}
const mapDispatchToProps = function (dispatch, newVal) {
    return {
        addFollowList(obj) {
            dispatch({ "type": "addFollowList", obj });
        },
        removeFollow(ind) {
            dispatch({ "type": "removeFollow", ind });
        },
        addFollow(obj) {
            dispatch({ "type": "addFollow", obj })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Follow);