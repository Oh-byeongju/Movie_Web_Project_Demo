export const initalState = {
    select_theater_loading:false,
    select_theater_done:false,
    select_theater_error:null,
    theater:[],
    area:"",
    movie:[],
    city:"",

  };
  export const MOVIE_DATAS = "MOVIE_DATAS";
  export const AREA_DATAS = "AREA_DATAS"
  export const THEATER_DATAS="THEATER_DATAS" 
  export const SELECT_SC_THEATER_REQUEST = "SELECT_SC_THEATER_REQUEST"
  export const SELECT_SC_THEATER_SUCCESS = "SELECT_SC_THEATER_SUCCESS"
  export const SELECT_SC_THEATER_FAILURE = "SELECT_SC_THEATER_FAILURE"

  const TimeTable = (state = initalState, action) => {
    switch (action.type) {
      //전체 영화 검색 movie reduecer 의 값 변경이 안되서 새로 만듬
        case MOVIE_DATAS:
            return{
                ...state,
                movie:action.data
            }
        case AREA_DATAS:
          return{
            ...state,
            area:action.data,
          }
        case THEATER_DATAS:
          return{
            ...state,
            city:action.data
          }
        case SELECT_SC_THEATER_REQUEST:
          return{
            ...state,
            select_theater_loading:true,
            select_theater_done:false,
            select_theater_error:null,
          }
        case SELECT_SC_THEATER_SUCCESS:
          return{
            ...state,
            select_theater_loading:false,
            select_theater_done:true,
            select_theater_error:null,
            theater:action.data
          }
        case SELECT_SC_THEATER_FAILURE:
          return{
            ...state,
            select_theater_loading:false,
            select_theater_done:false,
            select_theater_error:action.error,
          }
      default:
        return state;
    }
  };
  export default TimeTable;
  