package peter.postcodeapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
	private final UserAuthenticationProvider userAuthenticationProvider;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// Run filters - Validates JWT else Login/Register validation
		// Else throw authenticationEntryPoint (entry point for authentication errors)
		// State-less sessions, client provides JWT to maintain session
		// login, register end-points are permitted without authentication, the rest needs authentication
		// Disable CSRF complexity 
		
		http.exceptionHandling().authenticationEntryPoint(userAuthenticationEntryPoint).and()
				.addFilterBefore(new JwtAuthFilter(userAuthenticationProvider), BasicAuthenticationFilter.class).csrf().disable()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authorizeHttpRequests((requests) -> requests.requestMatchers(HttpMethod.POST, "/login", "/register")
						.permitAll().anyRequest().authenticated());
		return http.build();

	}
}

