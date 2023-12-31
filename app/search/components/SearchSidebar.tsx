import { Cuisine, PRICE } from "@prisma/client";
import { Location } from "@prisma/client";
import React from "react";
import Link from "next/link";

export default function SearchSidebar({
    locations,
    cuisines,
    searchParams
}: {
    locations: Location[], cuisines: Cuisine[],
    searchParams: {
        city?: string | undefined,
        cuisine?: string,
        price?: PRICE
    }
}) {
    const price = [
        { price: PRICE.CHEAP, label: '$', className: 'border w-full text-reg font-light rounded-l p-2 text-center' },
        { price: PRICE.REGULAR, label: '$$', className: 'border-r border-t border-b w-full text-reg font-light p-2 text-center' },
        { price: PRICE.EXPENSIVE, label: '$$$', className: 'border-r border-t border-b w-full text-reg font-light p-2 rounded-r text-center' },
    ]

    return (
        <div className="w-1/5 pr-5">
            <div className="border-b pb-4">
                <h1 className="mb-2">Region</h1>
                {
                    locations.map(location =>
                        <Link
                            href={{
                                pathname: '/search',
                                query: {
                                    ...searchParams,
                                    city: location.name
                                }
                            }}
                            className="font-light text-reg block capitalize"
                            key={location.id}>
                            {location.name}
                        </Link>
                    )
                }
            </div>
            <div className="border-b pb-4 mt-3">
                <h1 className="mb-2">Cuisine</h1>
                {
                    cuisines.map(cuisine =>
                        <Link
                            href={{
                                pathname: '/search',
                                query: {
                                    ...searchParams,
                                    cuisine: cuisine.name
                                }
                            }}
                            className="font-light text-reg block capitalize"
                            key={cuisine.id}
                        >
                            {cuisine.name}
                        </Link>
                    )
                }
            </div>
            <div className="mt-3 pb-4">
                <h1 className="mb-2">Price</h1>
                <div className="flex">
                    {price.map(({ price, label, className }) => <Link
                        href={{
                            pathname: '/search',
                            query: {
                                ...searchParams,
                                price: price
                            }
                        }}
                        className={className}
                    >
                        {label}
                    </Link>)}
                </div>
            </div>
        </div>
    )
}