package com.movie.Spring_backend.DTO;
import com.movie.Spring_backend.entity.MemberEntity;
import lombok.*;

import javax.persistence.Column;
import java.util.Date;

@ToString
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    private long m_id;
    private String m_title;
    private String m_dir;
    private String m_actor;
    private String m_sup_actor;
    private String m_genre;
    private int m_time;
    private Date m_date;
    private String m_rating;
    private String m_story;
    public MemberEntity toEntity(){
        return MemberEntity.builder().m_id(this.m_id).m_title(this.m_title).m_dir(this.m_dir).m_actor(this.m_actor).m_sup_actor(this.m_sup_actor).m_genre(this.m_genre)
                        .m_time(this.m_time).m_date(this.m_date).m_rating(this.m_rating).m_story(this.m_story).build();

    }


}
