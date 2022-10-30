import React, { useState } from 'react';
import RegisterArtist from 'components/RegisterForm/RegisterArtist'
import RegisterBuyer from 'components/RegisterForm/RegisterBuyer'

export default function RegisterPage() {
    const [option, setOption] = useState(false);

    const register = option ?
        <RegisterBuyer />
        :
        <RegisterArtist />

    return (
        <>
            <h1>Formulario de registro</h1>
            <div>
                {/* This will be like a switch to change between registers */}
                <button onClick={() => setOption(false)}>Register as an Artist</button>
                <button onClick={() => setOption(true)}>Register as a Buyer</button>
            </div>
            {register}
        </>
    )
}