package com.example.aitimetraveler.controller;

import com.example.aitimetraveler.dto.UserDTO;
import com.example.aitimetraveler.model.User;
import com.example.aitimetraveler.service.UserService;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000") // Change this if your frontend uses a different port
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createUser(@Valid @RequestBody UserDTO userDTO) {
        User savedUser = userService.saveUser(userDTO);

        Map<String, Object> response = new HashMap<>();
        response.put("id", savedUser.getId());
        response.put("name", savedUser.getName());

        return ResponseEntity.ok(response);
    }

    // DTO class for timeline update
    public static class TimelineDTO {
        private String timelineName;

        public String getTimelineName() {
            return timelineName;
        }

        public void setTimelineName(String timelineName) {
            this.timelineName = timelineName;
        }
    }

    // Update user's selected timeline DTO
    @PutMapping("/{userId}/selectTimeline")
    public ResponseEntity<Map<String, String>> updateTimeline(@PathVariable Long userId, @RequestBody Map<String, String> body) {
        String timelineName = body.get("timelineName");
        User updatedUser = userService.updateUserTimeline(userId, timelineName);

        if (updatedUser == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "User not found or error updating timeline."));
        }

        return ResponseEntity.ok(Map.of("message", "Timeline updated successfully"));
    }
}
