package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.repository.ActorRepository;
import com.movie.Spring_backend.repository.MovieActorRepository;
import com.movie.Spring_backend.repository.MovieMemberRepository;
import com.movie.Spring_backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ManagerOneService {
    private final JwtValidCheck jwtValidCheck;
    private final MovieRepository movieRepository;
    private final MovieMemberRepository movieMemberRepository;
    private final MovieActorRepository movieActorRepository;
    private final ActorRepository actorRepository;
    String POSTER_PATH = "/Users/mok/Desktop/Movie_Project/React_frontend/public/img/ranking";


    // 전체 영화 조회 메소드
    public List<MovieDto> getAllMovie(Map<String, String> requestMap) {

        List<MovieEntity> datas = movieRepository.findAll();


        List<MovieDto> movie= new ArrayList<>();
        for(MovieEntity dd : datas){
            List<String > mainactor = new ArrayList<>();
            List<String > subactor = new ArrayList<>();
            List<String > voiceactor = new ArrayList<>();
            List<MovieActorEntity> main = movieActorRepository.findByActor(dd,"주연");
            if(main !=null){
                for(MovieActorEntity aa : main) {
                    mainactor.add(aa.getActor().getAname());
                }
            }
            List<MovieActorEntity> sub = movieActorRepository.findByActor(dd,"조연");
            if(sub !=null){
                for(MovieActorEntity aa : sub) {
                    subactor.add(aa.getActor().getAname());
                }
            }
            List<MovieActorEntity> voice = movieActorRepository.findByActor(dd,"성우");
            if(voice !=null){
                for(MovieActorEntity aa : voice) {
                    voiceactor.add(aa.getActor().getAname());
                }
            }

            movie.add(MovieDto.builder().mid(dd.getMid()).mtitle(dd.getMtitle()).mdir(dd.getMdir()).mdate(dd.getMdate())
                    .mgenre(dd.getMgenre()).mtime(dd.getMtime()).mrating(dd.getMrating()).mimagepath(dd.getMimagepath())
                            .mainactor(mainactor).subactor(subactor).voiceactor(voiceactor)
                    .mstory(dd.getMstory()).build());
        }
        return movie;

    }

    //영화 INSERT
    @Transactional
    public void postMovie(Map<String, String> requestMap, HttpServletRequest request,MultipartFile multipartFiles) throws SQLException {

        jwtValidCheck.JwtCheck(request, "ATK");

        String name = requestMap.get("name").trim();  //이름
        String dir = requestMap.get("dir").trim();    //감독
        String genre = requestMap.get("genre").trim();//장르
        String time = requestMap.get("time").trim();  //상영시간
        String date = requestMap.get("date").trim();  //날짜
        String rating = requestMap.get("rating").trim(); //래잉
        String story = requestMap.get("story").trim();//줄거리
        String state = requestMap.get("state").trim();//줄거리
        String imagepath = null;
        if(multipartFiles!=null) {
            String path = AxiosFileTest(multipartFiles);  //이미지 주소
            imagepath = path.substring(path.lastIndexOf("img/")); //sql에 저장하는 이름을 지정해주기 위함
        }


        String main = requestMap.get("main").trim();//주연배우
        String[] mainactor = main.split(",");
        String sub = requestMap.get("sub").trim();//조연배우
        String[] subactor = sub.split(",");
        String voice = requestMap.get("voice").trim();//성우
        String[] voiceactor = voice.split(",");
    if(state.equals("insert")) {
        MovieEntity movieEntity;
        movieEntity = MovieEntity.builder().
                mtitle(name)
                .mdir(dir)
                .mgenre(genre)
                .mtime(Integer.parseInt(time))
                .mdate(Date.valueOf(date))
                .mrating(rating)
                .mstory(story)
                .mimagepath(imagepath).build();


        movieRepository.save(movieEntity);
        MovieEntity movies = movieRepository.findByMovie(movieEntity);

        if (mainactor.length > 0) {
            for (String mm : mainactor) {
                ActorEntity actor = actorRepository.findByActor(mm);  //주연 배우 중 actor table에 사람이 없으면 추가시켜준다
                ActorEntity empty;
                if (actor == null) {                        //actor가 없으면
                    empty = ActorEntity.builder()
                            .aname(mm)
                            .abirthplace("서울")
                            .build();
                    actorRepository.save(empty);                               //배우추가
                    ActorEntity actorid = actorRepository.findByActor(mm);  //추가한 id를 찾는다.

                    MovieActorEntity movieActorEntity = null;                   //영화와 배우로 주연배우 추가
                    movieActorEntity = movieActorEntity.builder()
                            .marole("주연")
                            .actor(actorid)
                            .movie(movies)
                            .build();

                    movieActorRepository.save(movieActorEntity);
                } else {                                                            //배우가 있으면
                    ActorEntity actorid = actorRepository.findByActor(mm);    //배우 아이디를 찾은 후

                    MovieActorEntity movieActorEntity = null;                     //영화와 배우로 주연배우 추가
                    movieActorEntity = movieActorEntity.builder()
                            .marole("주연")
                            .actor(actorid)
                            .movie(movies)
                            .build();

                    movieActorRepository.save(movieActorEntity);
                }
            }
        }


        if (subactor.length > 0) {
            for (String mm : subactor) {
                ActorEntity actor = actorRepository.findByActor(mm);  //주연 배우 중 actor table에 사람이 없으면 추가시켜준다
                ActorEntity empty;
                if (actor == null) {                        //actor가 없으면
                    empty = ActorEntity.builder()
                            .aname(mm)
                            .abirthplace("서울")
                            .build();
                    actorRepository.save(empty);                               //배우추가
                    ActorEntity actorid = actorRepository.findByActor(mm);  //추가한 id를 찾는다.

                    MovieActorEntity movieActorEntity = null;                   //영화와 배우로 주연배우 추가
                    movieActorEntity = movieActorEntity.builder()
                            .marole("조연")
                            .actor(actorid)
                            .movie(movies)
                            .build();

                    movieActorRepository.save(movieActorEntity);
                } else {                                                            //배우가 있으면
                    ActorEntity actorid = actorRepository.findByActor(mm);    //배우 아이디를 찾은 후

                    MovieActorEntity movieActorEntity = null;                     //영화와 배우로 주연배우 추가
                    movieActorEntity = movieActorEntity.builder()
                            .marole("조연")
                            .actor(actorid)
                            .movie(movies)
                            .build();

                    movieActorRepository.save(movieActorEntity);
                }
            }
        }

        if (voiceactor.length > 0) {
            for (String mm : voiceactor) {
                ActorEntity actor = actorRepository.findByActor(mm);  //주연 배우 중 actor table에 사람이 없으면 추가시켜준다
                ActorEntity empty;
                if (actor == null) {                        //actor가 없으면
                    empty = ActorEntity.builder()
                            .aname(mm)
                            .abirthplace("서울")
                            .build();
                    actorRepository.save(empty);                               //배우추가
                    ActorEntity actorid = actorRepository.findByActor(mm);  //추가한 id를 찾는다.

                    MovieActorEntity movieActorEntity = null;                   //영화와 배우로 주연배우 추가
                    movieActorEntity = movieActorEntity.builder()
                            .marole("성우")
                            .actor(actorid)
                            .movie(movies)
                            .build();

                    movieActorRepository.save(movieActorEntity);
                } else {                                                            //배우가 있으면
                    ActorEntity actorid = actorRepository.findByActor(mm);    //배우 아이디를 찾은 후

                    MovieActorEntity movieActorEntity = null;                     //영화와 배우로 주연배우 추가
                    movieActorEntity = movieActorEntity.builder()
                            .marole("성우")
                            .actor(actorid)
                            .movie(movies)
                            .build();

                    movieActorRepository.save(movieActorEntity);
                }
            }

        }
    }
    else if(state.equals("update")){


        System.out.println("update");
    }
        //문자열  start위치부터 끝까지 문자열 자르기
    }
    //포스터를 저장
    public String AxiosFileTest (MultipartFile multipartFiles) throws SQLException {


        Map<String,Object> resultMap = new HashMap<String,Object>();
        String FileNames ="";
        System.out.println("paramMap =>"+multipartFiles);


            String originFileName = multipartFiles.getOriginalFilename(); // 원본 파일 명
            long fileSize = multipartFiles.getSize(); // 파일 사이즈
            System.out.println("originFileName : " + originFileName);
            System.out.println("fileSize : " + fileSize);

            String safeFile =System.currentTimeMillis() + originFileName;

            FileNames =safeFile;
            try {
                File f1 = new File(POSTER_PATH,safeFile);
                //업로드 주소 , 파일명
                multipartFiles.transferTo(f1);
                //저장
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

        Map<String, Object> paramMap = new HashMap<String, Object>();
        System.out.println("FileNames =>"+ FileNames);
        resultMap.put("JavaData", paramMap);
        return POSTER_PATH +"/" + FileNames;
    }

}
