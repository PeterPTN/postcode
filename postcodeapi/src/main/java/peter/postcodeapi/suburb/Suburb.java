package peter.postcodeapi.suburb;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity()
public class Suburb {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotBlank
	@Column(name = "name")
	private String name;
	
	@Size(min = 6)
	@Column(name = "population")
	private int population;
	
	@Size(min = 4)
	@Column(name = "postcode")
	private int postcode;
	
	public Suburb(int id, String name, int population, int postcode) {
		super();
		this.id = id;
		this.name = name;
		this.population = population;
		this.postcode = postcode;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
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
