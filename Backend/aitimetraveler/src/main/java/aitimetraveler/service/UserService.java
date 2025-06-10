package aitimetraveler.service;

import aitimetraveler.dto.UserDTO;
import aitimetraveler.model.User;
import aitimetraveler.model.UserPersonality;
import aitimetraveler.repository.UserRepository;
import aitimetraveler.repository.UserPersonalityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPersonalityRepository userPersonalityRepository;

    @Autowired
    private AIStoryService aiStoryService;

    // Save user with personalities
    public User saveUser(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setDob(userDTO.getDob());
        user.setCurrentSituation(userDTO.getCurrentSituation());
        user.setInterests(userDTO.getInterests() != null ? userDTO.getInterests() : "");

        User savedUser = userRepository.save(user);

        List<UserPersonality> personalities = new ArrayList<>();
        for (String personalityStr : userDTO.getPersonalities()) {
            UserPersonality personality = new UserPersonality();
            personality.setPersonality(personalityStr);
            personality.setUser(savedUser);
            personalities.add(personality);
        }

        userPersonalityRepository.saveAll(personalities);
        savedUser.setPersonalities(personalities);

        // Keep only latest 10 users
        long count = userRepository.count();
        if (count > 10) {
            List<User> users = userRepository.findAllByOrderByIdAsc();
            int excess = (int) (count - 10);
            for (int i = 0; i < excess; i++) {
                userRepository.delete(users.get(i));
            }
        }

        return savedUser;
    }

    // Update selected timeline for a user
    public User updateUserTimeline(long userId, String timelineName) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setSelectedTimeline(timelineName);
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    // 🔥 NEW METHOD — Save timeline + generate + store story
    public String updateUserTimelineAndGenerateStory(Long userId, String timelineName) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return "User not found.";
        }

        User user = optionalUser.get();
        user.setSelectedTimeline(timelineName);
        userRepository.save(user); // Save timeline

        String prompt = buildPromptFromUser(user);
        String story = aiStoryService.generateStory(prompt); // Call AI API

        if (story != null && !story.isEmpty()) {
            user.setGeneratedStory(story);
            userRepository.save(user); // Save story
        }

        return story;
    }

    // Build AI prompt from user data
    public String buildPromptFromUser(User user) {
        String name = user.getName();
        String dob = user.getDob();
        String currentSituation = user.getCurrentSituation();
        String interests = user.getInterests();

        List<String> personalities = new ArrayList<>();
        if (user.getPersonalities() != null) {
            for (UserPersonality up : user.getPersonalities()) {
                personalities.add(up.getPersonality());
            }
        }

        String personalityStr = String.join(", ", personalities);
        if (personalityStr.isEmpty()) personalityStr = "not specified";

        String interestPart = (interests == null || interests.isEmpty()) ? "" : " my interests are " + interests;
        String timeline = user.getSelectedTimeline() != null ? user.getSelectedTimeline() : "unknown timeline";

        return String.format(
            "My name is %s i was born on %s currently am %s my personality type are %s%s i want to do a timetravel in the timeline %s generate me a short human readable simple story or scenerio of that era",
            name, dob, currentSituation, personalityStr, interestPart, timeline
        );
    }

    // Generate story from saved user data
    public String generateStoryForUser(Long userId) {
        User user = getUserById(userId);
        if (user == null) {
            return "User not found.";
        }

        String prompt = buildPromptFromUser(user);
        return aiStoryService.generateStory(prompt);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
