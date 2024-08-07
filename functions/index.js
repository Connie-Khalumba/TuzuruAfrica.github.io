const functions = require("firebase-fuunctions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
require("dotenv").config();

admin.initializeApp();
const db = admin.firestore();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
})


// FUCTION TO SEND EMAIL TO USERS AFTER BOOKING FOR A LOCATION STAY

exports.sendEmailToUsers = functions.firestore.document("usersBookings/{docId}").onCreate(async (snapshot) => {
    const tourData = snapshot.data();
    const userEmail = tourData.email;
    const userFirstName = tourData.user.firstName;
    const location = tourData.location;
    const checkInDate = tourData.checkInDate;
    const checkOutDate = tourData.checkOutDate;
    const numGuests = tourData.numGuests;


    const mailoptions = {
        from: process.env.USER_EMAIL,
        to: userEmail,
        subject: "Your TuzuruAfrica Booking Confirmation",
        html: `
            <h1>Hello, ${tourData.user.firstName}!</h1>
            <p>Thank you for booking a TuzuruAfrica location stay.</p>
            <p>Here is your booking details:</p>
            <ul>
                <li>Location: ${tourData.location}</li>
                <li>Check-in Date: ${tourData.checkInDate}</li>
                <li>Check-out Date: ${tourData.checkOutDate}</li>
                <li>Number of Guests: ${tourData.numGuests}</li>
            </ul>
            <p>We look forward to your visit! Have a great time.</p>
        `,
    };

    try {
        await transporter.sendMail(mailoptions);
        console.log("Email sent successfully");
        
    } catch (error) {
        console.log("Error sending email", error);
        
    }
})

exports.sendEmailToUsersLogin = functions.firestore
.document("usersRegistrations/{docId}")
.onCreate(async (snapshot) => {
    const tourData = snapshot.data();
    const userEmail = tourData.email();

    const mailoptions = {
        from: process.env.USER_EMAIL,
        to: userEmail,
        subject: "Your TuzuruAfrica Booking Confirmation",
        html: `
            <h1>Hello, ${tourData.user.firstName}!</h1>
            <p>Thank you for booking a TuzuruAfrica location stay.</p>
            <p>Here is your booking details:</p>
            <p>We look forward to your visit! Have a great time.</p>
        `,
    };

    try {
        await transporter.sendMail(mailoptions);
        console.log("Email sent successfully");
        
    } catch (error) {
        console.log("Error sending email", error);
        
    }
})