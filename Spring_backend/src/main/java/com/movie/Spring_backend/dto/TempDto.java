package com.movie.Spring_backend.dto;
import com.movie.Spring_backend.entity.TempEntity;
import lombok.*;

import java.util.Date;

@ToString
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TempDto {
    private long mId;
    private String mTitle;
    private String mDir;
    private String mActor;
    private String mSupactor;
    private String mGenre;
    private int mTime;
    private Date mDate;
    private String mRating;
    private String mStory;
    public TempEntity toEntity(){
        return TempEntity.builder().mId(this.mId).mTitle(this.mTitle).mDir(this.mDir).mActor(this.mActor).mSupactor(this.mSupactor).mGenre(this.mGenre)
                        .mTime(this.mTime).mDate(this.mDate).mRating(this.mRating).mStory(this.mStory).build();

    }


}
