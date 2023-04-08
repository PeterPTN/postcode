package peter.postcodeapi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import peter.postcodeapi.models.Postcode;

public interface PostcodeRepository extends JpaRepository<Postcode, Long> {
	// JPA generates a query based on method signature
	// PostcodeNumber is camel_case'd to postcode_number for the query 
	 Optional<Postcode> findByPostcode(int postcode);
}
