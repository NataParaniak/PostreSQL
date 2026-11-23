
import { pool } from '../database/db.js';

export async function getAllCustomers() {
  const result = await pool.query(
    'SELECT * FROM customers'
  );

  return result.rows;
}

export async function getCustomerByID(id:number) {
  const resultId = await pool.query(
  'SELECT * FROM customers WHERE id = $1',
  [id]
  );

  return resultId.rows[0];
}
export async function getAllTrips() {
  const result = await pool.query(
    'SELECT * FROM trips'
  );

  return result.rows;
}

export async function getTripsByDestination(destinationId: number) {
 const resultId = await pool.query(
  'SELECT * FROM trips WHERE destination_id = $1',
  [destinationId]
  );

  return resultId.rows;
}
export async function getBookingsByCustomer(customerId: number) {
const resultId = await pool.query(
  'SELECT * FROM bookings WHERE customer_id = $1',
  [customerId]
  );

  return resultId.rows;
}

export async function createBooking(
  customerId: number,
  tripId: number,
  bookingDate: string,
  numberOfPassengers: number,
  totalPrice: number,
  status: string
) {
  const result = await pool.query(
    `INSERT INTO bookings (
      customer_id,
      trip_id,
      booking_date,
      number_of_passengers,
      total_price,
      status
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [
      customerId,
      tripId,
      bookingDate,
      numberOfPassengers,
      totalPrice,
      status
    ]
  );

  return result.rows[0];
}

export async function updateBookingStatus(
  bookingId: number,
  status: string
) {
  const result = await pool.query(
    `UPDATE bookings
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [status, bookingId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}
export async function cancelBooking(bookingId: number) {
  const result = await pool.query(
    `UPDATE bookings
     SET status = 'cancelled'
     WHERE id = $1
     RETURNING *`,
    [bookingId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}