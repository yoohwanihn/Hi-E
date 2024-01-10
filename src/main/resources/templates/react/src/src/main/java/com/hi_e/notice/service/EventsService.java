package com.hi_e.notice.service;

import com.hi_e.event.entity.Events;
import com.hi_e.event.repository.EventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EventsService {

    private final EventsRepository eventsRepository;

    @Autowired
    public EventsService(EventsRepository eventsRepository) {
        this.eventsRepository = eventsRepository;
    }

    @Transactional
    public void insertEvents(String title, String context, Long time, String Address) {
        Events events = Events.createEvents(title, context,time,Address);
        eventsRepository.save(events);
    }

    @Transactional
    public void updateEvents(String title, String context, Long boardno, Long time, String Address) {
        Events events = eventsRepository.findById(boardno)
                .orElseThrow(() -> new IllegalArgumentException("Invalid boardno: " + boardno));

        events.setTitle(title);
        events.setContext(context);
        events.setTime(time);
        events.setAddress(Address);
        eventsRepository.save(events);
    }

    @Transactional
    public void deleteEvents(Long[] boardno) {
        for (Long id : boardno) {
            eventsRepository.deleteById(id);
        }
    }

    @Transactional(readOnly = true)
    public List<Events> getEventsList() {
        return eventsRepository.findAll();
    }
}
