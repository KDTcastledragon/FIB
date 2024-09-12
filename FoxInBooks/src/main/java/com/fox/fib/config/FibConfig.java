package com.fox.fib.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
//=> 스프링에서 설정파일로 인식하도록 함 
public class FibConfig implements WebMvcConfigurer {
// => 일반적인 Bean 설정용	

	@Bean
	public PasswordEncoder getPasswordEncord() {
		return new BCryptPasswordEncoder();
	}

} // class
