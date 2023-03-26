package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.BoardCommentDto;
import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.entity.BoardCommentEntity;
import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.CommentMapper;
import com.movie.Spring_backend.mapper.CountCommentMapper;
import com.movie.Spring_backend.repository.BoardCommentRepository;
import com.movie.Spring_backend.repository.BoardRepository;
import com.movie.Spring_backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardCommentService {

    private final JwtValidCheck jwtValidCheck;
    private final BoardCommentRepository boardCommentRepository;

    private final BoardRepository boardRepository;


    //댓글을 불러오는 메소드
    @Transactional
    public CountCommentMapper  findByComment(Long bid){
        List<BoardCommentEntity> datas =boardCommentRepository.findByComment(bid);
        List<BoardCommentEntity> comment = boardCommentRepository.CommentToComment(bid);
        CountCommentMapper countCommentMapper= null;
        //전체 댓글 데이터
        List<CommentMapper> result = new ArrayList<>();
        Map<Long, CommentMapper> map = new HashMap<>();
        Integer count = 0;
        if(comment==null) {
            System.out.println("예외처리");
        }
        for(BoardCommentEntity com : comment){
            count++;
            CommentMapper dto = new CommentMapper(com);
            map.put(dto.getBcid(),dto);
            if(com.getParent()!=null){
                map.get(com.getParent()).getChild().add(dto);
            }
            else{
                result.add(dto);
            }
        }
        countCommentMapper=new CountCommentMapper(result,count);
        return countCommentMapper;

    }

    //대댓글을 작성하는 메소드
    @Transactional
    public void CommentWrite(Map<String, String> requestMap, HttpServletRequest request) {
        jwtValidCheck.JwtCheck(request, "ATK");
        String User_id = SecurityUtil.getCurrentMemberId();
        String text = requestMap.get("text").trim();
        String bid = requestMap.get("bid").trim();
        String parentcomment = requestMap.get("parent").trim();
        System.out.println(parentcomment);

        BoardEntity boardId = BoardEntity.builder().bid(Long.valueOf(bid)).build();  //

        MemberEntity member = MemberEntity.builder().uid(User_id).build();  //유저 아이디 엔티티로 매핑

        Date nowDate = new Date();
        SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String day = DateFormat.format(nowDate);
        BoardEntity board =  boardRepository.booleanCheck(Long.valueOf(bid));  //게시물확인
        if(null==board){
           System.out.println("게시물이 없기때문에 예외처리를 해줘야함");
       }
        //정보가 온다
       BoardCommentEntity parent= null;
       //이 정보들을 불러온다
        //자식댓글일 경우
        if(parentcomment.length()!=0){  //parent가 있으면
            BoardCommentEntity comment;

            comment = BoardCommentEntity.builder()
                    .bcdate(day)
                    .bccomment(text)
                    .board(boardId)
                    .parent(Long.valueOf(parentcomment))
                    .member(member).build();
            boardCommentRepository.save(comment);
        }
        else{
            BoardCommentEntity comment;

            comment = BoardCommentEntity.builder()
                    .bcdate(day)
                    .bccomment(text)
                    .board(boardId)
                    .member(member).build();
            boardCommentRepository.save(comment);
        }

    }

    @Transactional
    public void deleteComment(Map<String, String> requestMap, HttpServletRequest request){
        jwtValidCheck.JwtCheck(request, "ATK");

        String comment = requestMap.get("comment");
        List<BoardCommentEntity> datas = boardCommentRepository.commentParent(Long.valueOf(comment));
        for(BoardCommentEntity data : datas){
            boardCommentRepository.delete(data);

        }

        boardCommentRepository.deleteById(Long.valueOf(comment));
    }
}

