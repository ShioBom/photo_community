import {connect} from 'react-redux';
import Login from '../../../components/page/Login';

const mapStateToProps = function (state) {
    console.log(state.uname);
    return {
        login:state.login
    }
}
const mapDispatchToProps=function(dispatch,newVal){
    return {
        addFollowList(obj) {
            dispatch({ "type": "addFollowList", obj });
        },
        add(obj){
            dispatch({"type":"add",obj});
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);