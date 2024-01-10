package com.hi_e.schedule;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class EventController {
	
	@PostMapping("/sendEvent")
    public ResponseEntity<String> receiveEvent(@RequestBody Event event) {
        String eventTitle = event.getTitle();
        // Return a response, for example, a success message
        return ResponseEntity.ok("Event received: " + eventTitle);
	}
}
