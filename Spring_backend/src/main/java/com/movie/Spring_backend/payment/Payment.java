package com.movie.Spring_backend.payment;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.net.ssl.HttpsURLConnection;
import java.io.*;
import java.net.URL;
import java.util.Map;
@Service
public class Payment {

    @Value("${payment.api}")
    private String impKey;

    @Value("${payment.apiSecret}")
    private String impSecret;

    @Data
    private class Response{
        private PaymentInfo response;
    }

    @Data
    private class PaymentInfo{
        private int amount;
    }


    //토큰 생성 메소드
    //이 토큰으로 밑의 paymentinfo의 결제정보를 가져올수 있음
    //토큰으로 결제 정보를 요청할 경우 json 형태의 정보를 받아옴
    public String getToken() throws IOException {

        HttpsURLConnection conn = null;
        //억세스 토큰 받는 api 주소
        URL url = new URL("https://api.iamport.kr/users/getToken");

        conn = (HttpsURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        conn.setDoOutput(true);
        JsonObject json = new JsonObject();

        //상점 apikey
        json.addProperty("imp_key", impKey);
        json.addProperty("imp_secret", impSecret);

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));

        bw.write(json.toString());
        bw.flush();
        bw.close();

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

        Gson gson = new Gson();

        String response = gson.fromJson(br.readLine(), Map.class).get("response").toString();

        System.out.println(response);

        String token = gson.fromJson(response, Map.class).get("access_token").toString();
        //access_token
        br.close();
        conn.disconnect();

        return token;
    }

    //결제 정보 요청
    public int paymentInfo(String imp_uid, String access_token) throws IOException {

        HttpsURLConnection conn = null;
        //결제내역을 조희하는 api 주소
        //결제후 나오는 return 값 : 포트원 고유번호로 결재내역 조회
        URL url = new URL("https://api.iamport.kr/payments/" + imp_uid);

        conn = (HttpsURLConnection) url.openConnection();

        //access_token
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Authorization", access_token);
        conn.setDoOutput(true);

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

        Gson gson = new Gson();

        Response response = gson.fromJson(br.readLine(), Response.class);
        System.out.println(response);
        br.close();
        conn.disconnect();

        return response.getResponse().getAmount();
    }



    //주문 최소 메소드
    //만약 토큰 , imp_uid , 가격 등 정보가 다를 시 결제를 취소해줘야 함
    public void payMentCancle(String access_token, String imp_uid, int amount, String reason) throws IOException  {
        System.out.println("결제 취소");

        System.out.println(access_token);

        System.out.println(imp_uid);

        HttpsURLConnection conn = null;
        //아임포트 결제를 취소하는 api 주소
        URL url = new URL("https://api.iamport.kr/payments/cancel");

        conn = (HttpsURLConnection) url.openConnection();

        conn.setRequestMethod("POST");

        conn.setRequestProperty("Content-type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        conn.setRequestProperty("Authorization", access_token);

        conn.setDoOutput(true);

        JsonObject json = new JsonObject();

        //imp_uid & merchant_uid
        //취소 요청시 두 파라미터중 하나는 필수로 유입되어야 합니다.

        json.addProperty("reason", reason);
        json.addProperty("imp_uid", imp_uid);
        json.addProperty("amount", amount);     //취소금액
        json.addProperty("checksum", amount);   //checksum 요청자의 취소 가능 잔액과 포트원의 취소 가능 잔액을 일치하는지 검증하고 취소를 해줌

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));

        bw.write(json.toString());
        bw.flush();
        bw.close();

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

        br.close();
        conn.disconnect();


    }




}