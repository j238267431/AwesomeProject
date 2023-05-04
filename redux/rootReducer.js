const defaultState = {
   cash: 0,
   isModal: false,
   authKey: '',
 }
 
 const reducer = (state = defaultState, action) => {
   switch (action.type){
     case 'ADD_CASH':
       return {...state, cash: state.cash + action.payload}
     case 'GET_CASH':
       return {...state, cash: state.cash - action.payload}
     case 'SHOW_MODAL':
       return {...state, isModal: action.payload}
     case 'HIDE_MODAL':
       return {...state, isModal: action.payload}
     case 'SAVE_AUTH_KEY':
       return {...state, authKey: action.payload}
     case 'REMOVE_AUTH_KEY':
       return {...state, authKey: action.payload}
     default: 
       return state;
   }
 }

 export default reducer;