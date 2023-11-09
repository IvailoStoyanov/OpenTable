"use client";

import React, { useEffect, useState } from 'react'
import useReservation from '../../../../hooks/useReservation';
import { CircularProgress } from '@mui/material';

export default function Form({
    slug,
    date,
    partySize
}: {
    slug: string,
    date: string,
    partySize: string,
}) {
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

    const [day, time] = date.split("T");
    const [disabled, setDisabled] = useState(true);
    const { error, loading, createReservation } = useReservation();
    const [didBook, setDidBook] = useState(false);

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

    const handleClick = async () => {
        const booking = await createReservation({
            slug,
            partySize,
            time,
            day,
            bookerFirstName: inputs.bookerFirstName,
            bookerLastName: inputs.bookerLastName,
            bookerEmail: inputs.bookerEmail,
            bookerPhone: inputs.bookerPhone,
            bookerOcassion: inputs.bookerOcassion,
            bookerRequest: inputs.bookerRequest,
            setDidBook
        });
    }

    return (
        <div className="mt-10 flex flex-wrap justify-between md:w-[660px]">
            {didBook ? <div>
                <h1>You are all booked up</h1>
                <p>Enjoy your reservation!</p>
            </div> : <>
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

                {loading ? <CircularProgress color="inherit" /> : <button
                    className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
                    disabled={disabled || loading}
                    onClick={handleClick}
                >
                    Complete reservation
                </button>}
                <p className="mt-4 text-sm">
                    By clicking “Complete reservation” you agree to the OpenTable Terms
                    of Use and Privacy Policy. Standard text message rates may apply.
                    You may opt out of receiving text messages at any time.
                </p>
            </>}
        </div>
    )
}
