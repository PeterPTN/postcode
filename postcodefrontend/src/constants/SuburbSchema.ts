import { number, object, string } from "yup"

const SUBURB_SCHEMA = object({
    name: string().required("Suburb name is required"),
    postcode: number().required("Postcode is required").min(0).max(9999).typeError("Please include a postcode (1000-9999)"),
    population: number().required("Population is required").min(1000).max(99999).typeError("Please include a population number (0-99999)")
});

export default SUBURB_SCHEMA;