package aitimetraveler.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;


import java.util.List;

@Getter
@Setter
public class UserDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Date of birth is required")
    private String dob;

    @NotBlank(message = "Current situation is required")
    private String currentSituation;

    private String interests;

    @NotEmpty(message = "At least one personality is required")
    private List<String> personalities;

    // Default constructor
    public UserDTO() {}

    // Parameterized constructor
    public UserDTO(String name, String dob, String currentSituation, String interests, List<String> personalities) {
        this.name = name;
        this.dob = dob;
        this.currentSituation = currentSituation;
        this.interests = interests;
        this.personalities = personalities;
    }

    // Getters and setters

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

    public List<String> getPersonalities() {
        return personalities;
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

    public void setPersonalities(List<String> personalities) {
        this.personalities = personalities;
    }
}
