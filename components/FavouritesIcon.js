import React from 'react'
import { useState } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

function FavouritesIcon({objectId}) {

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectId));

  function favouritesClicked() {
    if (showAdded) {
      const updatedList = favouritesList.filter(fav => fav != objectId);
      setFavouritesList(updatedList);
      setShowAdded(false);
    } else {
      const updatedList = [...favouritesList, objectId.toString()];
      setFavouritesList(updatedList);
      setShowAdded(true);
    }
  }
  console.log(favouritesList)
  return (
    <FontAwesomeIcon
      icon={showAdded ? fasHeart : farHeart}
      className="text-red-500 cursor-pointer"
      onClick={favouritesClicked}
      style={{ color: showAdded ? 'red' : 'grey' }}
      size="2x"
    />
  )
}

export default FavouritesIcon;