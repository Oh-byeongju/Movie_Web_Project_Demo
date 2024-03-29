package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface MovieInfoRepository extends JpaRepository<MovieInfoEntity, Long> {

    @Query("SELECT mi From MovieInfoEntity as mi where mi.mistarttime >= function('addtime', now(), '0:30:00')  Group by mi.miday Order by mi.miday ASC")
    List<MovieInfoEntity> findAll();

    public List<MovieInfoEntity> findByMovie(MovieEntity id);

    @Query("SELECT mi From MovieInfoEntity as mi, MovieEntity as m Where mi.movie.mid= (:mid) " +
            "and mi.mistarttime >= function('addtime', now(), '0:30:00') Group by mi.miday Order by mi.miday ASC ")
    public List<MovieInfoEntity> findByMovieToDay(@Param("mid") Long mid);

    //극장으로 날짜 검색할때 사용하는 메소드
    @Query("SELECT mi From MovieInfoEntity as mi, CinemaEntity as c WHERE " +
            "mi.mistarttime >= function('addtime', now(), '0:30:00') and mi.cinema.cid IN " +
            "(select cid from c where tid= (:tid)) ORDER BY mi.miday ASC")
    public List<MovieInfoEntity> findByCinemaCidIn(@Param("tid") Long tid);

    //극장 영화로 day 검색
    //select * from movie_information where mid =1 and cid in (select cid from movie_cinema where tid=1);
    @Query("select info from MovieInfoEntity as info where info.movie.mid = :mid and " +
            "info.mistarttime >= function('addtime', now(), '0:30:00') and " +
            "info.cinema.cid in (select cinema.cid from CinemaEntity as cinema where cinema.theater.tid = :tid )")
    public List<MovieInfoEntity> findByCinemaCidInAndMovieMid(@Param("mid") Long mid, @Param("tid") Long tid);

    public List<MovieInfoEntity> findByMiday(Date miday);

    //mid를 구해야함
    public List<MovieInfoEntity> findByMidayAndCinemaCidIn(Date miday, List<Long> cid);

    public List<MovieInfoEntity> findByMidayAndMovieMid(Date miday, Long mid);

    //스케줄 검색
    @Query("select info from MovieInfoEntity as info where info.mistarttime >= function('addtime', now(), '0:30:00') and " +
            "info.miday = :miday and info.movie.mid = :mid and info.cinema.cid in " +
            "(select cinema.cid from CinemaEntity as cinema where cinema.theater.tid = :tid)")
    public List<MovieInfoEntity> findBySchedule(@Param("miday") Date miday, @Param("mid") Long mid, @Param("tid") Long tid);

    // 특정 Movie id를 가지고 현재 예매가 가능한 영화 정보를 들고오는 메소드
    @Query(value = "SELECT mi FROM MovieInfoEntity as mi WHERE mi.movie = :movie AND " +
            "mi.mistarttime >= function('addtime', now(), '0:30:00')")
    List<MovieInfoEntity> findMovieScreen(@Param("movie") MovieEntity movie);

    // 상영이 끝난 특정 영화 정보를 들고오는 메소드
    @Query(value = "SELECT mi FROM MovieInfoEntity as mi " +
            "WHERE mi.movie = :movie AND mi.miendtime <= now()")
    List<MovieInfoEntity> findInfoBeforeToday(@Param("movie") MovieEntity movie);

    //영황 상영 시간표를 검색할 때 영화, 날짜, 지역으로 검색하는 메소드
    @Query(value = "SELECT mi FROM MovieInfoEntity as mi " +
            "where mid= :mid and mi.miday= :miday and mi.mistarttime >= function('addtime', now(), '0:30:00') and " +
            "mi.cinema.cid in (select c.cid from CinemaEntity as c " +
            "where tid in(select t.tid from TheaterEntity as t where t.tarea= :tarea)) ")
    List<MovieInfoEntity> findSchedule(@Param("mid") Long mid, @Param("miday") Date miday, @Param("tarea") String tarea);


    //영화, 날짜, 상영관으로 miid를 추출하는 메소드
    @Query(value = "SELECT mi FROM MovieInfoEntity as mi " +
            "where mid= :mid and mi.miday= :miday and " +
            "cid = :cid and mi.mistarttime >= function('addtime', now(), '0:30:00')"
    )
    List<MovieInfoEntity> findmiid(@Param("mid") Long mid, @Param("miday") Date miday, @Param("cid") Long cid);


    @Query(value = "SELECT mi FROM MovieInfoEntity as mi " +
            "where mi.miday= :miday and mi.mistarttime >= function('addtime', now(), '0:30:00') and " +
            "mi.cinema.cid in (select c.cid from CinemaEntity as c " +
            "where tid = :tid) ")
    List<MovieInfoEntity> findTimeTheater(@Param("miday") Date miday, @Param("tid") Long tid);

    // 특정 사용자가 예매후 관람이 끝난 영화 정보를 들고오는 메소드
    // 이런거도 inner join 써야하는거 같음
    @Query(value = "SELECT mi FROM MovieInfoEntity as mi LEFT OUTER JOIN mi.reservations rs " +
            "WHERE mi.miendtime <= NOW() AND rs.rstate = 1 AND rs.member = :member")
    List<MovieInfoEntity> findMemberPossible(@Param("member") MemberEntity member);

    // 관리자 페이지에서 상영정보를 가져오는 메소드
    @Query(value = "SELECT mi FROM MovieInfoEntity as mi INNER JOIN CinemaEntity as ci ON mi.cinema = ci.cid " +
            "INNER JOIN TheaterEntity as t ON ci.theater = t.tid " +
            "WHERE (:movie is null or mi.movie = :movie) " +
            "AND (:startDay is null or mi.miday >= :startDay) AND (:endDay is null or mi.miday <= :endDay)" +
            "AND (:tid is null or t.tid = :tid) AND (:tarea is null or t.tarea = :tarea) " +
            "ORDER BY mi.miday DESC, mi.mistarttime DESC")
    @EntityGraph(attributePaths = {"movie", "cinema.theater"})
    Page<MovieInfoEntity> findManagerMovieInfo(@Param("movie") MovieEntity movie,
                                               @Param("startDay") Date startDay,
                                               @Param("endDay") Date endDay,
                                               @Param("tid") Long tid,
                                               @Param("tarea") String tarea,
                                               Pageable pageable);

    // 상영정보간 시간을 확인하는 메소드(앞뒤 30분 여유 확인)
    @Query(value = "SELECT mi FROM MovieInfoEntity as mi WHERE mi.cinema = :cinema AND " +
            "(mi.mistarttime BETWEEN :CheckStart AND :CheckEnd OR mi.miendtime BETWEEN :CheckStart AND :CheckEnd)")
    List<MovieInfoEntity> findExistMovieInfo(@Param("cinema") CinemaEntity cinema,
                                             @Param("CheckStart") String CheckStart,
                                             @Param("CheckEnd") String CheckEnd);

    // 상영정보를 수정하는 메소드
    @Modifying
    @Query("UPDATE MovieInfoEntity as mi " +
            "SET mi.miday = :miday, mi.mistarttime = :mistarttime, mi.miendtime = :miendtime, " +
            "mi.movie = :movie, mi.cinema = :cinema WHERE mi.miid = :miid")
    void MovieInfoUpdate(@Param("miid") Long miid, @Param("miday") Date miday, @Param("mistarttime") String mistarttime,
                          @Param ("miendtime") String miendtime, @Param("movie") MovieEntity movie, @Param("cinema") CinemaEntity cinema);
}

