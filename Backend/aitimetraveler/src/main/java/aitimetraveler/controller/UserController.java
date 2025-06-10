package aitimetraveler.controller;

import aitimetraveler.dto.UserDTO;
import aitimetraveler.model.User;
import aitimetraveler.service.UserService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // Change if frontend is hosted elsewhere
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Create a new user
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createUser(@Valid @RequestBody UserDTO userDTO) {
        User savedUser = userService.saveUser(userDTO);

        Map<String, Object> response = new HashMap<>();
        response.put("id", savedUser.getId());
        response.put("name", savedUser.getName());

        return ResponseEntity.ok(response);
    }

    // 🔄 Save timeline + generate + return story (Option 2)
    @PostMapping("/{userId}/timeline")
    public ResponseEntity<?> updateTimelineAndGenerateStory(
            @PathVariable Long userId,
            @RequestParam String timelineName) {

        String story = userService.updateUserTimelineAndGenerateStory(userId, timelineName);
        if (story == null || story.equals("User not found.")) {
            return ResponseEntity.badRequest().body("User not found or story generation failed.");
        }

        return ResponseEntity.ok(Map.of("story", story));
    }

    // Read the already-generated story
     @GetMapping("/{userId}/story")
    public ResponseEntity<Map<String, String>> getUserStory(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.badRequest().body(
                    Map.of("error", "User not found"));
        }
        String story = user.getGeneratedStory();
        return ResponseEntity.ok(
                Map.of("story", story != null ? story : "No story available."));
    }

    // Optional: fetch only the story if needed
    @GetMapping("/{userId}/generate-story")
    public ResponseEntity<String> generateStory(@PathVariable Long userId) {
        String story = userService.generateStoryForUser(userId);
        if (story == null) {
            return ResponseEntity.badRequest().body("User not found or error generating story");
        }
        return ResponseEntity.ok(story);
    }
}
