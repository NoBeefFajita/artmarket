package com.artmarket.controller.api;

import com.artmarket.config.auth.PrincipalDetail;
import com.artmarket.domain.inquiry.Inquiry;
import com.artmarket.dto.ResponseDto;
import com.artmarket.service.impl.InquiryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/inquiry")
public class InquiryApiController {

    private final InquiryServiceImpl inquiryService;

    @PostMapping("/save")
    public ResponseDto<Integer> saveInquiry(@RequestBody Inquiry inquiry,
                                            @AuthenticationPrincipal PrincipalDetail principal) {

        inquiryService.saveInquiry(inquiry, principal.getUser());
        return new ResponseDto<>(HttpStatus.OK.value(), 1);
    }

    @PostMapping("/saveFile")
    public ResponseDto<Integer> saveInquiry(@RequestParam MultipartFile file,
                                            @RequestParam String title,
                                            @RequestParam String content,
                                            @AuthenticationPrincipal PrincipalDetail principal) throws IOException {
        inquiryService.saveInquiryFile(title, content, file, principal.getUser());
        return new ResponseDto<>(HttpStatus.OK.value(), 1);
    }

}
