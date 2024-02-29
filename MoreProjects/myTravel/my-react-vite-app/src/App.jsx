import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Places from "./components/Places";
import { AVAILABLE_PLACES } from "./data.js";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import Modal from "./components/Modal.jsx";
import { sortPlacesByDistance } from "./loc.js";

//da gi zacuva gore
const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || []; // i need the IDs
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
); // i nee the places with all data like title and image

function App() {
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  // const modal = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]); //we need state thaht manages the available places updating

  useEffect(() => {
    //get user location, provided by browser
    // So the first app component render cycle will be finished at the point of time where we have this location. Therefore, we need state here.
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      ); //this code is side effect is not directly related, we fetch user's location,
      //does not finish instantly is a callback function

      setAvailablePlaces(sortedPlaces); // this trigers a new render cycle, the state will be updated with those sorted places
    }); //taks a function as an input
  }, []);

  function handleStartRemovePlace(id) {
    // modal.current.open(); // otvori go modelot
    setModalIsOpen(true);
    selectedPlace.current = id; // idto e selektiraniot place , za da moze posle da se iskoristi za brisenje
  }

  function handleStopRemovePlace() {
    // modal.current.close(); // zatvori go modelot ako idam cancel
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }

      const place = AVAILABLE_PLACES.find((place) => place.id === id);

      return [place, ...prevPickedPlaces];
    });
    //za da se zacuvaat podatocite vo browser .. ANOTHER EXAPMLE FOR SIDE EFFECT
    // WE don't need useEffect hook bidejki ovoj kod get executed koga handleSelectPlace funkcijata se izvrsuva
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || []; // i need the IDs ako ne prazna lista

    if (storedIds.indexOf(id) === -1) {
      // if id is not existring of storeIds
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds])
      ); // to store some data in the browser's storage, data must be in a string format, id of the place that was just selected
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    // koga kje prisinam yes dek sakam da gi izbrisam mestata
    setPickedPlaces(
      (
        prevPickedPlaces // od prethodnite mesta
      ) =>
        prevPickedPlaces.filter((place) => place.id !== selectedPlace.current) // vrakja false ako id-to e ednakvo so selecktiraniot item
    );
    //nova niza so site mesta od prevPicked place kade id=to ne e ednakvo so selectedPlace, ako se match ke bide excluded
    // modal.current.close(); //zatvori go modelot
    setModalIsOpen(false);
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || []; // i need the IDs
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    ); //alows to produce a new array fiilter method, for that filter takes a function that will be executed on every item in this array
    //true if we wanna keep this item and false if we wanna drop
    //that will be executed on every item in this array
  }, []);

  return (
    <>
      <Header />
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        ></DeleteConfirmation>
      </Modal>
      <Places
        title="I'd like to visit"
        places={pickedPlaces}
        onSelectPlace={handleStartRemovePlace}
        fallbackText="Select the places you would like to visit below."
      />
      <Places
        title="Available Places"
        places={availablePlaces}
        fallbackText="Sorting places by distance..."
        onSelectPlace={handleSelectPlace}
      />
    </>
  );
}

export default App;
