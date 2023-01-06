export const initalState = {
  add_ticket_loading: false,
  add_ticket_done: false,
  add_ticket_error: null,
  MovieTicket: [
    //내가 쓰려고 만든 더미 데이터
    {
      id: 1,
      title: "아바타",
      movie: {
        area: "부산",
        cinema: "화명",
        time: "2023-01-04",
      },
    },
    {
      id: 2,
      title: "슬램덩크",
      movie: {
        area: "부산",
        cinema: "서면",
        time: "2023-01-04",
      },
    },
    {
      id: 3,
      title: "젠틀맨",
      movie: {
        area: "부산",
        cinema: "남포",
        time: "2023-01-04",
      },
    },
  ],
};

export const ADD_TICKET_REQUSET = "ADD_TICKET_REQUSET"; //액션
export const ADD_TICKET_SUCCESS = "ADD_TICKET_SUCCESS";
export const ADD_TICKET_FAILURE = "ADD_TICKET_FAILURE";

const ticket = (state = initalState, action) => {
  switch (action.type) {
    case ADD_TICKET_REQUSET:
      return {
        ...state, //불변성 때문에 ...state case 추가할 시 무조건 첫줄에 추가해야 됨
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
