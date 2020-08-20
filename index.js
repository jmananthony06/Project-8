var peopleArr = null; // this var in global scope to access anywhere in the JS

// use jQuery to access user profiles from API 
// HTTP(ajax) request - aka asking internet resource for info
$.ajax({
  url: "https://randomuser.me/api/?results=12", 
  dataType: "json",
  success: function (data) {  //populates cards on page
    console.log(data);  // console logs data
    createCards(data); // loops the created cards (individual profile cards)
    peopleArr = data; // array of given profile data being stored 
    let cards = document.getElementsByClassName("card");
    // index still exists after for loop is done - info is now stored instead of trashed which is typical behavior of an event listener
    for (let i = 0; i < cards.length; i++) { // iterates over each profile card individually 
      let index = i; // used var which didn't work - had to use let since let is limited to this particular scope
      // declared variable index and put in for loop
      cards[i].addEventListener("click", (e) => {
        let person = peopleArr.results[index]; // iterates over stored data in array
        populateModal(person); // populates the modal with info specific to any given user 
        modalOverlay.classList.add("open"); // this allows a modal to open when a card is clicked 
      });
    }
  },
});

function createCards(data) {
  for (let i = 0; i < data.results.length; i++) {
    console.log(data.results[i]); 
    let person = (data.results[i]);
    people.innerHTML += createCard(person, i); // passing in results of [i] while referencing it again - i meaning index (after the comma - the 2nd argument)
  }
}

function createCard(person, index) {
  let card = `<div class="card" data-index="${index}">
    <img src="${person.picture.medium}"> 
    <div class="cardText"> 
    <h3 class="bold">${person.name.first} ${person.name.last} </h3>
    <p class="email">${person.email}</p> 
    <p class="location">${person.location.city}</p>
    </div>
    </div>`;
  return card;
}

function populateModal(person) {
  let modalInfo = `<img src="${person.picture.large}"><img src="./icons/x.png" class="closeX" alt="close">
    <h3 class="bold">${person.name.first} ${person.name.last} </h3>
    <p class="email">${person.email}</p> 
    <p class="location">${person.location.city}</p>
    <hr>
    <p>${person.cell}</p>
    <p>${person.location.street.number} ${person.location.street.name} ${person.location.city} ${person.location.postcode}</p>
    <p>Birthday: ${moment(person.dob.date).format('MM/DD/YYYY')}</p>
    `
    modal.innerHTML = modalInfo; 
    var closeIcon = document.querySelector(".closeX");
    closeIcon.addEventListener('click', function() {
      modalOverlay.classList.remove("open");
    });

}

var overlay = document.querySelector(".modalOverlay");

function closeModal() {
  modalOverlay.classList.remove("open");
};


