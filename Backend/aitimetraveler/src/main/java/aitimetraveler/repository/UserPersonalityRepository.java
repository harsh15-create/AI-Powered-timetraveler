package aitimetraveler.repository;

import aitimetraveler.model.UserPersonality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPersonalityRepository extends JpaRepository<UserPersonality, Long> {
    // Optional: custom query methods can go here
}