package com.react.pjt.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.react.pjt.user.service.UserService;
import com.react.pjt.user.vo.UserVO;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@RequestMapping(value="/api/readUserInfo")
	public UserVO readUserInfo(UserVO vo) throws Exception {
		
		vo.setUserId("test");
		
		return userService.readUserInfo(vo);
	}
}
