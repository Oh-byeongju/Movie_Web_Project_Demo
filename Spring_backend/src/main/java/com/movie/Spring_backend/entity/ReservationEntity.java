package com.movie.Spring_backend.entity;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name="movie_reservation")
@Getter
@NoArgsConstructor
public class ReservationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rid;

    @Column(nullable = false)
    private Date rdate;

    @Column(nullable = false)
    private Integer rprice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="miid")
    private MovieInfoEntity miid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid")
    private MemberEntity uid;

    @Builder
    public ReservationEntity(Long rid ,Date rdate, Integer rprice, MovieInfoEntity miid, MemberEntity uid) {
        this.rid=rid;
        this.rdate=rdate;
        this.rprice=rprice;
        this.miid=miid;
        this.uid=uid;
    }
}