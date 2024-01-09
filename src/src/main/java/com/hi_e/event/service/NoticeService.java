package com.hi_e.event.service;

import com.hi_e.notice.entity.Notice;
import com.hi_e.notice.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;

    @Autowired
    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    @Transactional
    public void insertNotice(String title, String context) {
        Notice notice = Notice.createNotice(title, context);
        noticeRepository.save(notice);
    }

    @Transactional
    public void updateNotice(String title, String context, Long boardno) {
        Notice notice = noticeRepository.findById(boardno)
                .orElseThrow(() -> new IllegalArgumentException("Invalid boardno: " + boardno));

        notice.setTitle(title);
        notice.setContext(context);
        noticeRepository.save(notice);
    }

    @Transactional
    public void deleteNotice(Long[] boardno) {
        for (Long id : boardno) {
            noticeRepository.deleteById(id);
        }
    }

    @Transactional(readOnly = true)
    public List<Notice> getNoticeList() {
        return noticeRepository.findAll();
    }
}
