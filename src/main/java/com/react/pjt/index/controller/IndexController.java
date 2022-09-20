package com.react.pjt.index.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {

	/*
	@RequestMapping(value = "/")
	public String index() {
		return "/index";
	}
	*/
	
	@RequestMapping(value = "/api/hello" , method = RequestMethod.GET)
	public String index() {
		return "안녕";
	}
}
