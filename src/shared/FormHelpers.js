export function setFormControl(id, name, label, elementType, configType, placeholder, value, validation, valid, touched) {
    const control = {
        id: id,
        name: name,
        label: label,
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

export function checkFormControlValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

export function formControlChangeHandler(newValue, controlId, stateForm) {
    const updatedForm = {
        ...stateForm
    };

    const controlIndex = updatedForm.controls.findIndex((control) => control.id === controlId);
    const updatedFormControl = {
        ...updatedForm.controls[controlIndex]
    };

    updatedFormControl.value = newValue;
    updatedFormControl.valid = checkFormControlValidity(updatedFormControl.value, updatedFormControl.validation);
    updatedFormControl.touched = true;
    updatedForm.controls[controlIndex] = updatedFormControl;

    let isFormValid = true;
    for (let inputIdentifier in updatedForm) {
        isFormValid = updatedForm.controls[controlIndex].valid && isFormValid;
    }
    updatedForm.valid = isFormValid;
    return updatedForm;
}

export function getFormControlValueById(form, controlId) {
    const controlIndex = form.controls.findIndex((control) => control.id === controlId);
    return controlIndex > -1 ? form.controls[controlIndex].value : null;
}
