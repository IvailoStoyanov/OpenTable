import { PrismaClient } from "@prisma/client";
import Form from "./components/Form";
import Header from "./components/Header";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        }
    });

    if (!restaurant) {
        notFound()
    };

    return restaurant;
}

export default async function Reserve({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams: { date: string, partySize: string }
}) {
    const restaurant = await fetchRestaurantBySlug(params.slug);

    return (
        <div className="border-t md:h-screen py-65">
            <div className="py-9 w-3/5 m-auto">
                <Header image={restaurant.main_image} name={restaurant.name} date={searchParams.date} partySize={searchParams.partySize} />
                <Form
                    partySize={searchParams.partySize}
                    slug={params.slug}
                    date={searchParams.date}
                />
            </div>
        </div>
    )
}