package com.hi_e.event.repository;

import com.hi_e.event.entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Events 엔티티의 데이터 액세스를 위한 JpaRepository입니다.
 */
@Repository
public interface EventsRepository extends JpaRepository<Events, Long> {

    /**
     * 경조사를 삭제하는 쿼리 메소드입니다.
     * @param boardno 삭제할 경조사의 고유 번호
     */
    @Modifying
    @Query("DELETE FROM Events n WHERE n.boardno = :boardno")
    void deleteById(Long boardno);

    /**
     * 경조사를 조회하는 쿼리 메소드입니다.
     * @param boardno 조회할 경조사의 고유 번호
     * @return        조회된 경조사의 Optional 객체
     */
    @Query("SELECT n FROM Events n WHERE n.boardno = :boardno")
    Optional<Events> findById(Long boardno);
}
