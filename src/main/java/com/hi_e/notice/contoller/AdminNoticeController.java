package com.hi_e.notice.contoller;

import com.hi_e.notice.entity.Notice;
import com.hi_e.event.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 관리자 권한으로 공지사항을 처리하는 컨트롤러 클래스입니다.
 */
@RestController
@RequestMapping("/admin/notice")
//@CrossOrigin(origins="*", allowedHeaders="*")
public class AdminNoticeController {

    private final NoticeService noticeService;

    @Autowired
    public AdminNoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
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
     * 공지사항을 추가하는 요청을 처리하는 메소드입니다.
     * @param title   추가할 공지사항의 제목
     * @param context 추가할 공지사항의 내용
     * @return        처리 결과에 따른 ResponseEntity 객체
     */
//    @PostMapping("/insert")
//    public ResponseEntity<Map<String, Object>> insertNotice(@RequestParam String title, @RequestParam String context) {
//        System.out.println(title);
//        System.out.println(context);
//        try {
//            noticeService.insertNotice(title, context);
//            return ResponseEntity.ok(Map.of());
//        } catch (Exception e) {
//            return createErrorResponse(e.getMessage());
//        }
//    }

    /**
     * 공지사항을 수정하는 요청을 처리하는 메소드입니다.
     * @param title   수정할 공지사항의 제목
     * @param context 수정할 공지사항의 내용
     * @param boardno 수정할 공지사항의 고유 번호
     * @return        처리 결과에 따른 ResponseEntity 객체
     */
    @PostMapping("/update")
    public ResponseEntity<Map<String, Object>> updateNotice(@RequestParam String title, @RequestParam String context, @RequestParam Long boardno) {
        try {
            noticeService.updateNotice(title, context, boardno);
            return ResponseEntity.ok(Map.of());
        } catch (Exception e) {
            return createErrorResponse(e.getMessage());
        }
    }

    /**
     * 공지사항을 삭제하는 요청을 처리하는 메소드입니다.
     * @param boardno 삭제할 공지사항의 고유 번호 배열
     * @return        처리 결과에 따른 ResponseEntity 객체
     */
    @PostMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteNotice(@RequestParam Long[] boardno) {
        try {
            noticeService.deleteNotice(boardno);
            return ResponseEntity.ok(Map.of());
        } catch (Exception e) {
            return createErrorResponse(e.getMessage());
        }
    }

    /**
     * 모든 공지사항 목록을 조회하는 요청을 처리하는 메소드입니다.
     * @return 공지사항 목록과 목록 개수를 포함한 ResponseEntity 객체
     */
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getNoticeList() {
        try {
            List<Notice> noticeList = noticeService.getNoticeList();
            int noticeCount = noticeList.size();
            Map<String, Object> data = Map.of("notice", noticeList, "cnt", noticeCount);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return createErrorResponse(e.getMessage());
        }
    }
}
