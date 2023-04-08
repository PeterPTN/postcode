package peter.postcodeapi.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import peter.postcodeapi.dtos.SignUpDto;
import peter.postcodeapi.dtos.UserDto;
import peter.postcodeapi.models.User;

// Mapstruct code in comments
// @Mapper(componentModel = "spring")
// Interface
@Component
public class UserMapper {
	/*
	 * UserDto toUserDto(User user);
	 * 
	 * @Mapping(target = "password", ignore = true) User signUpToUser(SignUpDto
	 * userDto);
	 */

	@Autowired
	private final ModelMapper modelMapper;

	public UserMapper(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
	}

	public UserDto toUserDto(User user) {
		return modelMapper.map(user, UserDto.class);
	}

	public User signUpToUser(SignUpDto signUpDto) {
		User user = modelMapper.map(signUpDto, User.class);
		user.setPassword(null);
		return user;
	}
}
