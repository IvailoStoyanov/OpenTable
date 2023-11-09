import { Review } from "@prisma/client";

export const calculateReviewRatingAverage = (reviews: Review[]) => {
    const ratingsArray = reviews.map(review => review.rating)
    const average = ratingsArray.reduce((sum, reviewNum) => sum + reviewNum, 0) / ratingsArray.length;
    return parseInt(average.toFixed(1));
}