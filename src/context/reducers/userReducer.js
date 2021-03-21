const userReducer = (state, action) => {
   switch (action.type) {
      case 'SET_TOKEN': {
         const { token, userId } = action.payload;
         return { ...state, token, userId };
      }

      default:
         // return state;
         throw new Error('no matching action type --nextReducer');
   }
};

export default userReducer;
