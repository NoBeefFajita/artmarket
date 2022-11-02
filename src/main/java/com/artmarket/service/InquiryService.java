package com.artmarket.service;

import com.artmarket.config.auth.PrincipalDetail;
import com.artmarket.domain.inquiry.Inquiry;
import com.artmarket.domain.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public interface InquiryService {

    /**
     * 문의 사항 페이징
     */
    Page<Inquiry> inquiryList(Pageable pageable, @AuthenticationPrincipal PrincipalDetail principal);

    /**
     * 문의 사항 저장
     */
    void saveInquiry(Inquiry inquiry, User user);

    /**
     * 이미지 포함 문의 사항 저장
     * 저장 경로 : C:/artmarket/image/inquiry/{유저ID}
     */
    void saveInquiryFile(String title, String content, MultipartFile file, User user) throws IOException;

    /**
     * 고객 문의 정보 반환
     */
    Inquiry detail(Long id);
}
