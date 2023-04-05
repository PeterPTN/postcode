package peter.postcodeapi.suburb;

import jakarta.validation.constraints.NotBlank;

public class CreateSuburbDto {
	@NotBlank
	private String name;
	
	@NotBlank
	private int population;
	
	@NotBlank
	private int postcode;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPopulation() {
		return population;
	}

	public void setPopulation(int population) {
		this.population = population;
	}

	public int getPostcode() {
		return postcode;
	}

	public void setPostcode(int postcode) {
		this.postcode = postcode;
	}
}
