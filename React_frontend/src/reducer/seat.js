export const initalState = {
  rows: [
    { location: "A1", id: 1, is_reserved: false },
    { location: "A2", id: 2, is_reserved: false },
    { location: "A3", id: 3, is_reserved: false },
    { location: "A4", id: 4, is_reserved: false },
    { location: "A5", id: 5, is_reserved: true },
    { location: "A6", id: 6, is_reserved: false },
    { location: "A7", id: 7, is_reserved: false },
    { location: "A8", id: 8, is_reserved: false },
    { location: "A9", id: 9, is_reserved: false },
    { location: "A10", id: 10, is_reserved: false },
    { location: "B1", id: 11, is_reserved: false },
    { location: "B2", id: 12, is_reserved: false },
    { location: "B3", id: 13, is_reserved: false },
    { location: "B4", id: 14, is_reserved: false },
    { location: "B5", id: 15, is_reserved: false },
    { location: "B6", id: 16, is_reserved: false },
    { location: "B7", id: 17, is_reserved: false },
    { location: "B8", id: 18, is_reserved: false },
    { location: "B9", id: 19, is_reserved: false },
    { location: "B10", id: 20, is_reserved: false },
    { location: "C1", id: 21, is_reserved: false },
    { location: "C2", id: 22, is_reserved: false },
    { location: "C3", id: 23, is_reserved: true },
    { location: "C4", id: 24, is_reserved: false },
    { location: "C5", id: 25, is_reserved: false },
    { location: "C6", id: 26, is_reserved: false },
    { location: "C7", id: 27, is_reserved: false },
    { location: "C8", id: 28, is_reserved: false },
    { location: "C9", id: 29, is_reserved: false },
    { location: "C10", id: 30, is_reserved: false },
    { location: "D1", id: 31, is_reserved: false },
    { location: "D2", id: 32, is_reserved: false },
    { location: "D3", id: 33, is_reserved: false },
    { location: "D4", id: 34, is_reserved: false },
    { location: "D5", id: 35, is_reserved: false },
    { location: "D6", id: 36, is_reserved: false },
    { location: "D7", id: 37, is_reserved: false },
    { location: "D8", id: 38, is_reserved: false },
    { location: "D9", id: 39, is_reserved: false },
    { location: "D10", id: 40, is_reserved: false },
    { location: "E1", id: 41, is_reserved: false },
    { location: "E2", id: 42, is_reserved: false },
    { location: "E3", id: 43, is_reserved: false },
    { location: "E4", id: 44, is_reserved: false },
    { location: "E5", id: 45, is_reserved: false },
    { location: "E6", id: 46, is_reserved: false },
    { location: "E7", id: 47, is_reserved: false },
    { location: "E8", id: 48, is_reserved: false },
    { location: "E9", id: 49, is_reserved: false },
    { location: "E10", id: 50, is_reserved: false },
    { location: "F1", id: 51, is_reserved: false },
    { location: "F2", id: 52, is_reserved: false },
    { location: "F3", id: 53, is_reserved: false },
    { location: "F4", id: 54, is_reserved: false },
    { location: "F5", id: 55, is_reserved: false },
    { location: "F6", id: 56, is_reserved: false },
    { location: "F7", id: 57, is_reserved: false },
    { location: "F8", id: 58, is_reserved: false },
    { location: "F9", id: 59, is_reserved: false },
    { location: "F10", id: 60, is_reserved: false },
    { location: "G1", id: 71, is_reserved: false },
    { location: "G2", id: 72, is_reserved: false },
    { location: "G3", id: 73, is_reserved: false },
    { location: "G4", id: 74, is_reserved: false },
    { location: "G5", id: 75, is_reserved: false },
    { location: "G6", id: 76, is_reserved: false },
    { location: "G7", id: 77, is_reserved: false },
    { location: "G8", id: 78, is_reserved: false },
    { location: "G9", id: 79, is_reserved: false },
    { location: "G10", id: 80, is_reserved: false },
  ],

  choiceSeat: [],
};

export const SEAT_CHOICE = "SEAT_CHOICE";
export const SEAT_REMOVE = "SEAT_REMOVE";

const seat = (state = initalState, action) => {
  switch (action.type) {
    //전체 영화 검색 movie reduecer 의 값 변경이 안되서 새로 만듬
    case SEAT_CHOICE:
      return {
        ...state,
        choiceSeat: [...state.choiceSeat, action.data],
      };

    case SEAT_REMOVE:
      return {
        ...state,
        choiceSeat: state.choiceSeat.filter(
          (seat) => seat.seat_id !== action.data
        ),
        //filter를 해서 제거해야함
      };
    default:
      return state;
  }
};
export default seat;
