var peopleArr = null; // this var in global scope to access anywhere in the JS

$.ajax({
  url: "https://randomuser.me/api/?results=12",
  dataType: "json",
  success: function (data) {
    console.log(data);
    dataParse(data);
    peopleArr = data;
    let cards = document.getElementsByClassName("card");
    // index still exists after for loop is done - info is now stored instead of trashed which is typical behavior of an event listener
    for (let i = 0; i < cards.length; i++) {
      let index = i; // used var which didn't work - had to use let since let is limited to this particular scope
      // declared variable index and put in for loop
      cards[i].addEventListener("click", (e) => {
        let person = peopleArr.results[index];
        populateModal(person);
      });
    }
  },
});

function dataParse(data) {
  for (let i = 0; i < data.results.length; i++) {
    console.log(data.results[i]);
    people.innerHTML += createCard(data.results[i], i); // passing in results of [i] while referencing it again - i meaning index (after the comma - the 2nd argument)
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

// how to get all info in the card not just the info we targeted

function populateModal(person) {
  let modalInfo = `<img src="${person.picture.large}">
    <h3 class="bold">${person.name.first} ${person.name.last} </h3>
    <p class="email">${person.email}</p> 
    <p class="location">${person.location.city}</p>
    <hr>
    <p>${person.cell}</p>
    <p>${person.location.street.number} ${person.location.street.name} ${person.location.city} ${person.location.postcode}</p>
    <p>Birthday: ${moment(person.dob.date).format('MM/DD/YYYY')}</p>

    `
     modal.innerHTML = modalInfo;
}
