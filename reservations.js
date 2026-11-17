const reservationList =
  document.getElementById(
    "reservationList"
  );



// Show saved reservations

function loadReservations() {


  const reservations =
    JSON.parse(
      localStorage.getItem(
        "smartPathReservations"
      )
    ) || [];


  reservationList.innerHTML =
    "";



  // No bookings yet

  if (reservations.length === 0) {


    reservationList.innerHTML = `

      <div class="empty-message">

        <h3>
          No reservations saved yet.
        </h3>

        <p>
          Make a booking first and it will appear here.
        </p>

      </div>

    `;


    return;

  }



  // Show each reservation

  reservations.forEach(

    function(
      reservation,
      index
    ) {


      const card =
        document.createElement(
          "div"
        );


      card.className =
        "reservation-card";


      card.innerHTML = `

        <div class="reservation-header">


          <div>


            <p class="small-title">
              BOOKING CODE
            </p>


            <div class="reservation-code">
              ${reservation.code}
            </div>


          </div>


          <button
            class="delete-button"
            onclick="deleteReservation(${index})"
          >
            Delete
          </button>


        </div>



        <div class="reservation-details">


          <p>
            <strong>Name:</strong>
            ${reservation.fullName}
          </p>


          <p>
            <strong>Phone:</strong>
            ${reservation.phone}
          </p>


          <p>
            <strong>Email:</strong>
            ${reservation.email}
          </p>


          <p>
            <strong>Emirates ID:</strong>
            ${reservation.emiratesId}
          </p>


          <p>
            <strong>Date:</strong>
            ${reservation.bookingDate}
          </p>


          <p>
            <strong>Time:</strong>
            ${reservation.timeSlot}
          </p>


          <p>
            <strong>Price:</strong>
            AED ${reservation.price}
          </p>


          <p>
            <strong>Booked:</strong>
            ${reservation.createdAt}
          </p>


        </div>

      `;


      reservationList.appendChild(
        card
      );

    }

  );

}



// Delete one booking

function deleteReservation(index) {


  const reservations =
    JSON.parse(
      localStorage.getItem(
        "smartPathReservations"
      )
    ) || [];


  reservations.splice(
    index,
    1
  );


  localStorage.setItem(
    "smartPathReservations",

    JSON.stringify(
      reservations
    )
  );


  loadReservations();

}



// Delete everything

function clearReservations() {


  const answer =
    confirm(
      "Are you sure you want to delete all reservations?"
    );


  if (answer) {


    localStorage.removeItem(
      "smartPathReservations"
    );


    loadReservations();

  }

}



// Load when page opens

loadReservations();