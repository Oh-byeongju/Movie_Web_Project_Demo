package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.MovieInfoSeatEntity;
import com.movie.Spring_backend.entity.ReservationEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {
    // 사용자 id와 영화정보 id를 이용하여 엔티티 조회하는 메소드 (예매 취소된것 제외)
    List<ReservationEntity> findByRstateTrueAndMemberAndMovieInfoIn(MemberEntity member, List<MovieInfoEntity> movieInfos);

    ReservationEntity findByRpayid(String rpayid);

    // 테스트
    // 사용자가 예매한 정보들을 가져오는 메소드(예매시간 순으로 내림차순) --> 이름 매개변수로 바꾸고 나중에 취소, 지난, 현재 이거 하려면 시간도 넣기
    // rstate도 매개변수로 쓰면 쿼리 여러개 안해도 되겠네
    @Query(value = "SELECT rs FROM ReservationEntity as rs LEFT OUTER JOIN MovieInfoEntity as mi " +
            "ON rs.movieInfo = mi.miid " +
            "WHERE rs.member = 'temp1' AND rs.rstate = true " +
            "ORDER BY rs.rdate DESC")
    @EntityGraph(attributePaths = {"movieInfo.movie", "movieInfo.cinema", "movieInfo.cinema.theater"})
    List<ReservationEntity> TEST();


}
