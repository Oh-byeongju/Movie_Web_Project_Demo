package com.movie.Spring_backend.entity;
import javax.persistence.*;
import lombok.*;

import java.sql.Date;


@Table(name="movie")
@Entity
@Getter
@NoArgsConstructor

public class TempEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mid;

    @Column(nullable = false,length = 30)
    private String mtitle;

    @Column(nullable = false, length = 30)
    private String mdir;

    @Column(nullable = false, length = 30)
    private String mactor;

    @Column(nullable = false, length = 30)
    private String msupactor;

    @Column(nullable = false, length = 30)
    private String mgenre;

    @Column(nullable = false, length = 30)
    private int mtime;

    @Column(nullable = false, length = 30)
    private Date mdate;
    @Column(nullable = false, length = 30)
    private String mrating;

    @Column(nullable = false, length = 30)
    private String mstory;

    @Builder
    public TempEntity(Long mid, String mtitle, String mdir, String mactor, String msupactor, String mgenre,
                   int mtime, Date mdate, String mrating, String mstory) {
        this.mid = mid;
        this.mtitle = mtitle;
        this.mdir=mdir;
        this.mactor=mactor;
        this.msupactor=msupactor;
        this.mgenre=mgenre;
        this.mtime=mtime;
        this.mdate=mdate;
        this.mrating=mrating;
        this.mstory=mstory;
    }

}

