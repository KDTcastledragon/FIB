package com.fox.fib.domain;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderSummaryDTO {
    private String orderDate;       // 주문 날짜 (일별)
    private long dailyOrderCount;    // 일별 주문 건수
    private long dailyOrderAmount;   // 일별 주문 금액
    
    public static String convertListToJson(List<OrderSummaryDTO> orderList) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(orderList);
    }
}