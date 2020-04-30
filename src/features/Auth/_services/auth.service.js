export function setFormControl(id, name, elementType, configType, placeholder, value, validation, valid, touched) {
    const control = {
        id: id,
        name: name,
        elementType: elementType,
        elementConfig: {
            type: configType,
            placeholder: placeholder
        },
        value: value,
        validation: {
            ...validation
        },
        valid: valid,
        touched: touched
    }
    return control;
}
