package peter.postcodeapi.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import peter.postcodeapi.dtos.SignUpDto;
import peter.postcodeapi.dtos.UserDto;
import peter.postcodeapi.models.User;

@Component
@RequiredArgsConstructor
public class UserMapper {
	@Autowired
	private final ModelMapper modelMapper;

	public UserDto toUserDto(User user) {
		return modelMapper.map(user, UserDto.class);
	}

	public User signUpToUser(SignUpDto signUpDto) {
		User user = modelMapper.map(signUpDto, User.class);
		user.setPassword(null);
		return user;
	}
}
