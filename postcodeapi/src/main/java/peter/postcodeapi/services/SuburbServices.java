package peter.postcodeapi.services;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import peter.postcodeapi.dtos.CreateSuburbDto;
import peter.postcodeapi.dtos.UpdateSuburbDto;
import peter.postcodeapi.models.Suburb;
import peter.postcodeapi.repositories.SuburbRepository;

@Service
@Transactional
public class SuburbServices {
	@Autowired
	private SuburbRepository suburbRepository;

	@Autowired
	private ModelMapper mapper;

	public Suburb createSuburbAndPostCode(CreateSuburbDto data) {
		Suburb newSuburb = mapper.map(data, Suburb.class);
		return this.suburbRepository.save(newSuburb);
	}
	
	public List<Suburb> findAllSuburbs() {
		return this.suburbRepository.findAll();
	}

	public List<Suburb> findAllSuburbsByPostcode(int postcode) {
		// Find suburb using custom method based on post code entity
		return this.suburbRepository.findByPostcode(postcode);
	}

	public Optional<Suburb> findSuburbById(Long id) {
		return this.suburbRepository.findById(id);
	}
	
	public Optional<Suburb> findSuburbByName(String name) {
		return this.suburbRepository.findByName(name);
	}

	public void deleteSuburb(Suburb suburb) {
		this.suburbRepository.delete(suburb);
	}

	public Suburb updateSuburb(Suburb suburb, UpdateSuburbDto data) {
		mapper.map(data, suburb);
		return this.suburbRepository.save(suburb);
	}
}