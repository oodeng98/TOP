package com.ssafy.top;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TopApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(TopApplication.class, args);
	}
}
