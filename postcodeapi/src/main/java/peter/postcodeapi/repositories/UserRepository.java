package peter.postcodeapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import peter.postcodeapi.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
	// Change to suit query
	Optional<User> findByLogin(String login);
}
