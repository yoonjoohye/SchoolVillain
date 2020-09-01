const AUTH_LOGIN_REQUEST = 'auth/LOGIN_REQUEST' as const;
const AUTH_LOGIN_FAILURE = 'auth/LOGIN_FAILURE' as const;
const AUTH_LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;

const AUTH_LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST' as const;
const AUTH_LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE' as const;
const AUTH_LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS' as const;

export const authLoginRequest = () => ({
    type: AUTH_LOGIN_REQUEST
});
export const authLoginFailure = () => ({
    type: AUTH_LOGIN_FAILURE
});
export const authLoginSuccess = () => ({
    type: AUTH_LOGIN_SUCCESS
});

export const authLogoutRequest = () => ({
    type: AUTH_LOGOUT_REQUEST
});
export const authLogoutFailure = () => ({
    type: AUTH_LOGOUT_FAILURE
});
export const authLogoutSuccess = () => ({
    type: AUTH_LOGOUT_SUCCESS
});

interface stateType {
    loading: {
        login: boolean,
        logout: boolean
    },
    logged: string | null
}

const initialState: stateType = {
    loading: {
        login: false,
        logout: false,
    },
    logged: sessionStorage.getItem('logged')
}

const handleAuth = (state:stateType = initialState, action: any) => {
    switch(action.type){
        case AUTH_LOGIN_REQUEST:
            return{
                ...state,
                loading: {
                    ...state.loading,
                    login: true
                }
            }

        default: // need this for default case
            return state
    }
}

export default handleAuth;