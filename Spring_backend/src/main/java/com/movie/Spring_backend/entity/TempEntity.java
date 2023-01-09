package com.movie.Spring_backend.entity;
import javax.persistence.*;
import lombok.*;

import java.util.Date;

@Entity

@Table(name="movie")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class TempEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long m_id;

    @Column(nullable = false, unique = true, length = 30)
    private String m_title;

    @Column(nullable = false, length = 30)
    private String m_dir;

    @Column(nullable = false, length = 30)
    private String m_actor;

    @Column(nullable = false, length = 30)
    private String m_sup_actor;

    @Column(nullable = false, length = 30)
    private String m_genre;

    @Column(nullable = false, length = 30)
    private int m_time;

    @Column(nullable = false, length = 30)
    private Date m_date;
    @Column(nullable = false, length = 30)
    private String m_rating;

    @Column(nullable = false, length = 30)
    private String m_story;


    public TempEntity(String m_title, String m_dir, String m_actor, String m_sup_actor, String m_genre, int m_time, Date m_date, String m_rating, String m_story) {
        this.m_title = m_title;
        this.m_dir = m_dir;
        this.m_actor=m_actor;
        this.m_sup_actor=m_sup_actor;
        this.m_genre=m_genre;
        this.m_time=m_time;
        this.m_date=m_date;
        this.m_rating=m_rating;
        this.m_story=m_story;
    }

}
