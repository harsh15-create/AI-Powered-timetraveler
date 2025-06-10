package aitimetraveler.controller;

import aitimetraveler.model.User;
import aitimetraveler.service.AIStoryService;
import aitimetraveler.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/story")
@CrossOrigin(origins = "http://localhost:3000") // Adjust if frontend runs on a different port
public class AIStoryController {

    private final AIStoryService aiStoryService;
    private final UserService userService;

    @Autowired
    public AIStoryController(AIStoryService aiStoryService, UserService userService) {
        this.aiStoryService = aiStoryService;
        this.userService = userService;
    }

    // Example call: GET http://localhost:8080/api/story/generate?userId=22
    @GetMapping("/generate")
    public ResponseEntity<?> generateAIStory(@RequestParam Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
        }

        String prompt = userService.buildPromptFromUser(user);
        String story = aiStoryService.generateStory(prompt);

        Map<String, String> response = new HashMap<>();
        response.put("prompt", prompt);
        response.put("story", story);

        return ResponseEntity.ok(response);
    }
}
