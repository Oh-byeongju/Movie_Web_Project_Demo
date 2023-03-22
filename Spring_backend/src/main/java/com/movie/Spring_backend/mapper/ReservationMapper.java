package com.movie.Spring_backend.mapper;

import com.movie.Spring_backend.dto.ReservationDto;
import com.movie.Spring_backend.entity.MovieInfoSeatEntity;
import com.movie.Spring_backend.entity.ReservationEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReservationMapper {

    // 마이페이지에 있는 예매내역 조회
    public List<ReservationDto> MyPageReserve(List<ReservationEntity> RE, List<MovieInfoSeatEntity> MIS) {

        // 리턴할 배열
        List<ReservationDto> result = new ArrayList<>();

        // 자리 매핑을 위한 변수
        int start = 0;
        int end = 0;

        for (ReservationEntity r : RE) {

            // 반복문의 끝을 end 변수 + 현재 예매의 티켓 매수로 지정
            end += r.getRticket();

            // 예매한 자리 이름을 넣을 리스트 생성
            List<String> Seats = new ArrayList<>();
            for (int i = start; i < end; i++) {
                Seats.add(MIS.get(i).getSeat().getSname() + ",");
            }
            // 리스트의 마지막 요소에 콤마를 제거
            Seats.set(end - start - 1, Seats.get(end - start - 1).replaceAll(",$", ""));

            // 반복문의 시작을 start 변수 + 현재 예매의 티켓 매수로 지정
            start += r.getRticket();

            // 리턴할 배열에 빌드 후 add
            result.add(ReservationDto.builder()
                    .rid(r.getRid())
                    .rdate(r.getRdate())
                    .mtitle(r.getMovieInfo().getMovie().getMtitle())
                    .tarea(r.getMovieInfo().getCinema().getTheater().getTarea())
                    .tname(r.getMovieInfo().getCinema().getTheater().getTname())
                    .cname(r.getMovieInfo().getCinema().getCname())
                    .mistarttime(r.getMovieInfo().getMistarttime())
                    .seats(Seats)
                    .rprice(r.getRprice()).build());
        }
        return result;
    }
}
