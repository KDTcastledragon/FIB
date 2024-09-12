package com.fox.fib.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.hibernate.type.LocalDateType;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
	@Id
	private String id;

	@Column(updatable = false)
	private String password;

	private String name;
	private String phone_number;
	private String birthday;
	private String address_zip;
	private String address;
	private String address_detail;
	private String nickname;
	private Boolean ad_check_email;
	private Boolean ad_check_sms;
	private int point;
	private LocalDateType join_date;
	private LocalDateType delete_date;
	private String profile_image;

	@Transient
	private MultipartFile uploadfilef;
}
