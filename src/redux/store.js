import { legacy_createStore as createStore } from 'redux';
import reducer from '../Reducers/reducer';

const store = createStore(reducer);

export default store;
