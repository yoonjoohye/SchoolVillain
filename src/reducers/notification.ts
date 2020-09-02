const NOTIFICATION_REQUEST = 'notification/NOTIFICATION_REQUEST' as const;
const NOTIFICATION_FAILURE = 'notification/NOTIFICATION_FAILURE' as const;
const NOTIFICATION_SUCCESS = 'notification/NOTIFICATION_SUCCESS' as const;

export const notificationRequest = () => ({
    type: NOTIFICATION_REQUEST
});

export const notificationFailure = () => ({
    type: NOTIFICATION_FAILURE
});

export const notificationSuccess = (list:any,page:number) => ({
    type: NOTIFICATION_SUCCESS,
    payload: {
        list:list,
        page:page
    }
});

interface stateType {
    loading: boolean,
    list: any,
    page:number
}

const initialState: stateType = {
    loading: false,
    list: [],
    page:0
}


type NotificationType = ReturnType<typeof NOTIFICATION_REQUEST> | ReturnType<typeof NOTIFICATION_FAILURE> | ReturnType<typeof NOTIFICATION_SUCCESS>;

const handleNotification = (state: stateType = initialState, action: any) => {
    switch (action.type) {
        case NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NOTIFICATION_FAILURE:
            return{
                ...state,
                loading:false
            };
        case NOTIFICATION_SUCCESS:
            return{
                ...state,
                list:action.payload.list,
                page:action.payload.page
            };
        default:
            return state;
    }
}

export default handleNotification;