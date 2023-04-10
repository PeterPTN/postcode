# Postcode API

## Requirements / Purpose
The backbone of this project are the REST APIs made with SpringBoot. This project specifically builds upon a simple CRUD REST API due to the database schema constraints. This is because the suburb table relies on a foreign key from the postcode table, therefore a lot more thought and attention has been placed to keep this project DRY and loosely coupled. It also includes security practices such as authorization and authentication.
- Allows users to:
  - Create suburb and postcode in a single request
  - Create postcode separately
  - Read suburb or postcode information
  - Read suburb information from postcode
  - Read postcode from given suburb
  - Update suburb or postcode
  - Delete suburb
  - Login
  - Register

This was originally a backend project but I've decided to include a frontend because I wanted to see how all its features functioned end-to-end.

## Approach / Justifications
- The suburb table has a foreign key of postcode, this allows for better separation of concerns and encapsulation as many suburbs can have the same postcode
- I decided to omit a delete endpoint for postcode simply because it acts as a foreign key for suburb
- The project uses JWT for authorization and a login-password combination for authentication 
- Passwords are salted and hashed using Bcrypt before saving to the database as per best practices (https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html)

## Future Goals
- Testing suites for both frontend and backend
- Complete remaining logic and componentry for the frontend
- Play around with additional dependencies on the frontend (React-Motion & MockServiceWorker)
- CSRF implementation(?)
