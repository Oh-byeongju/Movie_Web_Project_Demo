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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final JwtValidCheck jwtValidCheck;
    private final BoardRepository boardRepository;


    //게시글을 전체 불러오는 메소드 ,최신순
    @Transactional
    public Page<BoardDto> PaginationBid(Integer index){

        PageRequest page = PageRequest.of(index,20);   //(페이지 순서, 단일 페이지 크기)
        Page<BoardEntity> pages = boardRepository.PaginationBid(page);
        return pages.map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                .blike(data.getBlike()).bunlike(data.getBunlike()).commentcount(data.getCommentcount()).uid(data.getMember().getUid()).build());
    }
    //게시글 전체 불러오는 메소드, top순
    @Transactional
    public Page<BoardDto> PaginationIndex(Integer index){

        PageRequest page = PageRequest.of(index,20);   //(페이지 순서, 단일 페이지 크기)
        Page<BoardEntity> pages = boardRepository.PaginationIndex(page);
        return pages.map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                .blike(data.getBlike()).bunlike(data.getBunlike()).commentcount(data.getCommentcount()).uid(data.getMember().getUid()).build());
    }


    //게시글 상세 페이지를 불러오느 메소드
    //게시글 조회수 +1
    @Transactional
    public List<BoardDto> findByContent(Long id , String title){
        boardRepository.updateViews(id);
        List<BoardEntity> datas = boardRepository.findByContent(id,title);
        return datas.stream().map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).bclickindex(data.getBclickindex()).blike(data.getBlike())
                .bunlike(data.getBunlike()).commentcount(data.getCommentcount()).uid(data.getMember().getUid()).build()).collect(Collectors.toList());
    }

    //페이지내 제목으로 검색하는 메소드
    @Transactional
    public Page<BoardDto> SearchTitle(Integer index, String title){
        PageRequest page = PageRequest.of(index,20);   //(페이지 순서, 단일 페이지 크기)
        Page<BoardEntity> pages = boardRepository.SearchTitle(page, title);
        return pages.map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                .blike(data.getBlike()).bunlike(data.getBunlike()).commentcount(data.getCommentcount()).uid(data.getMember().getUid()).build());
    }

    //페이지내 제목으로 검색하는 메소드
    @Transactional
    public Page<BoardDto> SearchUid(Integer index, String uid){
        PageRequest page = PageRequest.of(index,20);   //(페이지 순서, 단일 페이지 크기)
        Page<BoardEntity> pages = boardRepository.SearchUid(page, uid);
        return pages.map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                .blike(data.getBlike()).bunlike(data.getBunlike()).commentcount(data.getCommentcount()).uid(data.getMember().getUid()).build());
    }

    //게시판에 글을 작성하는 메소드
    @Transactional
    public void BoardWrite(Map<String, String> requestMap, HttpServletRequest request) {

        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");
        String User_id = requestMap.get("uid");
        String title = requestMap.get("title").trim();
        String detail = requestMap.get("detail").trim();
        String category = requestMap.get("category").trim();

        Date nowDate = new Date();

        SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String day = DateFormat.format(nowDate);
        MemberEntity member = MemberEntity.builder().uid(User_id).build();
        BoardEntity Board;

            Board = BoardEntity.builder()
                    .btitle(title)
                    .bdate(day)
                    .bdetail(detail)
                    .bcategory(category)
                    .bclickindex(0)
                    .blike(0)
                    .bunlike(0)
                    .member(member).build();
        boardRepository.save(Board);
    }

    @Transactional
    public void deleteBoard(Map<String, String> requestMap, HttpServletRequest request){
        jwtValidCheck.JwtCheck(request, "ATK");

        String bid = requestMap.get("bid");

        boardRepository.deleteBoard(Long.valueOf(bid));
    }
}
