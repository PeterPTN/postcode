package peter.postcodeapi.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import peter.postcodeapi.dtos.ErrorDto;
import peter.postcodeapi.exceptions.AppException;

@ControllerAdvice
public class RestExceptionHandler {
	
	// Wraps all controllers but will only run if AppException is thrown
	@ExceptionHandler(value = { AppException.class })
	@ResponseBody
	public ResponseEntity<ErrorDto> handleException(AppException ex) {
		return ResponseEntity.status(ex.getCode()).body(ErrorDto.builder().message(ex.getMessage()).build());
	}
}
