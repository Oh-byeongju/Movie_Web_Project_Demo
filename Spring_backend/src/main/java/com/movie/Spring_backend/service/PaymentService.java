package com.movie.Spring_backend.service;

import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.payment.Payment;
import com.movie.Spring_backend.repository.MemberRepository;
import com.movie.Spring_backend.repository.MovieInfoSeatRepository;
import com.movie.Spring_backend.repository.RedisSeatRepository;
import com.movie.Spring_backend.repository.ReservationRepository;
import com.movie.Spring_backend.util.RemoveLastChar;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@RequiredArgsConstructor
@Service
public class PaymentService {

    private final Payment payment;
    private final MemberRepository memberRepository;
    private final MovieInfoSeatRepository movieInfoSeatRepository;
    private final JwtValidCheck jwtValidCheck;
    private final ReservationRepository reservationRepository;
    private final RedisSeatRepository redisSeatRepository;

    @Transactional
    public ResponseEntity<?> getPayment(Map<String, String> requestMap,
                                             HttpServletRequest request, HttpSession session) throws IOException
{

        jwtValidCheck.JwtCheck(request, "ATK");

        String token = payment.getToken();
        System.out.println("토큰 : " + token);

        String User_id = requestMap.get("uid");  //user_id
        String impUid = requestMap.get("impUid"); //결제 정보
        String miid = requestMap.get("miid");     //movieinfo_id
        String pay = requestMap.get("amount");    //pay
        String people = requestMap.get("people");
        String rpeople= RemoveLastChar.removeLast(people);
        System.out.println(rpeople);
        int payamount = Integer.parseInt(pay);  //비교를 위한 형변환
        MemberEntity member = MemberEntity.builder().uid(User_id).build();   //entity형태로 변환
        MovieInfoEntity info = MovieInfoEntity.builder().miid(Long.valueOf(miid)).build(); //entity형태로 변환
        Date nowDate = new Date();

        // 현재 시간을 sql에 사용할 수 있게 매핑
        SimpleDateFormat DateFormatYMD = new SimpleDateFormat("yyyy-MM-dd");
        String day = DateFormatYMD.format(nowDate);
        String[] SeatNumber = requestMap.get("sid").split(",");
        List<Long> sid = new ArrayList<>();
        for(String s: SeatNumber){
            sid.add(Long.parseLong(s));
        }
        //결제 정보 저장
        int amount = payment.paymentInfo(impUid, token);  //토큰과 결제정보로 추출한 amount
    ReservationEntity reservationEntity;

        try{
            //아이디가 있어야 함
            if(memberRepository.existsById(User_id)){
                if(payamount==amount){ //리턴된 페이와 프론트 리턴 페이 보냄

                    reservationEntity = ReservationEntity.builder()
                            .rdate(java.sql.Date.valueOf(day))
                            .rprice(payamount)
                            .rpeople(rpeople)
                            .rtoken(token)
                            .rpayid(impUid)
                            .movieInfo(info)
                            .member(member)
                            .build();
                    reservationRepository.save(reservationEntity);

                    ReservationEntity data= reservationRepository.findByRpayid(impUid);

                   List<MovieInfoSeatEntity> infoseat = new ArrayList<>();
                   for(Long ss :sid){
                       MovieInfoSeatEntity movieInfoSeatEntity= MovieInfoSeatEntity.builder()
                               .seat(SeatEntity.builder().sid(ss).build())
                               .info(info)
                               .reserve(data)
                               .build();
                       infoseat.add(movieInfoSeatEntity);

                       String keys = "";
                       keys = miid + "," + ss;
                       RedisSeatEntity redisSeatEntity = new RedisSeatEntity(keys, User_id);
                       redisSeatRepository.delete(redisSeatEntity);

                   }


                   movieInfoSeatRepository.saveAll(infoseat);
                    // MovieMember = MovieMemberEntity.builder()
                    //    .umlike(true)
                    //      .movie(movie)
                    //        .member(member).build();
                    return new ResponseEntity<>(data.getRid(), HttpStatus.OK);
                }
                else {
                    payment.payMentCancle(token, impUid, amount, "결제 에러");
                    return new ResponseEntity<String>("결제 오류!", HttpStatus.BAD_REQUEST);
                }
            }
            else{

                payment.payMentCancle(token, impUid, amount, "결제 에러");
                return new ResponseEntity<String>("결제 오류!", HttpStatus.BAD_REQUEST);
            }
        }catch(Exception e){
            payment.payMentCancle(token, impUid, amount, "결제 에러");
            return new ResponseEntity<String>("결제 오류!", HttpStatus.BAD_REQUEST);
        }
    }
    }


