package peter.postcodeapi.postcode;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdatePostcodeDto {
	@Pattern(regexp="[0-9]+")
	@Size(min=4)
	private int postcode;

	public int getPostcode() {
		return postcode;
	}

	public void setPostcode(int postcode) {
		this.postcode = postcode;
	}
}
