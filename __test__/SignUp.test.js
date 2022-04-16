import React from 'react';
import SignUp from '../src/components/pages/SignUp';
import {render, fireEvent, cleanup, within} from '@testing-library/react';
import user from '@testing-library/user-event';

describe('Sign Up', () => {
    const onSubmit = jest.fn();

    beforeEach(() => {
        onSubmit.mockClear();
        render(<SignUp onSubmit={onSubmit}/>)
    });

    it('onSubmit is called when all fields pass validation', () => {
        user.type(getNombre(), 'Testing');

        const apellido = screen.getByPlaceholderText(/apellido/i);
        user.type(apellido, 'Probando');

        const email = screen.getByPlaceholderText(/email/i);
        user.type(email, 'testing@hotmail.com');

        const contraseña = screen.getByPlaceholderText(/contraseña/i);
        user.type(contraseña, 'testeando');

        const genero = screen.getByRole('combobox', {name:/Genero/i});
        user.selectOptions(genero, within(genero).getByRole('option', {name: 'Hombre'}));

        const edad = screen.getByPlaceholderText(/edad/i);
        user.type(edad, '23');

        const direccion_residencia = screen.getByPlaceholderText(/direccion residencia/i);
        user.type(direccion_residencia, 'casa testing');
    })
})

function getNombre() {
    return screen.getByPlaceholderText(/nombre/i)
}