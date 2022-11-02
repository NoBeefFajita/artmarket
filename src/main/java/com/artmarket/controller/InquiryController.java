package com.artmarket.controller;

import com.artmarket.config.auth.PrincipalDetail;
import com.artmarket.service.impl.InquiryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/inquiry")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryServiceImpl inquiry;

    /**
     * 고객 문의 메인
     */
    @GetMapping()
    public String inquiryMain(Model model,
                              @PageableDefault(size = 5, sort = "id", direction = Sort.Direction.DESC)Pageable pageable,
                              @AuthenticationPrincipal PrincipalDetail principal) {
        // 현재 로그인 한 계정의 문의 사항만
        model.addAttribute("inquiryList", inquiry.inquiryList(pageable, principal));
        return "/inquiry/main";
    }

    /**
     * 문의글 쓰기
     */
    @GetMapping("/writing")
    public String writing() {
        return "/inquiry/writing";
    }

    /**
     * 문의 상세 조회
     */
    @GetMapping("/{id}")
    public String BoardDetail(
            @PathVariable Long id, Model model,
            @AuthenticationPrincipal PrincipalDetail principalDetail
    ) {

        model.addAttribute("inquiry", inquiry.detail(id));
        model.addAttribute("principalDetail", principalDetail);
        return "inquiry/detail";
    }
}
