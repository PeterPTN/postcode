package peter.postcodeapi.dtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public class CreatePostcodeDto {
	@Min(1000)
	@Max(9999)
	private int postcode;

	public int getPostcode() {
		return postcode;
	}

	public void setPostcode(int postcode) {
		this.postcode = postcode;
	}
}
