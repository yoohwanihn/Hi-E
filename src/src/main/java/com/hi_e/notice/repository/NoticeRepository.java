package com.hi_e.notice.repository;

import com.hi_e.notice.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Notice 엔티티의 데이터 액세스를 위한 JpaRepository입니다.
 */
@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    /**
     * 공지사항을 삭제하는 쿼리 메소드입니다.
     * @param boardno 삭제할 공지사항의 고유 번호
     */
    @Modifying
    @Query("DELETE FROM Notice n WHERE n.boardno = :boardno")
    void deleteById(Long boardno);

    /**
     * 공지사항을 조회하는 쿼리 메소드입니다.
     * @param boardno 조회할 공지사항의 고유 번호
     * @return        조회된 공지사항의 Optional 객체
     */
    @Query("SELECT n FROM Notice n WHERE n.boardno = :boardno")
    Optional<Notice> findById(Long boardno);
}
