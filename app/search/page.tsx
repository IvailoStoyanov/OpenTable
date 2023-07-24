import Header from "./components/Header";
import SearchSidebar from "./components/SearchSidebar";
import SearchCard from "./components/SearchCard";
import { Cuisine, PRICE, Location, PrismaClient, Review } from "@prisma/client";

//I would move this to interfaces folder
export interface RestaurantCardType {
    id: number;
    name: string;
    main_image: string;
    cuisine: Cuisine;
    location: Location;
    price: PRICE;
    reviews: Review[];
    slug: string;
}

const prisma = new PrismaClient();

interface SearchParams {
    city?: string | undefined,
    cuisine?: string,
    price?: PRICE
}

const fetchRestaurantsByCity = (searchParams: SearchParams) => {
    const where: any = {}

    if (searchParams.city) {
        const location = {
            name: {
                equals: searchParams.city.toLowerCase()
            }
        }
        where.location = location;
    }
    if (searchParams.cuisine) {
        const cuisine = {
            name: {
                equals: searchParams.cuisine.toLowerCase()
            }
        }
        where.cuisine = cuisine;
    }
    if (searchParams.price) {
        const price = {
            equals: searchParams.price
        }
        where.price = price;
    }


    // selectively pick the data you want. Dont get all the restaurant information
    const select = {
        id: true,
        name: true,
        main_image: true,
        cuisine: true,
        location: true,
        price: true,
        reviews: true,
        slug: true,
    }

    return prisma.restaurant.findMany({
        where,
        select
    });
}

const fetchLocations = () => {
    return prisma.location.findMany();
}

const fetchCuisines = () => {
    return prisma.cuisine.findMany();
}

export default async function Search({ searchParams }: {
    searchParams: SearchParams
}) {
    const restaurants = await fetchRestaurantsByCity(searchParams);
    const location = await fetchLocations();
    const cuisine = await fetchCuisines();

    return (
        <>
            <Header />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSidebar
                    locations={location}
                    cuisines={cuisine}
                    searchParams={searchParams}
                />
                <div className="w-5/6">
                    {
                        restaurants.length ?
                            <>
                                {restaurants.map(restaurant =>
                                    <SearchCard restaurant={restaurant} key={restaurant.id}/>
                                )}
                            </> :
                            <p>Sorry we found no restaurants in the given area!</p>
                    }
                </div>
            </div>
        </>
    )
}