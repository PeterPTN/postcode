package peter.postcodeapi.postcode;

import org.springframework.beans.factory.annotation.Autowired;

import peter.postcodeapi.exceptions.NotFoundException;

public class PostcodeUtils {
	@Autowired
	private PostcodeServices postcodeServices;
	
	public Postcode findPostCodeByPostCodeOrElseThrow(int postcode) {
		return this.postcodeServices.findPostcodeByPostcodeNumber(postcode)
				.orElseThrow(() -> new NotFoundException(postcode + ": is an invalid postcode"));
	}
	
	public boolean findOutDoesPostcodeExist(int postcode) {
		return this.postcodeServices.findPostcodeByPostcodeNumber(postcode).isPresent();
	}
	
	public Postcode findPostCodeByIdOrElseThrow(Long id) {
		return this.postcodeServices.findPostcodeById(id)
				.orElseThrow(() -> new NotFoundException(id + ": is an invalid ID"));
	}
}
