package com.movie.Spring_backend.entity;
import javax.persistence.*;
import lombok.*;
@Entity

@Table(name="movie")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long m_id;

    @Column(nullable = false, unique = true, length = 30)
    private String m_title;

    @Column(nullable = false, length = 30)
    private String m_dir;

    public MemberEntity(String m_title, String m_dir) {
        this.m_title = m_title;
        this.m_dir = m_dir;
    }

}
