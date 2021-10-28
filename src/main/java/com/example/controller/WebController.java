package com.example.controller;

import org.springframework.web.bind.annotation.RequestMapping;

public class WebController {

	@RequestMapping("/")
	  String index() {
	    return "index";
	  }
}
