package peter.postcodeapi.postcode;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostcodeRepository extends JpaRepository<Postcode, Long> {
	// JPA generates a query based on method signature
	// PostcodeNumber is camel_case'd to postcode_number for the query 
	 Optional<Postcode> findByPostcodeNumber(int postCodeNumber);
}
