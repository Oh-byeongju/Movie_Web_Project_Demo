package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.BoardCommentDto;
import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.entity.BoardCommentEntity;
import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.repository.BoardCommentRepository;
import com.movie.Spring_backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
public class BoardCommentService {

    private final JwtValidCheck jwtValidCheck;
    private final BoardCommentRepository boardCommentRepository;


    //댓글을 불러오는 메소드
    @Transactional
    public List<BoardCommentDto>  findByComment(Long bid){
        List<BoardCommentEntity> datas =boardCommentRepository.findByComment(bid);

        return datas.stream().map(data -> BoardCommentDto.builder().bcid(data.getBcid()).bccomment(data.getBccomment())
                .bcdate(data.getBcdate()).bcparent(data.getBcparent()).bcgroup(data.getBcgroup()).deep(data.getDeep())
                .uid(data.getMember().getUid()).build()).collect(Collectors.toList());
    }
    //댓글을 작성하는 메소드
    @Transactional
    public void CommentWrite(Map<String, String> requestMap, HttpServletRequest request) {

        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");
        String User_id = SecurityUtil.getCurrentMemberId();
        String text = requestMap.get("text").trim();
        String group = requestMap.get("group").trim();
        String board = requestMap.get("bid").trim();
        String deep = requestMap.get("deep").trim();
        System.out.println(text);
        System.out.println(group);
        System.out.println(board);
        Date nowDate = new Date();

        SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String day = DateFormat.format(nowDate);
        MemberEntity member = MemberEntity.builder().uid(User_id).build();
        BoardEntity bid = BoardEntity.builder().bid(Long.valueOf(board)).build();
        BoardCommentEntity Board;

        Board = BoardCommentEntity.builder()
                .bccomment(text)
                .bcdate(day)
                .bcgroup(Integer.valueOf(group))
                .bcparent(Integer.valueOf(group))
                .deep(Integer.valueOf(deep))
                .board(bid)
                .member(member).build();


        boardCommentRepository.save(Board);
    }
}
