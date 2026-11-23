import {getAllCustomers, getCustomerByID, getAllTrips,getTripsByDestination,getBookingsByCustomer, createBooking,updateBookingStatus,cancelBooking} from '../operations/customers.js'

console.log(await getAllCustomers())
console.log(await getCustomerByID(2))
console.log(await getAllTrips())
console.log(await getTripsByDestination(4))
console.log(await getBookingsByCustomer(2))
console.log(await createBooking(  1, 3,'2026-11-23',2,500,'confirmed'))
console.log(await updateBookingStatus(15, 'confirmed'))
console.log(await cancelBooking(15))