package com.movie.Spring_backend.dto;

<<<<<<< HEAD
import lombok.Builder;
=======
>>>>>>> 55401662662fb81ec2b7078091c3f62bfa411b1e
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor

public class TheaterDto {

    private Long tid;
    private String tname;
<<<<<<< HEAD

=======
>>>>>>> 55401662662fb81ec2b7078091c3f62bfa411b1e
    private String taddr;
    private String tarea;

<<<<<<< HEAD
    private String tarea;

    @Builder
=======
>>>>>>> 55401662662fb81ec2b7078091c3f62bfa411b1e
    public TheaterDto(Long tid, String tname, String taddr, String tarea) {
        this.tid=tid;
        this.tname=tname;
        this.taddr=taddr;
        this.tarea=tarea;
    }
}