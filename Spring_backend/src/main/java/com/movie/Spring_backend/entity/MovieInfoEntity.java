package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Formula;

@Table(name="movie_information")
@Entity
@Getter
@NoArgsConstructor
// @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "MID")

public class MovieInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long miid;

    @Column(nullable = false,length = 30)
    private Date miday;

    @Column(nullable = false,length = 30)
    private String mistarttime;

    @Column(nullable = false, length = 30)
    private String miendtime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="mid")
    private MovieEntity movie; //주인 N

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cid")
    private CinemaEntity cinema;

    // 이거 miid 빼려면 빼도 될듯
    // count(*)가 더 빠른지 검사해보기
    @Formula("(select count(mis.misid) from movie_infoseat mis where mis.miid = miid)")
    private Integer cntSeatInfo;

    // 일대다 관계 매핑
    @OneToMany(mappedBy = "movieInfo",
            fetch = FetchType.LAZY)
    private List<ReservationEntity> reservations = new ArrayList<>();

    @Builder
    public MovieInfoEntity(Long miid, Date miday, String mistarttime, String miendtime, MovieEntity movie, CinemaEntity cinema,
                           Integer cntSeatInfo, List<ReservationEntity> reservations) {
       this.miid= miid;
       this.miday=miday;
       this.mistarttime=mistarttime;
       this.miendtime=miendtime;
       this.movie=movie;
       this.cinema=cinema;
       this.cntSeatInfo=cntSeatInfo;
       this.reservations=reservations;
    }
}
