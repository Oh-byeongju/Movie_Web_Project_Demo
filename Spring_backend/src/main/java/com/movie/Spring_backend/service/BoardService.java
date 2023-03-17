package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieMemberEntity;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final JwtValidCheck jwtValidCheck;
    private final BoardRepository boardRepository;

    @Transactional
    public List<BoardDto> findByAllBoard(){
        List<BoardEntity> datas = boardRepository.findByAllBoard();

        return datas.stream().map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).uid(data.getMember().getUid()).build()).collect(Collectors.toList());

    }


    //게시판에 글을 작성하는 메소드
    @Transactional
    public void BoardWrite(Map<String, String> requestMap, HttpServletRequest request) {

        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 안에 정보를 추출
        String User_id = requestMap.get("uid");
        String title = requestMap.get("title");
        String detail = requestMap.get("detail");
        String category = requestMap.get("category");

        Date nowDate = new Date();

        SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String day = DateFormat.format(nowDate);
        MemberEntity member = MemberEntity.builder().uid(User_id).build();
        BoardEntity Board;

            Board = BoardEntity.builder()
                    .btitle(title)
                    .bdate(java.sql.Date.valueOf(day))
                    .bdetail(detail)
                    .bcategory(category)
                    .member(member).build();
        boardRepository.save(Board);
    }
}
