package com.fox.fib.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.fox.fib.domain.OrderSummaryDTO;
import com.fox.fib.service.InquiryService;
import com.fox.fib.service.Member_paymentService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@AllArgsConstructor
@Log4j2
public class HomeController {

    Member_paymentService memberPaymentService;
    InquiryService inquiryService;
    
    private List<String> generateDateRange(String startDate, String endDate) {
        List<String> dateRange = new ArrayList<>();
        LocalDate start = LocalDate.parse(startDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate end = LocalDate.parse(endDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        while (!start.isAfter(end)) {
            dateRange.add(start.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
            start = start.plusDays(1);
        }
        return dateRange;
    }
    
//    @GetMapping("/home")
//    public String home() {
//        return "home"; // home.jsp 파일의 이름을 확인해주세요.
//    }
    // 브라우저에서 다른 도메인의 리소스에 대한 요청을 차단하는 보안 정책인 CORS가 적용되어 있는지 확인해야 합니다. 
    // 서버 측에서는 응답에 CORS 헤더를 올바르게 설정해야 합니다.
    @GetMapping("/home")
    public String home(HttpServletRequest request, Model model) {
    	LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(30);
    	
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String endDateString = endDate.format(formatter);
        String startDateString = startDate.format(formatter);
        log.info("endDateString : " + endDateString);
        log.info("startDateString : " + startDateString);
        log.info("일별 결과물 : " + memberPaymentService.getDailyOrderSummary(startDateString, endDateString));
        
        List<OrderSummaryDTO> dailyOrderSummary = memberPaymentService.getDailyOrderSummary(startDateString, endDateString);      
//        List<String> dateRange = generateDateRange(startDateString, endDateString);
        
        // 날짜 포맷 변경 (FullCalendar에서 인식할 수 있는 형태로 변환) 및 이벤트 리스트 생성
        List<Map<String, Object>> calendarEvents = dailyOrderSummary.stream()
                .map(orderSummary -> {
                    String formattedDate = LocalDate.parse(orderSummary.getOrderDate()).toString();

                    Map<String, Object> event = new HashMap<>();
                    event.put("count", "주문 수: " + orderSummary.getDailyOrderCount());  // 총 주문건수
                    event.put("amount", "매출금액: " + orderSummary.getDailyOrderAmount());  // 총가격
                    event.put("date", "날짜: " + orderSummary.getOrderDate());  // 날짜
                    event.put("start", formattedDate);  // 이벤트 시작 날짜
                    return event;
                })
                .collect(Collectors.toList());
        // dateRange를 반복하며 dailyOrderSummary에 날짜가 없는 경우, 누락된 날짜에 대한 OrderSummaryDTO를 추가
//        for (String date : dateRange) {
//            if (dailyOrderSummary.stream().noneMatch(summary -> summary.getOrderDate().equals(date))) {
//                dailyOrderSummary.add(new OrderSummaryDTO(date, 0, 0)); // null 대신에 적절한 기본값 사용
//            }
//        }
//        dailyOrderSummary.sort(Comparator.comparing(s -> LocalDate.parse(s.getOrderDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd"))));

        // 가장 높은 가격의 주문 찾기
        OrderSummaryDTO maxPriceOrder = findMaxPriceOrder(dailyOrderSummary);

        log.info("dailyOrderSummaryAdd : " + dailyOrderSummary);
        log.info("maxPriceOrder : " + maxPriceOrder);
        log.info("calendarEvents : " + calendarEvents);
        // 일별데이터
        model.addAttribute("calendarEvents", calendarEvents);
        model.addAttribute("dailyOrderSummary", dailyOrderSummary);
        model.addAttribute("UnAnsweredInquiries", inquiryService.getMInquiryList(false));
        model.addAttribute("maxPriceOrder", maxPriceOrder); // 최대 가격 주문을 모델에 추가
        return "home"; // adminHome은 관리자 페이지의 JSP 파일명입니다.
    }
   

    // 최대 가격 주문을 찾는 메서드
    private OrderSummaryDTO findMaxPriceOrder(List<OrderSummaryDTO> dailyOrderSummary) {
        OrderSummaryDTO maxPriceOrder = dailyOrderSummary.stream()
                .max(Comparator.comparing(OrderSummaryDTO::getDailyOrderAmount))
                .orElse(null);
        return maxPriceOrder;
    }
}