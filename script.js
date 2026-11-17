const bookingForm =
    document.getElementById("bookingForm");


const successSection =
    document.getElementById("successSection");


const dateInput =
    document.getElementById("bookingDate");


const timeCheckboxes =
    document.querySelectorAll(
        'input[name="timeSlot"]'
    );


const hoursSelectedText =
    document.getElementById(
        "hoursSelected"
    );


const totalPriceText =
    document.getElementById(
        "totalPrice"
    );



// PRICE PER HOUR

const pricePerHour =
    10;



// DO NOT ALLOW PAST DATES

const today =
    new Date();


const todayText =
    today.toISOString().split("T")[0];


dateInput.min =
    todayText;



// UPDATE PRICE WHEN
// USER SELECTS HOURS

timeCheckboxes.forEach(

    function(checkbox) {


        checkbox.addEventListener(

            "change",

            function() {


                const selectedSlots =

                    document.querySelectorAll(
                        'input[name="timeSlot"]:checked'
                    );


                const numberOfHours =
                    selectedSlots.length;


                const totalPrice =
                    numberOfHours *
                    pricePerHour;



                hoursSelectedText.textContent =
                    numberOfHours;


                totalPriceText.textContent =
                    totalPrice;


            }

        );


    }

);



// CONFIRM BOOKING

bookingForm.addEventListener(

    "submit",

    function(event) {


        event.preventDefault();



        // GET PERSONAL DETAILS

        const fullName =

            document.getElementById(
                "fullName"
            ).value;


        const phone =

            document.getElementById(
                "phone"
            ).value;


        const email =

            document.getElementById(
                "email"
            ).value;


        const emiratesId =

            document.getElementById(
                "emiratesId"
            ).value;


        const bookingDate =

            document.getElementById(
                "bookingDate"
            ).value;



        // GET SELECTED TIME SLOTS

        const selectedCheckboxes =

            document.querySelectorAll(
                'input[name="timeSlot"]:checked'
            );



        // USER MUST SELECT
        // AT LEAST ONE HOUR

        if (
            selectedCheckboxes.length === 0
        ) {


            alert(
                "Please select at least one time slot."
            );


            return;

        }



        // CREATE ARRAY OF TIMES

        const selectedTimes =
            [];


        selectedCheckboxes.forEach(

            function(checkbox) {


                selectedTimes.push(
                    checkbox.value
                );


            }

        );



        // NUMBER OF HOURS

        const numberOfHours =
            selectedTimes.length;



        // CALCULATE PRICE

        const totalPrice =

            numberOfHours *
            pricePerHour;



        // CREATE BOOKING CODE

        const randomNumber =

            Math.floor(
                100000 +
                Math.random() * 900000
            );


        const code =

            "SP-" +
            randomNumber;



        // HIDE MOST OF
        // EMIRATES ID

        const cleanId =

            emiratesId.replace(
                /\s/g,
                ""
            );


        const lastFour =

            cleanId.slice(-4);


        const maskedEmiratesId =

            "*************" +
            lastFour;



        // CREATE RESERVATION

        const reservation = {


            code:
                code,


            fullName:
                fullName,


            phone:
                phone,


            email:
                email,


            emiratesId:
                maskedEmiratesId,


            bookingDate:
                bookingDate,


            timeSlot:
                selectedTimes.join(
                    ", "
                ),


            hours:
                numberOfHours,


            price:
                totalPrice,


            createdAt:

                new Date()
                .toLocaleString()


        };



        // GET OLD BOOKINGS

        const savedReservations =

            JSON.parse(

                localStorage.getItem(
                    "smartPathReservations"
                )

            ) || [];



        // ADD NEW BOOKING

        savedReservations.push(
            reservation
        );



        // SAVE BOOKINGS

        localStorage.setItem(

            "smartPathReservations",

            JSON.stringify(
                savedReservations
            )

        );



        // SHOW BOOKING CODE

        document.getElementById(
            "bookingCode"
        ).textContent =
            code;



        // SHOW NAME

        document.getElementById(
            "summaryName"
        ).textContent =
            fullName;



        // SHOW DATE

        document.getElementById(
            "summaryDate"
        ).textContent =
            bookingDate;



        // SHOW TIMES

        document.getElementById(
            "summaryTime"
        ).textContent =

            selectedTimes.join(
                ", "
            );



        // SHOW HOURS

        document.getElementById(
            "summaryHours"
        ).textContent =

            numberOfHours;



        // SHOW PRICE

        document.getElementById(
            "summaryPrice"
        ).textContent =

            totalPrice;



        // SHOW CONFIRMATION

        successSection.style.display =
            "block";



        successSection.scrollIntoView({

            behavior:
                "smooth"

        });


    }

);



// MAKE ANOTHER BOOKING

function makeAnotherBooking() {


    bookingForm.reset();


    dateInput.min =
        todayText;


    hoursSelectedText.textContent =
        "0";


    totalPriceText.textContent =
        "0";


    successSection.style.display =
        "none";


    document.getElementById(
        "booking"
    ).scrollIntoView({

        behavior:
            "smooth"

    });


}