package com.react.pjt.user.service.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.react.pjt.user.service.UserService;
import com.react.pjt.user.vo.UserVO;

@Component
public class UserServiceImpl implements UserService {

	@Autowired
	private SqlSessionTemplate sqlsession;
	
	@Override
	public UserVO readUserInfo(UserVO vo) throws Exception {
		// TODO Auto-generated method stub
		return  sqlsession.selectOne("userMapper.selectUserMstDetail", vo );
	}
}
