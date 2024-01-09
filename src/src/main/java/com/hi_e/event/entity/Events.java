package com.hi_e.event.entity;

import org.hibernate.annotations.DynamicInsert;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 경조사를 나타내는 엔티티 클래스입니다.
 */
@Entity
@Data
@NoArgsConstructor
@DynamicInsert
@Table(name = "events")
public class Events {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardno;

    @Column(name = "title")
    private String title;

    @Column(name = "context")
    private String context;

    @Column(name = "time")
    private Long time;
    
    private Boolean show;
    
    @Column(name = "address")
    private String address;
    

    @Builder
    private Events(Long boardno, String title, String context, Long time, Boolean show, String address) {
        this.boardno = boardno;
        this.title = title;
        this.context = context;
        this.time = time;
        this.show = show;
        this.address = address;
    }

    /**
     * 제목을 설정합니다.
     * @param title 설정할 제목
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * 내용을 설정합니다.
     * @param context 설정할 내용
     */
    public void setContext(String context) {
        this.context = context;
    }
    
    public void setTime(Long time) {
    	this.time = time;
    }
    
    public void setAddress(String address) {
    	this.address = address;
    }

    /**
     * 제목과 내용을 이용하여 새로운 Notice 인스턴스를 생성합니다.
     * @param title   생성할 경조사의 제목
     * @param context 생성할 경조사의 내용
     * @return        생성된 Notice 인스턴스
     */
    public static Events createEvents(String title, String context, Long time, String address) {
        return Events.builder()
                .title(title)
                .context(context)
                .time(time)
                .address(address)
                .show(true)
                .build();
    }
}
