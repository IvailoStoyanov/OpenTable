import Link from "next/link";
import { RestaurantCardType } from "../page";
import Price from "../../components/Price";
import {calculateReviewRatingAverage} from "../../../utils/calculateReviewRatingAverage";
import Stars from "../../components/Stars";

interface Props {
    restaurant: RestaurantCardType;
}

export default function SearchCard({ restaurant }: Props) {
    const calculateReview = () => {
        const average = calculateReviewRatingAverage(restaurant.reviews);

        if (average <= 2) {
            return 'Bad'
        }
        if (average <= 3) {
            return 'Not Bad'
        }
        if (average <= 4) {
            return 'Good'
        }
        if (average <= 5) {
            return 'Amazing'
        }

        return "Not Rated"
    }

    return (
        <div className="border-b flex pb-5">
            <img
                src={restaurant.main_image}
                alt=""
                className="w-44 rounded"
            />
            <div className="pl-5">
                <h2 className="text-3xl">{restaurant.name}</h2>
                <div className="flex items-start">
                    <Stars reviews={restaurant.reviews}/>
                    <p className="ml-2 text-sm">{calculateReview()}</p>
                </div>
                <div className="mb-9">
                    <div className="font-light flex text-reg">
                        <Price price={restaurant.price} />
                        <p className="mr-4">{restaurant.cuisine.name}</p>
                        <p className="mr-4">{restaurant.location.name}</p>
                    </div>
                </div>
                <div className="text-red-600">
                    <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
                </div>
            </div>
        </div>
    )
}