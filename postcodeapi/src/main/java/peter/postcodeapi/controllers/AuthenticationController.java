package peter.postcodeapi.controllers;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import peter.postcodeapi.config.UserAuthenticationProvider;
import peter.postcodeapi.dtos.CredentialsDto;
import peter.postcodeapi.dtos.SignUpDto;
import peter.postcodeapi.dtos.UserDto;
import peter.postcodeapi.services.UserService;

@RequiredArgsConstructor
@RestController
public class AuthenticationController {
	private final UserService userService;
	private final UserAuthenticationProvider userAuthenticationProvider;

	@PostMapping("/login")
	public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentialsDto) {
		UserDto user = userService.login(credentialsDto);
		user.setToken(userAuthenticationProvider.createToken(user.getLogin()));
		// Same as new ResponseEntity<>(user, HttpStatus.OK)
		// Factory method
		return ResponseEntity.ok(user);
	}

	@PostMapping("/register")
	public ResponseEntity<UserDto> register(@RequestBody SignUpDto signUpDto) {
		UserDto user = userService.register(signUpDto);
		user.setToken(userAuthenticationProvider.createToken(user.getLogin()));
		return ResponseEntity.created(URI.create("/users" + user.getId())).body(user);
	}
}
