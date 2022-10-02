package com.react.pjt.user.service;

import org.springframework.stereotype.Service;

import com.react.pjt.user.vo.UserVO;

@Service
public interface UserService {

	public UserVO readUserInfo(UserVO vo) throws Exception;
}
