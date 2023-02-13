package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.ReservationEntity;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class SeatDto {
    private Long sid;
    private String sname;
    private String stype;
    private Boolean suse;
    private CinemaEntity cid;
    private ReservationEntity rid;

    public SeatDto(Long sid ,String sname, String stype, Boolean suse, CinemaEntity cid, ReservationEntity rid) {
        this.sid=sid;
        this.sname=sname;
        this.stype=stype;
        this.suse= suse;
        this.cid=cid;
        this.rid=rid;
    }
}
