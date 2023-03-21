package com.ssafy.doeng.config.auth;

import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.repository.member.MemberRepository;
import com.ssafy.doeng.util.SecurityUtil;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
@RequiredArgsConstructor
class LoginIdArgumentResolver implements HandlerMethodArgumentResolver {

    private final MemberRepository memberRepository;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        boolean isLoginIdAnnotation = parameter.getParameterAnnotation(LoginId.class) != null;
        return isLoginIdAnnotation;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        Optional<Member> tMember = memberRepository.findByMemberId(SecurityUtil.getCurrentId());
        Member member = tMember.get();
        return member.getId();

    }

}
