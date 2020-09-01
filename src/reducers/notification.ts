const NOTIFICATION_REQUEST = 'notification/NOTIFICATION_REQUEST' as const;
const NOTIFICATION_FAILURE = 'notification/NOTIFICATION_FAILURE' as const;
const NOTIFICATION_SUCCESS = 'notification/NOTIFICATION_SUCCESS' as const;

export const notificationRequest = (list:any) => ({
    type: NOTIFICATION_REQUEST,
    payload:list
});

export const notificationFailure = () => ({
    type: NOTIFICATION_FAILURE
});

export const notificationSuccess = () => ({
    type: NOTIFICATION_SUCCESS
});

interface stateType {
    loading: boolean,
    list: any,
}

const initialState: stateType = {
    loading: false,
    list: []
}



type NotificationType = ReturnType<typeof NOTIFICATION_REQUEST> | ReturnType<typeof NOTIFICATION_FAILURE> | ReturnType<typeof NOTIFICATION_SUCCESS>;

const handleNotification = (state: stateType = initialState, action: NotificationType) => {
    switch (action.type) {
        case NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
                list:action.payload.list
            }
        case NOTIFICATION_FAILURE:
            return{
                ...state,
                loading:false
            };
        case NOTIFICATION_SUCCESS:
            return{
                ...state,
                loading:false
            };
        default:
            return state;
    }
}

export default handleNotification;