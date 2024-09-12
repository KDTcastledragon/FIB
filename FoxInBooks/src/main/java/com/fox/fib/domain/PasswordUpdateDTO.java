package com.fox.fib.domain;

import lombok.Data;

@Data
public class PasswordUpdateDTO {
	private String id;
	private String password;
	private String newPassword;
}
