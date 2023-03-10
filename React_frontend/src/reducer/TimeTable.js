export const initalState = {
    movie:[],

  };
  export const MOVIE_DATAS = "MOVIE_DATAS";
  
  const TimeTable = (state = initalState, action) => {
    switch (action.type) {
      //전체 영화 검색 movie reduecer 의 값 변경이 안되서 새로 만듬
        case MOVIE_DATAS:
            return{
                ...state,
                movie:action.data
            }
      
      default:
        return state;
    }
  };
  export default TimeTable;
  