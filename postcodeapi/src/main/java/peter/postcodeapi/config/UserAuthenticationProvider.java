package peter.postcodeapi.config;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import peter.postcodeapi.dtos.UserDto;
import peter.postcodeapi.services.UserService;

// Document this code

@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {
	@Value("${security.jwt.token.secret-key:secret-value}")
	private String secretKey;

	private UserService userService;

	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	public String createToken(String login) {
		Date now = new Date();
		Date validity = new Date(now.getTime() + 3_600_000);

		return JWT.create().withIssuer(login).withIssuedAt(now).withExpiresAt(validity)
				.sign(Algorithm.HMAC256(secretKey));
	}

	public Authentication validateToken(String token) {
		JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();

		DecodedJWT decoded = verifier.verify(token);

		UserDto user = userService.findByLogin(decoded.getIssuer());

		return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
	}
}
