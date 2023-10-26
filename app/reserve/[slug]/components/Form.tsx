"use client";

import React, { useEffect, useState } from 'react'

export default function Form() {

    const [inputs, setInputs] = useState(
        {
            bookerFirstName: "",
            bookerLastName: "",
            bookerPhone: "",
            bookerEmail: "",
            bookerOcassion: "",
            bookerRequest: ""
        }
    );

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (inputs.bookerFirstName && inputs.bookerLastName && inputs.bookerEmail && inputs.bookerPhone) {
            return setDisabled(false);
        };
        return setDisabled(true);
    }, [inputs]);

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="mt-10 flex flex-wrap justify-between w-[660px]">
            <input
                type="text"
                className="border rounded p-3 w-80 mb-4 bg-white"
                placeholder="First name"
                value={inputs.bookerFirstName}
                name="bookerFirstName"
                onChange={handleChangeInput}
            />
            <input
                type="text"
                className="border rounded p-3 w-80 mb-4 bg-white"
                placeholder="Last name"
                value={inputs.bookerLastName}
                name="bookerLastName"
                onChange={handleChangeInput}
                />
            <input
                type="text"
                className="border rounded p-3 w-80 mb-4 bg-white"
                placeholder="Phone number"
                value={inputs.bookerPhone}
                name="bookerPhone"
                onChange={handleChangeInput}
                />
            <input
                type="text"
                className="border rounded p-3 w-80 mb-4 bg-white"
                placeholder="Email"
                value={inputs.bookerEmail}
                name="bookerEmail"
                onChange={handleChangeInput}
                />
            <input
                type="text"
                className="border rounded p-3 w-80 mb-4 bg-white"
                placeholder="Occasion (optional)"
                value={inputs.bookerOcassion}
                name="bookerOcassion"
                onChange={handleChangeInput}
                />
            <input
                type="text"
                className="border rounded p-3 w-80 mb-4 bg-white"
                placeholder="Requests (optional)"
                value={inputs.bookerRequest}
                name="bookerRequest"
                onChange={handleChangeInput}
            />
            <button
                className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
                disabled={disabled}
            >
                Complete reservation
            </button>
            <p className="mt-4 text-sm">
                By clicking “Complete reservation” you agree to the OpenTable Terms
                of Use and Privacy Policy. Standard text message rates may apply.
                You may opt out of receiving text messages at any time.
            </p>
        </div>
    )
}
