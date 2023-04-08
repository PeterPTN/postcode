package peter.postcodeapi.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "app_user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "first_name", nullable = false)
	@Size(max = 100)
	private String firstName;
	
	@Column(name = "last_name", nullable = false)
	@Size(max =100)
	private String lastName;
	
	@Column(name = "login", nullable = false)
	@Size(max = 100)
	private String login;
	
	@Column(nullable = false)
	@Size(max = 100)
	private String password;
}
