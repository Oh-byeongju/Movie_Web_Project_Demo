package com.movie.Spring_backend.repository;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Set;

@Repository
public interface CinemaRepository extends JpaRepository<CinemaEntity,Long>  {


    public List<CinemaEntity> findAll();
     public List<CinemaEntity> findByTheater(TheaterEntity id);

     @Modifying
     @Query("update CinemaEntity set cname = :cname , ctype = :ctype , cseat = :cseat where cid=:cid")
     public void updateCinema(@Param("cname") String cname, @Param("ctype")String ctype, @Param("cseat")Integer cseat,
                              @Param("cid") Long cid);

}
//디비접근

