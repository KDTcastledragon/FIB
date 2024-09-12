package com.fox.fib.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Inquiry extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int inquiry_code;
	
	private String id;
	
	@Column(nullable=false)
	private String category;
	
	@Column(nullable=false)
	private String title;
	
	@Column(nullable=false)
	private String content;
	
	private String attached_data;
	
	private boolean answer_check;
	
	private String answer;
	
	private LocalDate answer_regdate;
	
	@Transient
	private MultipartFile inquiry_upload_file;
	
	public void setAnswer_check(boolean answer_check) {
		this.answer_check = answer_check;
		if (answer_check) {
			this.answer_regdate = LocalDate.now();
		}
	}

}
