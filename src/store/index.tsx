
//액션 타입
let get='user/GET';

//액션 함수 생성

//리덕스 미들웨어

//리듀서
export interface StateType {
    token: string|null;
    user: object;
}

const initialState: StateType = {
    token: localStorage.getItem('token'),
    user:{}
}
