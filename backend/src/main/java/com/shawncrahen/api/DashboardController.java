package com.shawncrahen.api;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping()
    public ResponseEntity<?> getDashboard() {
        return ResponseEntity.ok().body("Dashboard");
    }
}
