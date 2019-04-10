import {connect} from 'react-redux';
import Index from '../../../../components/page/Main/Index/index.js';

const mapStateToProps = function (state) {
    return {
        login:state.login,
        FollowList: state.FollowList
    }
}
const mapDispatchToProps=function(dispatch){
    return {
        removeFollow(ind){
            dispatch({ "type":"removeFollow",ind});
        },
        addFollow(obj){
            dispatch({"type":"addFollow",obj})
        }
    }
} 
export default connect(mapStateToProps,mapDispatchToProps)(Index);