const NOTIFICATION_REQUEST = 'notification/NOTIFICATION_REQUEST' as const;
const READ_NOTIFICATION = 'notification/READ_NOTIFICATION' as const;


export const notificationRequest = (list:any,page:number) => ({
    type: NOTIFICATION_REQUEST,
    payload: {
        list:list,
        page:page
    }
});
export const readNotification=(list:any)=>({
   type: READ_NOTIFICATION,
    payload:{
       list:list
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
    page:1
}


type NotificationType = ReturnType<typeof NOTIFICATION_REQUEST> | ReturnType<typeof READ_NOTIFICATION>;

const handleNotification = (state: stateType = initialState, action: NotificationType) => {
    switch (action.type) {
        case NOTIFICATION_REQUEST:
            return{
                ...state,
                list:action.payload.list,
                page:action.payload.page
            };
        case READ_NOTIFICATION:
            return{
                ...state,
                list:action.payload.list
            }
        default:
            return state;
    }
}

export default handleNotification;