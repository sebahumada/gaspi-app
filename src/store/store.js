import { action, createStore } from 'easy-peasy';


const store = createStore({
    idDoc: '',

    setId: action((state, payload) => {
      state.idDoc = payload
    }),
  });

  export default store;