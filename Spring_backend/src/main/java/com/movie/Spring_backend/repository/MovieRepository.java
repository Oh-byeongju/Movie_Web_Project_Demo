/*
  23-02-09 JPQL을 이용하여 좋아요 순으로 영화 조회 하도록 재설계(오병주)
  23-02-10 영화 세부내용을 위한 메소드 설계(오병주)
  23-03-06 전체영화 조회 및 사용자 영화 검색 메소드 수정(오병주)
 */
package com.movie.Spring_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.MovieEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<MovieEntity,Long> {

    // 현재 예매가 가능한 영화 조회 메소드(영화시작 시간이 현재시간에 30분을 더한 값 보다 큰것들, 예매율 순으로 내림차순)
    @Query(value = "SELECT m FROM MovieEntity as m WHERE m.mid IN " +
            "(SELECT DISTINCT mi.movie FROM MovieInfoEntity mi WHERE mi.mistarttime >= function('addtime', now(), '0:30:00')) " +
            "ORDER BY m.cntReserve DESC")
    List<MovieEntity> findShowMoviesReserveDESC();

    // 아직 상영일자가 잡히지 않은 영화 조회 메소드(포스터만 존재하고 상영일정이 나오지 않은것들 <-- 예매불가, 개봉일자로 오름차순)
    @Query(value = "SELECT m FROM MovieEntity as m WHERE m.mid NOT IN " +
            "(SELECT DISTINCT mi.movie FROM MovieInfoEntity mi) " +
            "ORDER BY m.mdate")
    List<MovieEntity> findNotShowMovies();

//"(SELECT DISTINCT mi.movie FROM MovieInfoEntity mi WHERE mi.mistarttime >= function('date_format', now(), '%Y-%m-%d')) " +
//
//    // 현재 상영중인 영화 조회 메소드(예매율 순으로 내림차순)
//    @Query(value = "SELECT m FROM MovieEntity as m WHERE m.mid IN " +
//            "(SELECT DISTINCT mi.movie FROM MovieInfoEntity)" +
//            "ORDER BY m.cntReserve DESC")

    //

//    List<MovieEntity> findShowMoviesDESC()


    // 모든 영화 조회 메소드(좋아요 순으로 내림차순 --> 나중에 예매율로 바꿔야함 예매율 이긴 한데 메소드를 분리해야 할듯)
    @Query(value = "SELECT m FROM MovieEntity as m " +
                   "ORDER BY m.cntReserve DESC")
    List<MovieEntity> findAllDESC();

    // 사용자가 영화 검색시 조회 메소드(좋아요 순으로 내림차순 --> 나중에 예매율로 바꿔야함 예매율이긴 한데 메소드를 분리해야할듯)
    @Query(value = "SELECT m FROM MovieEntity as m " +
                   "WHERE m.mtitle LIKE CONCAT('%',:title,'%') " +
                   "ORDER BY m.cntReserve DESC")
    List<MovieEntity> findSearchDESC(@Param("title") String title);

    // 극장 클릭 시 영화 id list를 활용하여 검색
    @Query(value ="SELECT m ,'able' as able FROM MovieEntity as m where m.mid IN (:mid) ORDER BY m.cntMovieLike DESC")
    List<MovieEntity> findByMidInAble(@Param("mid") List<Long> mid);

    @Query(value ="SELECT m ,'disable' as disable From MovieEntity as m where m.mid NOT IN (:mid) ORDER BY m.cntMovieLike DESC" )
    List<MovieEntity> findByMidInDisAble(@Param("mid") List<Long> mid); 

}