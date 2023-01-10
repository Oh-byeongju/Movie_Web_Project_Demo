package com.movie.Spring_backend.entity;
import javax.persistence.*;
import lombok.*;

import java.util.Date;


@Table(name="movie")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TempEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long mId;

    @Column(nullable = false,length = 30)
    private String mTitle;

    @Column(nullable = false, length = 30)
    private String mDir;

    @Column(nullable = false, length = 30)
    private String mActor;

    @Column(nullable = false, length = 30)
    private String mSupactor;

    @Column(nullable = false, length = 30)
    private String mGenre;

    @Column(nullable = false, length = 30)
    private int mTime;

    @Column(nullable = false, length = 30)
    private Date mDate;
    @Column(nullable = false, length = 30)
    private String mRating;

    @Column(nullable = false, length = 30)
    private String mStory;


    public TempEntity(String mTitle, String mdir, String mActor, String mSupactor, String mGenre, int mTime, Date mDate, String mRating, String mStory) {
        this.mTitle = mTitle;
        this.mDir = mDir;
        this.mActor=mActor;
        this.mSupactor=mSupactor;
        this.mGenre=mGenre;
        this.mTime=mTime;
        this.mDate=mDate;
        this.mRating=mRating;
        this.mStory=mStory;
    }

}
