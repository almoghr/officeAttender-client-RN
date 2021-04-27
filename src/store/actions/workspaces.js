import {gqlClient} from '../../graphql/client';
import {SET_WORKSPACES} from '../constants/workspaces';
import {GET_ALL_WORKSPACES} from '../../graphql/queries';

const client = gqlClient()

export const setAllWorkspaces = () => async dispatch => {
    try{
        client.query({query: GET_ALL_WORKSPACES}).then(result => dispatch({type: SET_WORKSPACES, payload: result.data.workspaces}))
    } catch(e){
        console.log(e)
    }
}
