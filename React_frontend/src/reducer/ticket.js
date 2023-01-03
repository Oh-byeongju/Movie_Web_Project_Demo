export const initalState = {
  add_ticket_loading: false,
  add_ticket_done: false,
  add_ticket_error: null,
  MovieTicket: [
    {
      id: 1,
      title: "HELLO",
      movie: {
        area: "부산",
        cinema: "화명",
      },
    },
    {
      id: 2,
      title: "HELLO",
      movie: {
        area: "부산",
        cinema: "서면",
      },
    },
    {
      id: 3,
      title: "HELLO",
      movie: {
        area: "부산",
        cinema: "남포",
      },
    },
  ],
};

export const ADD_TICKET_REQUSET = "ADD_TICKET_REQUSET";
export const ADD_TICKET_SUCCESS = "ADD_TICKET_SUCCESS";
export const ADD_TICKET_FAILURE = "ADD_TICKET_FAILURE";

const ticket = (state = initalState, action) => {
  switch (action.type) {
    case ADD_TICKET_REQUSET:
      return {
        ...state,
        add_ticket_loading: true,
        add_ticket_done: false,
        add_ticket_error: null,
      };

    case ADD_TICKET_SUCCESS:
      return {
        ...state,
        add_ticket_loading: false,
        add_ticket_done: true,
        MovieTicket: [...state, action.data],
        add_ticket_error: null,
      };

    case ADD_TICKET_FAILURE:
      return {
        ...state,
        add_ticket_loading: false,
        add_ticket_done: false,
        add_ticket_error: action.error,
      };

    default:
      return state;
  }
};
export default ticket;
