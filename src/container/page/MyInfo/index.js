import {connect} from 'react-redux';
import MyInfo from '../../../components/page/MyInfo';

const mapStateToProps = function(state){
    return {
        login:state.login
    }
}
const mapDispathchToProps = function(dispatch){
    return {
        remove(){
            dispatch({type:"remove"})
        }
    }
}

export default connect(mapStateToProps,mapDispathchToProps)(MyInfo);
