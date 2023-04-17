package peter.postcodeapi.dtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public class UpdateSuburbDto {
	@Size(min = 1, max = 50)
	private String name;

	@Max(99999)
	@Min(0)
	private int population;
	
	@Min(1000)
	@Max(9999)
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
