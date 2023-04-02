import React from 'react'
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { addToFavourites, removeFromFavourites } from '../lib/userData';

function FavouritesIcon({objectId}) {

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(()=>{
    setShowAdded(favouritesList?.includes(objectId))
  }, [favouritesList])


  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectId))
      setShowAdded(false);
    } else {
      
      setFavouritesList(await addToFavourites(objectId))
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