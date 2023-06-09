package peter.postcodeapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import peter.postcodeapi.dtos.CreatePostcodeDto;
import peter.postcodeapi.dtos.UpdatePostcodeDto;
import peter.postcodeapi.exceptions.NotFoundException;
import peter.postcodeapi.models.Postcode;
import peter.postcodeapi.models.Suburb;
import peter.postcodeapi.services.PostcodeServices;
import peter.postcodeapi.services.SuburbServices;
import peter.postcodeapi.utils.PostcodeUtils;

@RestController
@RequestMapping("/postcode")
public class PostcodeController {
	@Autowired
	SuburbServices suburbServices;

	@Autowired
	PostcodeServices postcodeServices;

	@Autowired
	PostcodeUtils postcodeUtils;

	@PostMapping
	public ResponseEntity<Postcode> createPostcode(@Valid @RequestBody CreatePostcodeDto data) {
		Postcode postcode = this.postcodeServices.createPostcode(data);
		return new ResponseEntity<Postcode>(postcode, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<Postcode>> findAllPostcodes() {
		List<Postcode> allPostcodes = this.postcodeServices.findAllPostcodes();
		return new ResponseEntity<List<Postcode>>(allPostcodes, HttpStatus.OK);
	}

	@GetMapping("/find-postcode-by-{suburb}")
	public ResponseEntity<Integer> findPostcodeBySuburbName(@PathVariable String suburb) {
		Suburb foundSuburb = suburbServices.findSuburbByName(suburb).orElseThrow(() -> {
			throw new NotFoundException("Could not find a suburb of name: " + suburb);
		});
		return new ResponseEntity<Integer>(foundSuburb.getPostcode(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Postcode> findPostcodeById(@PathVariable Long id) {
		return new ResponseEntity<Postcode>(postcodeUtils.findPostCodeByIdOrElseThrow(id), HttpStatus.OK);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Postcode> updatePostcodeById(@PathVariable Long id, @Valid @RequestBody UpdatePostcodeDto data) {
		Postcode postcode = postcodeUtils.findPostCodeByIdOrElseThrow(id);
		Postcode updatedPostcode = this.postcodeServices.updatePostcode(postcode, data);
		return new ResponseEntity<Postcode>(updatedPostcode, HttpStatus.OK);
	}
	
	@PatchMapping("/current-code-{currentPostcode}")
	public ResponseEntity<Postcode> updatePostcodeByPostcode(@PathVariable int currentPostcode, @Valid @RequestBody UpdatePostcodeDto data) {
		Postcode postcode = this.postcodeServices.findPostcodeByPostcodeNumber(currentPostcode).orElseThrow(() -> {
			throw new NotFoundException("Could not find a postcode of code: " + currentPostcode);
		});
		Postcode updatedPostcode = this.postcodeServices.updatePostcode(postcode, data);
		return new ResponseEntity<Postcode>(updatedPostcode, HttpStatus.OK);
	}
}
