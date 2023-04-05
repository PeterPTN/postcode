package peter.postcodeapi.suburb;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import peter.postcodeapi.postcode.Postcode;

public interface SuburbRepository extends JpaRepository<Suburb, Long> {
	// JPA auto-generates a query that matches signature with argument
	// Find suburb by post code custom query
	List<Suburb> findByPostCode(Postcode postcode);
	
	Optional<Suburb> findByName(String name);
}
