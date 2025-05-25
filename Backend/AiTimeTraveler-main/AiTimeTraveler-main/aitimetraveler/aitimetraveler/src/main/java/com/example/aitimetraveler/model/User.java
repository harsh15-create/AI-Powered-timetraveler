package com.example.aitimetraveler.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users") // Optional: gives table a clean name
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String dob;
    private String currentSituation;

    @Column(name = "interest")
    private String interests;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserPersonality> personalities;

    private String selectedTimeline;

    // Constructors
    public User() {}

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDob() {
        return dob;
    }

    public String getCurrentSituation() {
        return currentSituation;
    }

    public String getInterests() {
        return interests;
    }

    public List<UserPersonality> getPersonalities() {
        return personalities;
    }

    public String getSelectedTimeline() {
        return selectedTimeline;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public void setCurrentSituation(String currentSituation) {
        this.currentSituation = currentSituation;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public void setPersonalities(List<UserPersonality> personalities) {
        this.personalities = personalities;
    }

    public void setSelectedTimeline(String selectedTimeline) {
        this.selectedTimeline = selectedTimeline;
    }
}
