package com.movie.Spring_backend.controller;


import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Locale;

@RestController
@RequestMapping("/v2")

public class PaymentController {
    private final IamportClient iamportClient;

    @Autowired
    public PaymentController() {
        // REST API 키와 REST API secret 를 아래처럼 순서대로 입력한다.
        this.iamportClient = new IamportClient("${spring.payment.api}","${spring.payment.apiSecret}");}

    @PostMapping("/normal/verifyIamport/{imp_uid}")
    public IamportResponse<Payment> paymentByImpUid( @PathVariable(value= "imp_uid") String imp_uid
            , HttpServletRequest request)
            throws IamportResponseException, IOException {
        System.out.println("paymentByImpUid 진입");
        IamportResponse<Payment> paymentIamportResponse = iamportClient.paymentByImpUid(imp_uid);

        Payment payment = paymentIamportResponse.getResponse();
        HttpSession session = request.getSession(false); //로그인이 된 사용자가 세션을 사용하고 있으므로 false 세팅을 해준것임
        session.setAttribute("payment",payment);
        session.setMaxInactiveInterval(60);

        return paymentIamportResponse;

    }
}
