// Use .inner to reveal aggregate errors if validate(abortEarly: false) in yup object
// See Form pages for example
export function getErrorMessages(errorObject: any) {
    return errorObject.inner.reduce((array: string[], validationObject: any) => {
        array.push(validationObject.message)
        return array;
    }, []);
}