package peter.postcodeapi.services;

import java.nio.CharBuffer;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import peter.postcodeapi.dtos.CredentialsDto;
import peter.postcodeapi.dtos.SignUpDto;
import peter.postcodeapi.dtos.UserDto;
import peter.postcodeapi.exceptions.AppException;
import peter.postcodeapi.mappers.UserMapper;
import peter.postcodeapi.models.User;
import peter.postcodeapi.repositories.UserRepository;

@RequiredArgsConstructor
@Service
public class UserService {
	private final UserRepository userRepository;
	private final UserMapper userMapper;
	private final PasswordEncoder passwordEncoder;

	public UserDto findByLogin(String login) {
		User user = userRepository.findByLogin(login)
				.orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
		
		// Use model mapper here
		return userMapper.toUserDto(user); 
	}

	public UserDto login(CredentialsDto credentialsDto) {
		User user = userRepository.findByLogin(credentialsDto.getLogin()).orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
		
		// Hashes password as unreadable
		if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
			return userMapper.toUserDto(user);
		}
		
		throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
	}
	
	public UserDto register(SignUpDto userDto) {
		Optional<User> optionalUser = userRepository.findByLogin(userDto.getLogin());
		
		if (optionalUser.isPresent()) {
			throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
		}
		
		// Use model mapper here
		User user = userMapper.signUpToUser(userDto);
		
		// Hash passwords before storing them
		user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
		User savedUser = userRepository.save(user);
		return userMapper.toUserDto(user);
	}
}
