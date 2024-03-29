/*
  23-02-09 JPQL을 이용하여 좋아요 순으로 영화 조회 하도록 재설계(오병주)
  23-02-10 영화 세부내용을 위한 메소드 설계(오병주)
  23-03-06 전체영화 조회 및 사용자 영화 검색 메소드 수정(오병주)
 */
package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.MovieEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Repository
public interface MovieRepository extends JpaRepository<MovieEntity,Long> {

    // 현재 예매가 가능한 영화 조회 메소드(영화시작 시간이 현재시간에 30분을 더한 값 보다 큰것들, 예매율 계산에 사용)
    @Query(value = "SELECT m FROM MovieEntity as m WHERE m.mid IN " +
            "(SELECT DISTINCT mi.movie FROM MovieInfoEntity mi WHERE mi.mistarttime >= function('addtime', now(), '0:30:00'))")
    List<MovieEntity> findShowMoviesReserve();

    /**
     * 전체 영화 조회 메소드
     */
    // 현재 예매가 가능한 영화 조회 메소드(영화시작 시간이 현재시간에 30분을 더한 값 보다 큰것들, 예매율 순으로 내림차순)
    // 사용자가 검색창에 단어를 입력할경우 단어를 포함하고 있는 영화를 리턴
    @Query(value = "SELECT m FROM MovieEntity as m WHERE m.mtitle LIKE CONCAT('%',:title,'%') AND m.mid IN " +
            "(SELECT DISTINCT mi.movie FROM MovieInfoEntity mi WHERE mi.mistarttime >= function('addtime', now(), '0:30:00')) " +
            "ORDER BY m.cntReserve DESC")
    List<MovieEntity> findShowMoviesReserveDESC(@Param("title") String title);

    // 아직 상영일자가 잡히지 않은 영화 조회 메소드(포스터만 존재하고 상영일정이 나오지 않은것들 <-- 예매불가, 개봉일자로 오름차순)
    // 사용자가 검색창에 단어를 입력할경우 단어를 포함하고 있는 영화를 리턴
    @Query(value = "SELECT m FROM MovieEntity as m WHERE m.mtitle LIKE CONCAT('%',:title,'%') AND m.mid NOT IN " +
            "(SELECT DISTINCT mi.movie FROM MovieInfoEntity mi) " +
            "ORDER BY m.mdate")
    List<MovieEntity> findNotShowMoviesDateASC(@Param("title") String title);

    // 현재 예매가 가능한 영화 조회 메소드(영화시작 시간이 현재시간에 30분을 더한 값 보다 큰것들, 좋아요 순으로 내림차순)
    // 사용자가 검색창에 단어를 입력할경우 단어를 포함하고 있는 영화를 리턴
    @Query(value = "SELECT m FROM MovieEntity as m WHERE m.mtitle LIKE CONCAT('%',:title,'%') AND m.mid IN " +
            "(SELECT DISTINCT mi.movie FROM MovieInfoEntity mi WHERE mi.mistarttime >= function('addtime', now(), '0:30:00')) " +
            "ORDER BY m.cntMovieLike DESC")
    List<MovieEntity> findShowMoviesLikeDESC(@Param("title") String title);

    // 아직 상영일자가 잡히지 않은 영화 조회 메소드(포스터만 존재하고 상영일정이 나오지 않은것들 <-- 예매불가, 좋아요 순으로 내림차순)
    // 사용자가 검색창에 단어를 입력할경우 단어를 포함하고 있는 영화를 리턴
    @Query(value = "SELECT m FROM MovieEntity as m WHERE m.mtitle LIKE CONCAT('%',:title,'%') AND m.mid NOT IN " +
            "(SELECT DISTINCT mi.movie FROM MovieInfoEntity mi) " +
            "ORDER BY m.cntMovieLike DESC")
    List<MovieEntity> findNotShowMoviesLikeDESC(@Param("title") String title);

    /**
     * 현재상영작 영화 조회 메소드
     */
    // 현재 예매가 가능하면서 개봉한 영화 조회 메소드(영화시작 시간이 현재시간에 30분을 더한 값 보다 큰것들, 예매율 순으로 내림차순)
    // 사용자가 검색창에 단어를 입력할경우 단어를 포함하고 있는 영화를 리턴
    @Query(value = "SELECT m FROM MovieEntity as m WHERE m.mtitle LIKE CONCAT('%',:title,'%') " +
            "AND m.mdate <= function('date_format', now(), '%Y-%m-%d') AND m.mid IN " +
            "(SELECT DISTINCT mi.movie FROM MovieInfoEntity mi WHERE mi.mistarttime >= function('addtime', now(), '0:30:00')) " +
            "ORDER BY m.cntReserve DESC")
    List<MovieEntity> findScreenMoviesReserveDESC(@Param("title") String title);

    // 현재 예매가 가능하면서 개봉한 영화 조회 메소드(영화시작 시간이 현재시간에 30분을 더한 값 보다 큰것들, 좋아요 순으로 내림차순)
    // 사용자가 검색창에 단어를 입력할경우 단어를 포함하고 있는 영화를 리턴
    @Query(value = "SELECT m FROM MovieEntity as m WHERE m.mtitle LIKE CONCAT('%',:title,'%') " +
            "AND m.mdate <= function('date_format', now(), '%Y-%m-%d') AND m.mid IN " +
            "(SELECT DISTINCT mi.movie FROM MovieInfoEntity mi WHERE mi.mistarttime >= function('addtime', now(), '0:30:00')) " +
            "ORDER BY m.cntMovieLike DESC")
    List<MovieEntity> findScreenMoviesLikeDESC(@Param("title") String title);

    /**
     * 상영예정작 영화 조회 메소드
     */
    // 현재 예매가 가능하면서 아직 개봉하지 않은 영화 조회 메소드(예매율 순으로 내림차순)
    // 사용자가 검색창에 단어를 입력할경우 단어를 포함하고 있는 영화를 리턴
    @Query(value = "SELECT m FROM MovieEntity as m WHERE m.mtitle LIKE CONCAT('%',:title,'%') " +
            "AND m.mdate > function('date_format', now(), '%Y-%m-%d') AND m.mid IN " +
            "(SELECT DISTINCT mi.movie FROM MovieInfoEntity mi WHERE mi.miday >= function('date_format', now(), '%Y-%m-%d')) " +
            "ORDER BY m.cntReserve DESC")
    List<MovieEntity> findComingMoviesReserveDESC(@Param("title") String title);

    // 현재 예매가 가능하면서 아직 개봉하지 않은 영화 조회 메소드(좋아요 순으로 내림차순)
    // 사용자가 검색창에 단어를 입력할경우 단어를 포함하고 있는 영화를 리턴
    @Query(value = "SELECT m FROM MovieEntity as m WHERE m.mtitle LIKE CONCAT('%',:title,'%') " +
            "AND m.mdate > function('date_format', now(), '%Y-%m-%d') AND m.mid IN " +
            "(SELECT DISTINCT mi.movie FROM MovieInfoEntity mi WHERE mi.miday >= function('date_format', now(), '%Y-%m-%d')) " +
            "ORDER BY m.cntMovieLike DESC")
    List<MovieEntity> findComingMoviesLikeDESC(@Param("title") String title);

    // 사용자가 관람평을 작성할 수 있는 영화 검색 (관람객 평점 기준으로 내림차순)
    @Query("SELECT m FROM MovieEntity as m " +
            "WHERE m.mid IN (:mid)" +
            "ORDER BY m.avgScore DESC")
    List<MovieEntity> findMoviesScoreDESC(@Param("mid") Set<Long> mid);

    // 사용자가 좋아요 누른 영화검색 (좋아요 누른 시점 기준으로 내림차순)
    @Query("SELECT m FROM MovieEntity as m LEFT OUTER JOIN MovieMemberEntity as mm ON m.mid = mm.movie " +
            "WHERE mm.member = :member AND mm.umlike = 1 " +
            "ORDER BY mm.umliketime DESC")
    List<MovieEntity> findMemberLikeMovieDESC(@Param("member") MemberEntity member);

    // 모든 영화 조회 (개봉일순으로 내림차순)
    List<MovieEntity> findAllByOrderByMdateAsc();

    //날짜로 영화를 검색하는 메소드 able

    @Query("select movie from MovieEntity as movie where movie.mid in " +
            "(select info.movie.mid from MovieInfoEntity as info where info.mistarttime >= function('addtime', now(), '0:30:00') " +
            "and info.miday = :miday)")
    List<MovieEntity> findByMidInAble(@Param("miday") Date miday);

    //날짜로 영화검색하는 메소드 disable
    @Query("select movie from MovieEntity as movie where movie.mid not in " +
            "(select info.movie.mid from MovieInfoEntity as info where info.mistarttime >= function('addtime', now(), '0:30:00') " +
            "and info.miday = :miday )")
    List<MovieEntity> findByMidInDisAble(@Param("miday") Date miday);

    //날짜와 극장으로 영화를 검색하는 메소드 ,able
    @Query("select movie from MovieEntity as movie where movie.mid in " +
            "(select info.movie.mid from MovieInfoEntity as info where info.mistarttime >= function('addtime', now(), '0:30:00') " +
            "and info.miday = :miday and " +
            "info.cinema.cid in (select cinema.cid from CinemaEntity as cinema where cinema.theater.tid = :tid ))")
    List<MovieEntity> findByDayTheaterToMovie(@Param("miday") Date miday, @Param("tid") Long tid);


    //날짜와 극장으로 영화를 검색하는 메소드 ,disable
    @Query("select movie from MovieEntity as movie where movie.mid not in " +
            "(select info.movie.mid from MovieInfoEntity as info where info.mistarttime >= function('addtime', now(), '0:30:00') " +
            "and info.miday = :miday and " +
            "info.cinema.cid in (select cinema.cid from CinemaEntity as cinema where cinema.theater.tid = :tid ))")
    List<MovieEntity> findByDayTheaterToMovieDis(@Param("miday") Date miday, @Param("tid") Long tid);

    //극장으로 영화를 검색하는 메소드 ,able
    @Query("select movie from MovieEntity as movie where movie.mid in " +
            "(select info.movie.mid from MovieInfoEntity as info where info.mistarttime >= function('addtime', now(), '0:30:00')" +
            " and info.cinema.cid in (select cinema.cid from CinemaEntity as cinema where cinema.theater.tid = :tid))")
    List<MovieEntity> MovieToTheater(@Param("tid") Long tid);

    //극장으로 영화를 검색하는 메소드, disable
    @Query("select movie from MovieEntity as movie where movie.mid not in " +
            "(select info.movie.mid from MovieInfoEntity as info where info.mistarttime >= function('addtime', now(), '0:30:00')" +
            " and info.cinema.cid in (select cinema.cid from CinemaEntity as cinema where cinema.theater.tid = :tid))")
    List<MovieEntity> MovieToTheaterDis(@Param("tid") Long tid);

    @Query("select movie from MovieEntity as movie where movie = :movie")
    MovieEntity findByMovie(@Param("movie") MovieEntity movie);
}