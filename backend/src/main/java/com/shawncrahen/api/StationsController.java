package com.shawncrahen.api;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/admin/stations")
public class StationsController {

    @GetMapping()
    public ResponseEntity<String> getStations() {
        return ResponseEntity.ok("List of stations");
    }
}
