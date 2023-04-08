package peter.postcodeapi.config;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
	private final UserAuthenticationProvider userAuthenticationProvider;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		if (header != null) {
			String[] elements = header.split(" ");
			
			// Confirm header value is formatted like Bearer token
			if (elements.length == 2 && "Bearer".equals(elements[0])) {
				try {
					// Add authorization bin in security context 
					SecurityContextHolder.getContext().setAuthentication(
							userAuthenticationProvider.validateToken(elements[1])
							);
				} catch (RuntimeException e) {
					// Else clear it
					SecurityContextHolder.clearContext();
					throw e;
				}
			}
		}
		// This filter will pass authenticated user object to controllers through @AuthenticationPrincipal
		filterChain.doFilter(request, response);
	}
}
