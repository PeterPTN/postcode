package peter.postcodeapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import peter.postcodeapi.dtos.CreateSuburbDto;
import peter.postcodeapi.dtos.UpdateSuburbDto;
import peter.postcodeapi.exceptions.NotFoundException;
import peter.postcodeapi.models.Postcode;
import peter.postcodeapi.models.Suburb;
import peter.postcodeapi.services.PostcodeServices;
import peter.postcodeapi.services.SuburbServices;
import peter.postcodeapi.utils.PostcodeUtils;

@RestController
@RequestMapping("/suburb")
public class SuburbController {
	@Autowired
	private SuburbServices suburbServices;
	@Autowired
	private PostcodeServices postcodeServices;
	@Autowired
	private PostcodeUtils postcodeUtils;

	@PostMapping
	// Will create both post code and suburb rows
	public ResponseEntity<Suburb> createSuburbAndPostCode(@Valid @RequestBody CreateSuburbDto data) {
		// If post code row doesn't exist, create one before creating suburb
		if (postcodeUtils.findOutDoesPostcodeExist(data.getPostcode()) == false) {
			this.postcodeServices.createPostcode(data.getPostcode());
		}
		Suburb newSuburb = this.suburbServices.createSuburbAndPostCode(data);
		return new ResponseEntity<Suburb>(newSuburb, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<Suburb>> findAllSuburbs() {
		List<Suburb> allSuburbs = this.suburbServices.findAllSuburbs();
		return new ResponseEntity<List<Suburb>>(allSuburbs, HttpStatus.OK);
	}

	@GetMapping("/find-suburb-by-{postcode}")
	public ResponseEntity<List<Suburb>> findSuburbByPostcode(@PathVariable int postcode) {
		Postcode foundPostcode = postcodeUtils.findPostCodeByPostCodeOrElseThrow(postcode);
		List<Suburb> suburb = this.suburbServices.findAllSuburbsByPostcode(foundPostcode.getPostcode());
		return new ResponseEntity<List<Suburb>>(suburb, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Suburb> findSuburbById(@PathVariable Long id) {
		return new ResponseEntity<Suburb>(findSuburbOrThrow(id), HttpStatus.OK);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Suburb> updateSuburbById(@PathVariable Long id, @Valid @RequestBody UpdateSuburbDto data) {
		if (postcodeUtils.findOutDoesPostcodeExist(data.getPostcode()) == false) {
			throw new NotFoundException(data.getPostcode() + ": is an invalid postcode");
		}
		Suburb suburb = findSuburbOrThrow(id);
		Suburb updatedSuburb = this.suburbServices.updateSuburb(suburb, data);
		return new ResponseEntity<Suburb>(updatedSuburb, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Suburb> deleteSuburb(@PathVariable Long id) {
		Suburb suburb = findSuburbOrThrow(id);
		this.suburbServices.deleteSuburb(suburb);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	// Private Service Functions
	
	public Suburb findSuburbOrThrow(Long id) {
		return this.suburbServices.findSuburbById(id).orElseThrow(() -> {
			throw new NotFoundException("Could not find suburb of ID: " + id);
		});
	}
}
