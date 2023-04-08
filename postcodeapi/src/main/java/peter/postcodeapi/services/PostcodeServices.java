package peter.postcodeapi.services;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import peter.postcodeapi.dtos.CreatePostcodeDto;
import peter.postcodeapi.dtos.UpdatePostcodeDto;
import peter.postcodeapi.models.Postcode;
import peter.postcodeapi.repositories.PostcodeRepository;

@Service
@Transactional
public class PostcodeServices {
	@Autowired
	PostcodeRepository postcodeRepository;
	
	@Autowired
	private ModelMapper mapper;
	
	public Postcode createPostcode(CreatePostcodeDto data) {
		Postcode newPostcode = new Postcode();
		newPostcode.setPostcode(data.getPostcode());
		return this.postcodeRepository.save(newPostcode);
	}
	
	// An overload to accept post code integer
	public Postcode createPostcode(int postcodeNumber) {
	    Postcode newPostCode = new Postcode();
	    newPostCode.setPostcode(postcodeNumber);
	    return this.postcodeRepository.save(newPostCode);
	}
	
	public List<Postcode> findAllPostcodes() {
		return this.postcodeRepository.findAll();
	}
	
	public Optional<Postcode> findPostcodeById(Long id) {
		return this.postcodeRepository.findById(id);
	}
	
	public Optional<Postcode> findPostcodeByPostcodeNumber(int postcode) {
		return this.postcodeRepository.findByPostcode(postcode);
	}
	
	public Postcode updatePostcode(Postcode postcode, UpdatePostcodeDto data) {
		mapper.map(data, postcode);
		return this.postcodeRepository.save(postcode);
	}
	
	// Omit delete due to post code table coupled with suburb table as foreign key
}
