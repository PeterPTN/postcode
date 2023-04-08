# Postcode API

## Requirements / Purpose
The backbone of this project are the REST APIs made with SpringBoot. This project specifically builds upon a simple CRUD REST API due to the database schema constraints. This is because the suburb table relies on a foreign key from the postcode table, therefore a lot more thought and attention has been placed to keep this project DRY and loosely coupled.
- Allows users to:
  - Create suburb and postcode in a single request
  - Create postcode separately
  - Read suburb or postcode information
  - Read suburb information from postcode
  - Read postcode from given suburb
  - Update suburb or postcode
  - Delete suburb

## Approach / Justifications
- The suburb table has a foreign key of postcode, allows me to adhere to separation of concerns and encapsulation as many suburbs can have the same postcode
- I decided to omit a delete endpoint for postcode simply because it acts as a foreign key for suburb

## Future Goals
- A frontend with React/TS
- Secure create endpoints with some type of auth (still figuring out best solution)
