package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import lombok.*;
//DTO DB에서 데이터를 얻어 Service나  Controller등으로 보낼때 사용하는 객체
//@Builder //클래스 레벨에 붙이거나 생성자에 붙여주면 파라미터를 활용하여 빌더 패턴을 자동으로 생성해준다
//객체지향에서는 메소드를 통해 데이터를 변경하는것을 선호한다. 무결성!

@NoArgsConstructor
@Data //값을 가공 후 전달.
public class CinemaDto {
    @NoArgsConstructor
    @Data //값을 가공 후 전달.
    public static class CinemaSelect {
        private Long cid;
        private String cname;
        private String ctype;
        private String cseat;
        private TheaterEntity theater;

        public CinemaSelect (CinemaEntity cinemaEntity){
            this.cid=cinemaEntity.getCid();
            this.cname=cinemaEntity.getCname();
            this.ctype= cinemaEntity.getCtype();
            this.cseat= cinemaEntity.getCseat();
            this.theater=cinemaEntity.getTheater();
        }
    }

}
