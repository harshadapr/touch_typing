import { START_TYPING, END_TYPING, HANDLE_KEY_PRESS } from '../Actions/actions';

const initialState = {
    currentKey: '',
    typedKeys: '',
    accuracy: 100,
    startTime: null,
    endTime: null,
    typingSpeed: 0,
    randomString: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_TYPING:
            return {
                ...state,
                currentKey: action.payload.currentKey,
                typedKeys: '',
                accuracy: 100,
                startTime: new Date(),
                randomString: action.payload.randomString,
            };
        case END_TYPING:
            return {
                ...state,
                endTime: new Date(),
                accuracy: action.payload.accuracy,
                typingSpeed: action.payload.typingSpeed,
            };
        case HANDLE_KEY_PRESS:
            return {
                ...state,
                currentKey: action.payload.currentKey,
                typedKeys: action.payload.typedKeys,
            };
        default:
            return state;
    }
};

export default reducer;
