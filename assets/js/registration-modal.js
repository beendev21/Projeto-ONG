const registrationDialog = document.querySelector('#registration-dialog');
const registrationOpenButton = document.querySelector('#open-registration');
const registrationCloseButton = registrationDialog?.querySelector('.dialog-close');
const registrationForm = registrationDialog?.querySelector('#registration-form');
const registrationStatus = registrationDialog?.querySelector('#registration-status');

if (registrationDialog && registrationOpenButton && registrationCloseButton && registrationForm) {
    let submissionAttempted = false;
    const formFields = [...registrationForm.querySelectorAll('.form-control')];

    const updateFieldError = (field) => {
        const errorMessage = document.querySelector(`#${field.id}-error`);

        if (!errorMessage || !submissionAttempted) {
            return;
        }

        const { validity } = field;
        let message = '';

        if (validity.valueMissing) {
            message = 'Este campo é obrigatório.';
        } else if (validity.typeMismatch) {
            message = 'Introduza um endereço de e-mail válido.';
        } else if (validity.tooShort) {
            message = `Preencha pelo menos ${field.minLength} caracteres.`;
        } else if (validity.patternMismatch) {
            message = field.id === 'cpf'
                ? 'Informe o CPF no formato 000.000.000-00.'
                : field.id === 'telefone'
                    ? 'Informe o telefone no formato (11) 99999-9999.'
                    : 'Informe o CEP no formato 00000-000.';
        }

        errorMessage.textContent = message;
        errorMessage.hidden = validity.valid;
        field.classList.toggle('is-invalid', !validity.valid);

        if (validity.valid) {
            field.removeAttribute('aria-invalid');
        } else {
            field.setAttribute('aria-invalid', 'true');
        }
    };

    registrationOpenButton.addEventListener('click', () => {
        registrationDialog.showModal();
    });

    registrationCloseButton.addEventListener('click', () => {
        registrationDialog.close();
    });

    registrationDialog.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            registrationDialog.close();
        }
    });

    registrationDialog.addEventListener('click', (event) => {
        if (event.target === registrationDialog) {
            registrationDialog.close();
        }
    });

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        registrationStatus.hidden = false;
        registrationStatus.focus();
    });

    registrationForm.addEventListener('invalid', (event) => {
        event.preventDefault();
        updateFieldError(event.target);
    }, true);

    registrationForm.addEventListener('click', (event) => {
        if (!event.target.closest('button[type="submit"]')) {
            return;
        }

        submissionAttempted = true;
        const isValid = registrationForm.checkValidity();
        formFields.forEach(updateFieldError);

        if (!isValid) {
            event.preventDefault();
            registrationForm.querySelector(':invalid')?.focus();
        }
    });

    registrationForm.addEventListener('input', (event) => {
        if (formFields.includes(event.target)) {
            updateFieldError(event.target);
        }
    });
}