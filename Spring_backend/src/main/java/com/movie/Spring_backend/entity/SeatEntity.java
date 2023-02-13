package com.movie.Spring_backend.entity;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

@Entity
@Table(name="movie_seat")
@Getter
@NoArgsConstructor
public class SeatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sid;

    @Column(nullable = false, length = 20)
    private String sname;

    @Column(nullable = false, length = 20)
    private String stype;

    @Column(nullable = false)
    private Boolean suse;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cid") //조인할 컬럼 이름
    private CinemaEntity cid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="rid") //조인할 컬럼 이름
    private ReservationEntity rid;

    @Builder
    public SeatEntity(Long sid ,String sname, String stype, Boolean suse, CinemaEntity cid, ReservationEntity rid) {
        this.sid=sid;
        this.sname=sname;
        this.stype=stype;
        this.suse= suse;
        this.cid=cid;
        this.rid=rid;
    }
}