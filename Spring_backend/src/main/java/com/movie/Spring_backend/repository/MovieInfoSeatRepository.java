package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.MovieInfoSeatEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieInfoSeatRepository  extends JpaRepository<MovieInfoSeatEntity,Long> {
    @Query(value = "SELECT mis from MovieInfoSeatEntity as mis where mis.info.miid=(:miid)")
    @EntityGraph(attributePaths = {"seat","info", "seat.cinema","seat.cinema.theater","info.movie"})
    List<MovieInfoSeatEntity> findByInfoMovie(@Param("miid") Long miid);

    @Query(value = "select count(mis.misid) >0 from MovieInfoSeatEntity as mis where mis.seat.sid IN (:sid) AND " +
            "mis.info.miid=(:miid)")
    boolean exists(@Param(value = "sid")List<Long> sid, @Param(value ="miid") Long miid);


    // 사용자가 예매한 영화의 좌석들을 가져오는 메소드(예매시간 순으로 내림차순) --> 이름 매개변수로 바꾸고 나중에 취소, 지난, 현재 이거 하려면 시간도 넣기
    // rstate도 매개변수로 쓰면 쿼리 여러개 안해도 되겠네
    @Query(value = "SELECT mis FROM MovieInfoSeatEntity as mis LEFT OUTER JOIN ReservationEntity as rs " +
            "ON mis.reserve = rs.rid " +
            "WHERE rs.member = 'temp1' AND rs.rstate = true " +
            "ORDER BY rs.rdate DESC")
    @EntityGraph(attributePaths = {"seat"})
    List<MovieInfoSeatEntity> TEST();



    // 예매일시, 영화번호등등이 담긴놈들 한세트랑, 위에 자리만 뽑은놈 한세트랑 매퍼로 보낸다음
    // 전체 for문은 예매일시, 영화번호등등이 담긴놈들 한세트로 돌리는데
    // 그 안에 관람좌석은 0 + 이때까지 누적된 rticket + 현재 rticket 에서 부터
    // 누적된 rticket + 현재  rticket 까지 돌리면 되겠네
    // 이렇게 뽑은거 전부 들고와서 for문을 돌리는데
    //

//
//    // 테스트
//    @Query(value = "SELECT mis FROM MovieInfoSeatEntity as mis LEFT OUTER JOIN ReservationEntity as rs " +
//            "ON mis.reserve = rs.rid " +
//            "WHERE rs.member = 'temp1'")

}
