package com.fox.fib.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Faq {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int faq_code;
	
	@Column(nullable=false)
	private String category;
	
	@Column(nullable=false)
	private String title;
	
	@Column(nullable=false)
	private String content;
	
}
