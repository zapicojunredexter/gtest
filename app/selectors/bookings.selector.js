import { createSelector } from 'reselect';

const bookingsList = store => store.bookings.userBookings;

export const getTravellingBooking = createSelector(
    [bookingsList],
    bookings =>
        bookings.find(booking => booking.Status === 'Travelling'),
);