//액션 타입
const LIKE_REQUEST = 'board/LIKE_REQUEST' as const;
const LIKE_SUCCESS = 'board/LIKE_SUCCESS' as const;
const LIKE_FAILURE = 'board/LIKE_FAILURE' as const;

const SAVE_REQUEST = 'board/SAVE_REQUEST' as const;
const SAVE_SUCCESS = 'board/SAVE_SUCCESS' as const;
const SAVE_FAILURE = 'board/SAVE_FAILURE' as const;

const EDIT_REQUEST = 'board/EDIT_REQUEST' as const;
const EDIT_SUCCESS = 'board/EDIT_SUCCESS' as const;
const EDIT_FAILURE = 'board/EDIT_FAILURE' as const;

const DELETE_REQUEST = 'board/DELETE_REQUEST' as const;
const DELETE_SUCCESS = 'board/DELETE_SUCCESS' as const;
const DELETE_FAILURE = 'board/DELETE_FAILURE' as const;

//액션 생성 함수
export const likeRequest = () => ({
    type: LIKE_REQUEST
});
export const likeSuccess = () => ({
    type: LIKE_SUCCESS
});
export const likeFailure = () => ({
    type: LIKE_FAILURE
});

export const saveRequest = () => ({
    type: SAVE_REQUEST
});
export const saveSuccess = () => ({
    type: SAVE_SUCCESS
});
export const saveFailure = () => ({
    type: SAVE_FAILURE
});

export const editRequest = () => ({
    type: EDIT_REQUEST
});
export const editSuccess = () => ({
    type: EDIT_SUCCESS
});
export const editFailure = () => ({
    type: EDIT_FAILURE
});

export const deleteRequest = () => ({
    type: DELETE_REQUEST
});
export const deleteSuccess = () => ({
    type: DELETE_SUCCESS
});
export const deleteFailure = () => ({
    type: DELETE_FAILURE
});

interface stateType{
    loading:{
        like:boolean,
        save:boolean,
        edit:boolean,
        delete:boolean
    },
    board:any
}

const initialState:stateType = {
    loading: {
        like:false,
        save:false,
        edit: false,
        delete: false
    },
    board: []
}


const handleBoard=(state=initialState, action:any)=>{
    switch(action.type){
        case LIKE_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    like: true
                }
            }

        case LIKE_SUCCESS:


        case LIKE_FAILURE:



        case SAVE_REQUEST:


        case SAVE_SUCCESS:


        case SAVE_FAILURE:



        case EDIT_REQUEST:


        case EDIT_SUCCESS:


        case EDIT_FAILURE:



        case DELETE_REQUEST:


        case DELETE_SUCCESS:


        case DELETE_FAILURE:


    }
}

export default handleBoard;