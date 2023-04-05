package peter.postcodeapi.postcode;

import jakarta.validation.constraints.Size;

public class CreatePostcodeDto {
	@Size(min = 4)
	private int postcode;

	public int getPostcode() {
		return postcode;
	}

	public void setPostcode(int postcode) {
		this.postcode = postcode;
	}
}
