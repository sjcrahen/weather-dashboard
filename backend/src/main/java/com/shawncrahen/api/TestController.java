package com.shawncrahen.api;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.apache.logging.log4j.util.LambdaUtil.getMessage;

@RestController
@RequestMapping("/test")
@AllArgsConstructor
public class TestController {

    private JdbcTemplate jdbcTemplate;


    @GetMapping("/db")
    public String testDbConnection() {
        try {
            jdbcTemplate.execute("SELECT 1");
            return "Database connection established";
        } catch (Exception e) {
            return String.format("Database connection failed: %s", e.getMessage());
        }
    }
}
