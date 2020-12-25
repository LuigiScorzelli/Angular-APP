const initialState = {
  items: [
    {
      name: "John Doe",
      phone: "9124912940",
      address: "123 Main Street",
      membership: "Platinum",
      id: 1
    }
  ],
  loading: false,
};

export function customerReducer(state = initialState,action) {
  if( action.type === 'CUSTOMERS/LOAD' ) {
    return {
      ...state
    };
  } else {
    return state;
  }
}
