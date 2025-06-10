package aitimetraveler.repository;

import aitimetraveler.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Get all users ordered by id ascending (oldest first)
    List<User> findAllByOrderByIdAsc();
}
