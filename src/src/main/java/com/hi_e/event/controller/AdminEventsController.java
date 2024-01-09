package com.hi_e.event.controller;

import com.hi_e.event.entity.Events;
import com.hi_e.notice.service.EventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
/**
 * 관리자 권한으로 경조사를 처리하는 컨트롤러 클래스입니다.
 */
@RestController
@RequestMapping("/admin/events")
//@CrossOrigin(origins="*", allowedHeaders="*")
public class AdminEventsController {

    private final EventsService eventsService;

    @Autowired
    public AdminEventsController(EventsService eventsService) {
        this.eventsService = eventsService;
    }

    /**
     * 에러 응답을 생성하는 메소드입니다.
     * @param errorMessage 생성할 에러 메시지
     * @return             생성된 ResponseEntity 객체
     */
    private ResponseEntity<Map<String, Object>> createErrorResponse(String errorMessage) {
        Map<String, Object> response = new HashMap<>();
        Map<String, String> popdata = new HashMap<>();
        popdata.put("poptext", errorMessage);
        response.put("popdata", popdata);
        return ResponseEntity.badRequest().body(response);
    }

    /**
     * 경조사를 추가하는 요청을 처리하는 메소드입니다.
     * @param title   추가할 경조사의 제목
     * @param context 추가할 경조사의 내용
     * @return        처리 결과에 따른 ResponseEntity 객체
     */
    @PostMapping("/insert")
    public ResponseEntity<Map<String, Object>> insertEvents(@RequestParam String title, @RequestParam String context, @RequestParam String date, @RequestParam String Address) {
        try {
        	LocalDate localDate = LocalDate.parse(date);
        	LocalDateTime localDateTime = localDate.atStartOfDay();
        	long timestamp = localDateTime.toInstant(ZoneOffset.UTC).toEpochMilli() / 1000;
            eventsService.insertEvents(title, context, timestamp, Address);
            return ResponseEntity.ok(Map.of());
        } catch (Exception e) {
            return createErrorResponse(e.getMessage());
        }
    }

    /**
     * 경조사를 수정하는 요청을 처리하는 메소드입니다.
     * @param title   수정할 경조사의 제목
     * @param context 수정할 경조사의 내용
     * @param boardno 수정할 경조사의 고유 번호
     * @return        처리 결과에 따른 ResponseEntity 객체
     */
    @PostMapping("/update")
    public ResponseEntity<Map<String, Object>> updateEvents(@RequestParam String title, @RequestParam String context, @RequestParam Long boardno, @RequestParam String date, @RequestParam String Address) {
        try {
        	LocalDate localDate = LocalDate.parse(date);
        	LocalDateTime localDateTime = localDate.atStartOfDay();
        	long timestamp = localDateTime.toInstant(ZoneOffset.UTC).toEpochMilli() / 1000;
            eventsService.updateEvents(title, context, boardno, timestamp, Address);
            return ResponseEntity.ok(Map.of());
        } catch (Exception e) {
            return createErrorResponse(e.getMessage());
        }
    }

    /**
     * 경조사를 삭제하는 요청을 처리하는 메소드입니다.
     * @param boardno 삭제할 경조사의 고유 번호 배열
     * @return        처리 결과에 따른 ResponseEntity 객체
     */
    @PostMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteEvents(@RequestParam Long[] boardno) {
        try {
            eventsService.deleteEvents(boardno);
            return ResponseEntity.ok(Map.of());
        } catch (Exception e) {
            return createErrorResponse(e.getMessage());
        }
    }

    /**
     * 모든 경조사 목록을 조회하는 요청을 처리하는 메소드입니다.
     * @return 경조사 목록과 목록 개수를 포함한 ResponseEntity 객체
     */
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getEventsList() {
        try {
            List<Events> eventsList = eventsService.getEventsList();
            int eventsCount = eventsList.size();
            Map<String, Object> data = Map.of("notice", eventsList, "cnt", eventsCount);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return createErrorResponse(e.getMessage());
        }
    }
}
