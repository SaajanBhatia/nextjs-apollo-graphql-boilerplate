"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "./CustomCalendarStyles.css";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { formatDistanceToNowStrict, add, format, isToday, isTomorrow, parseISO } from "date-fns";

interface User {
  firstName: string;
  lastName: string;
  role: string;
  luxID: string;
  id: string;
  email: string;
}

interface Booking {
  time: string; // Or 'Date' if you convert to Date objects
  duration: number;
  user: User;
}

interface Room {
  id: string;
  name: string;
  active: boolean;
  timeStart: number;
  timeEnd: number;
  bookings: Booking[];
}

export default function AdminBooking() {
  const [date, setDate] = useState(new Date());
  const today = new Date();

  // select date
  const onChange = (newDate: any) => {
    setDate(newDate);
  };

  //example data import
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch("./bookings.json")
      .then((response) => response.json())
      .then((data) => setBookings(data.data.getSingleRoom.bookings));
  }, []);

  const sortedBookings = bookings.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  const renderBookingDetails = (booking: Booking) => {
    const startTime = new Date(booking.time);
    const endTime = add(startTime, { minutes: booking.duration * 30 });
    const bookingDuration = `${booking.duration * 30} minutes`;
    // Format start and end time
    const formattedStartTime = format(startTime, "h:mm a");
    const formattedEndTime = format(endTime, "h:mm a");
    // Determine when the booking is relative to the current date
    let relativeDate;
    if (isToday(startTime)) {
      relativeDate = "Today";
    } else if (isTomorrow(startTime)) {
      relativeDate = "Tomorrow";
    } else {
      relativeDate = formatDistanceToNowStrict(startTime, { addSuffix: true });
    }
    return (
      <>
        <Flex justifyContent="space-between">
          <Text fontWeight="bold">
            {booking.user.firstName} {booking.user.lastName}
          </Text>
          <Text>{relativeDate}</Text>
        </Flex>
        <Text mt={2}>
          {formattedStartTime} - {formattedEndTime}
        </Text>
      </>
    );
  };

  /// DAY VIEW CALENDAR
  const generateTimeSlots = (startHour: any, endHour: any) => {
    const slots = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      slots.push({ time: `${hour.toString().padStart(2, "0")}:00`, isFullHour: true });
      if (hour < endHour) {
        slots.push({ time: `${hour.toString().padStart(2, "0")}:30`, isFullHour: false });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(6, 22); // From 6:00 to 22:00 (10 PM)
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update every minute for the live time indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  const calculateTimeLinePosition = (currentTime: any) => {
    const startHour = 6; // Day starts at 6 AM
    const endHour = 22; // Day ends at 10 PM (22 in 24-hour format)
    const hourHeight = 60; // Height of one hour in pixels, adjust based on layout
    const totalHeight = (endHour - startHour) * hourHeight; // Total height of the timeslot area

    let hoursFromStart = currentTime.getHours() + currentTime.getMinutes() / 60 - startHour;
    // If current time is before the startHour, round to the start/ top
    if (hoursFromStart < 0) {
      hoursFromStart = 0;
    }
    // If current time is after the endHour, round to the end/ bottom
    else if (hoursFromStart > endHour - startHour) {
      hoursFromStart = endHour - startHour;
    }
    return Math.min(hoursFromStart * hourHeight, totalHeight); // Ensure it doesn't go beyond the totalHeight
  };

  // Helper function to convert booking start time to a vertical position in the day view
  const getVerticalPosition = (bookingStartTime: any, startHour = 6, slotHeight = 40) => {
    const bookingStartHour = bookingStartTime.getHours();
    const bookingStartMinutes = bookingStartTime.getMinutes();
    const offsetFromStartHour = bookingStartHour + bookingStartMinutes / 60 - startHour;
    return offsetFromStartHour * slotHeight * 2; // *2 because each hour has 2 slots (half-hour each)
  };

  // Helper function to calculate booking height based on duration
  const getBookingHeight = (duration: any, slotHeight = 40) => {
    return duration * slotHeight; // Duration in half-hours, slotHeight for each half-hour
  };

  // Function to check if a booking is on the selected date
  const isBookingOnSelectedDate = (booking: any, selectedDate: any) => {
    const bookingDate = new Date(booking.time);
    return (
      bookingDate.getDate() === selectedDate.getDate() &&
      bookingDate.getMonth() === selectedDate.getMonth() &&
      bookingDate.getFullYear() === selectedDate.getFullYear()
    );
  };
  const bookingsForSelectedDate = bookings.filter((booking) => isBookingOnSelectedDate(booking, date));

  //  Time labels column rendering
  <Box w="10%" h="162%" borderRight="1px solid #e4eaf2" textAlign="center">
    {timeSlots.map((slot, index) => (
      <Box key={index} position="relative" h="40px" borderBottom={slot.isFullHour && index !== timeSlots.length - 1 ? "1px solid #e4eaf2" : "none"}>
        {slot.isFullHour ? <Text p={2}>{slot.time}</Text> : null}
      </Box>
    ))}
  </Box>;

  return (
    <Box bg="gray.100" padding={[]} w="100%" h="100vh" display="flex" flexDirection={{ base: "column", lg: "row" }} alignItems="center">
      <Flex
        display={{ base: "none", lg: "flex" }}
        direction="row"
        width={"65vw"}
        h="100%"
        overflowY="auto"
        p={0}
        bg="white"
        position="relative"
        borderLeftRadius="10px"
        border="1px solid #e4eaf2"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
      >
        {/* Time labels column */}
        <Box w="10%" h="162%" borderRight="1px solid #e4eaf2" textAlign="center">
          {timeSlots.map((slot, index) =>
            slot.isFullHour ? (
              <Text key={index} p={2}>
                {slot.time}
              </Text>
            ) : (
              <Box key={index} h="40px" />
            )
          )}
        </Box>
        {/* Bookings column DAY VIEW */}
        <Box w="90%" position="relative">
          {/* //  Time dividers column rendering */}
          <Box w="100%" h="162%" textAlign="center" position={"absolute"} zIndex={0}>
            {timeSlots.map((slot, index) => (
              <Box
                key={index}
                position="relative"
                h="40px"
                borderBottom={slot.isFullHour && index !== timeSlots.length - 1 ? "1px solid #e4eaf2" : "none"}
              ></Box>
            ))}
          </Box>
          {bookingsForSelectedDate.map((booking, index) => {
            const bookingStartTime = new Date(booking.time);
            const verticalPosition = getVerticalPosition(bookingStartTime);
            const bookingHeight = getBookingHeight(booking.duration);

            return (
              <Flex
                key={index}
                direction="column"
                justifyContent="start"
                bg="#dbfff0"
                opacity="1"
                position="absolute"
                left="0"
                width="95%"
                marginX={"2.5%"}
                top={`${verticalPosition}px`}
                height={`${bookingHeight}px`}
                p={4}
                borderRadius="10px"
                overflow={"hidden"}
              >
                <Text fontSize="md" color="black" fontWeight="bold" pb={2}>
                  {booking.user.firstName} {booking.user.lastName}
                </Text>
                <Text fontSize="sm" color="#68778e" fontWeight="medium" pt={2}>
                  {format(bookingStartTime, "p")} • {format(add(bookingStartTime, { minutes: booking.duration * 30 }), "p")}
                </Text>
              </Flex>
            );
          })}
          {isToday(date) && <Box position="absolute" left={0} right={0} top={`${calculateTimeLinePosition(currentTime)}px`} height="2px" bg="red.500" />}
        </Box>
      </Flex>
      {/* Right side: Calendar and upcoming events */}
      <Box
        bg="white"
        borderRightRadius="10px"
        border="1px solid #e4eaf2"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
        w={["100%", null, "35vw"]}
        h="100%"
        p={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Calendar onChange={onChange} value={date} minDate={today} prev2Label={null} next2Label={null} view="month" />
        {/* Display sorted bookings */}
        <Box bg="white" w="100%" h="100%" marginTop={6} display="flex" flexDirection="column" alignItems="start" overflowY="auto">
          <Heading as="h2" size="md" fontWeight="medium" paddingY={4}>
            Upcoming Events:
          </Heading>
          <ul style={{ width: "100%", listStyle: "none", padding: 0, margin: 0 }}>
            {sortedBookings.map((booking, index) => (
              <li key={index} style={{ width: "100%", marginBottom: "20px" }}>
                <Flex direction="column" bg="#f8fafc" width="100%" p={3} borderRadius="10px" border="1px solid #e4eaf2" justifyContent="space-between">
                  {renderBookingDetails(booking)}
                </Flex>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  );
}
