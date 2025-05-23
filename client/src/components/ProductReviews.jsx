import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Star } from 'lucide-react';

const ProductReviews = ({ product, isAuthenticated }) => {
  const [reviewInput, setReviewInput] = useState('');
  const [ratingInput, setRatingInput] = useState(5);
  const [reviews, setReviews] = useState(product.reviews || []);
  const [averageRating, setAverageRating] = useState(product.rating || 0);
  const [submitting, setSubmitting] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
    ));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to post a review',
        variant: 'destructive',
      });
      return;
    }

    if (reviewInput.trim() === '') {
      toast({
        title: 'Review Required',
        description: 'Please enter your review',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products/${product.id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // If you use JWT or cookies for auth, add them here
        },
        body: JSON.stringify({
          rating: ratingInput,
          comment: reviewInput,
        }),
        credentials: 'include', // if your backend uses cookies/session
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit review');
      }

      toast({
        title: 'Review Submitted',
        description: 'Thank you for your feedback!',
      });

      setReviews(data.reviews);
      setAverageRating(data.rating);
      setReviewInput('');
      setRatingInput(5);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit review',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-800">Customer Reviews</h3>
        <div className="flex items-center">
          <div className="flex mr-2">
            {renderStars(averageRating)}
          </div>
          <span className="text-sm text-gray-600">
            {averageRating?.toFixed(1)} out of 5 ({reviews?.length || 0} reviews)
          </span>
        </div>
      </div>
      
      {/* Review List */}
      <div className="space-y-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">{review.username}</div>
                  <div className="text-gray-500 text-sm">
                    {review.date ? new Date(review.date).toLocaleDateString() : ''}
                  </div>
                </div>
                <div className="flex mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center p-4 bg-gray-50 rounded-md">
            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>
      
      {/* Write a Review */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Write a Review</h3>
        
        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= ratingInput ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => setRatingInput(star)}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <Textarea
              id="review"
              value={reviewInput}
              onChange={(e) => setReviewInput(e.target.value)}
              placeholder="Share your experience with this product..."
              className="min-h-[100px]"
            />
          </div>
          
          <Button type="submit" className="bg-vtc-red hover:bg-vtc-brown" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProductReviews;
