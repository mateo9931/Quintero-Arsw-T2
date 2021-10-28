package com.example.controller;

import com.example.Service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.Service.CoronavirusService;

public class WebController {

	@RequestMapping("/")
	  String index() {
	    return "index";
	  }
	
	@GetMapping("/data")
    public ResponseEntity<?> getCovidData(){
        String json ="";
        return new ResponseEntity<>(json, HttpStatus.OK);
    }
	
}
