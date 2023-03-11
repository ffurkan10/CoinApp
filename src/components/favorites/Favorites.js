import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from "react-icons/ai";
import { removeFavorite } from "../../redux/FavoriteSlice";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  const handleFavorite = (favorite) => {
    dispatch(removeFavorite(favorite));
  };

  return (
    <div className="favorite">
      {favorites?.length === 0 ? (
        <div className="favorite__empty">
          <h2>Your favorites is empty!</h2>
        </div>
      ) : (
        <div className="favorite__container">
          <div className="favorite__container__header">
            <div className="favorite__container__header__name">
              <span>
                <strong>#</strong>
              </span>
              <p>
                <strong>Coin</strong>
              </p>
            </div>
            <div className="favorite__container__header__price">
              <p>
                <strong>Price</strong>
              </p>
            </div>
          </div>
          <ul className="favorite__container__list">
            {favorites.map((favorite) => (
              <li className="favorite__container__list__card">
                <div className="favorite__container__list__card__name">
                  <button onClick={() => handleFavorite(favorite)}>
                    <AiIcons.AiFillHeart size={20} fill="red" />
                  </button>
                  <p>{favorite.name}</p>
                </div>
                <div className="favorite__container__list__card__price">
                  <p>
                    {favorite?.current_price?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Favorites;
