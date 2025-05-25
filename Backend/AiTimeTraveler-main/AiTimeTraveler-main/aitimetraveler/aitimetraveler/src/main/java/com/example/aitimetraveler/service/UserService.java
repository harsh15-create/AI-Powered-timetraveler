package com.example.aitimetraveler.service;

import com.example.aitimetraveler.dto.UserDTO;
import com.example.aitimetraveler.model.User;
import com.example.aitimetraveler.model.UserPersonality;
import com.example.aitimetraveler.repository.UserRepository;
import com.example.aitimetraveler.repository.UserPersonalityRepository;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPersonalityRepository userPersonalityRepository;

    public User saveUser(UserDTO userDTO) {
        // Step 1: Create User entity
        User user = new User();
        user.setName(userDTO.getName());
        user.setDob(userDTO.getDob());
        user.setCurrentSituation(userDTO.getCurrentSituation());
        user.setInterests(userDTO.getInterests() != null ? userDTO.getInterests() : "");

        // Step 2: Save User to get an ID
        User savedUser = userRepository.save(user);

        // Step 3: Map personalities and assign user
        List<UserPersonality> personalities = new ArrayList<>();
        for (String personalityStr : userDTO.getPersonalities()) {
            UserPersonality personality = new UserPersonality();
            personality.setPersonality(personalityStr);
            personality.setUser(savedUser);
            personalities.add(personality);
        }

        // Step 4: Save all personalities
        userPersonalityRepository.saveAll(personalities);

        // Optional: attach to user object
        savedUser.setPersonalities(personalities);

        return savedUser;
    }

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
}
