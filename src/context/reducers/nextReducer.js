const nextReducer = (state, action) => {
   switch (action.type) {
      // case value:

      //     break;

      default:
         return state;
         throw new Error('no matching action type --nextReducer');
   }
};

export default nextReducer;
