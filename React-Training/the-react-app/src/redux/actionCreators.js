import Axios from "axios"

export const createINCAction = () => {
    return{
        type: "INC_CTR"
    }
}

export const createDECRAction = () => {
    return{
        type: "DECR_CTR"
    }
}

export const createFCAction = () => {
    return async (dispatch) => {
        //Async call
        const resp = await Axios.get("http://localhost:9000/customers");
        dispatch({
            type: "FETCH_CUSTOMERS",
            payload: resp.data
        });
    }
}