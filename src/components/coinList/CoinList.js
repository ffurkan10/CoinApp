import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavorite, removeFavorite } from "../../redux/FavoriteSlice";
import * as AiIcons from "react-icons/ai";

const CoinList = ({ coins }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);

  const handleFavorite = (coins) => {
    const isFavorite = favorites.some((item) => item.id === coins.id);
    if (isFavorite) {
      dispatch(removeFavorite(coins));
    } else {
      dispatch(addFavorite(coins));
    }
  };

  const isFavorite = favorites.some((item) => item.id === coins.id);

  return (
    <li className="coins__container__lists__list">
      <div className="coins__container__lists__list__name">
        <div className="coins__container__lists__list__name__rank">
          <button onClick={() => handleFavorite(coins)}>
            <span>
              {isFavorite ? (
                <AiIcons.AiFillHeart size={20} fill="red" />
              ) : (
                <AiIcons.AiFillHeart size={20} fill="#8dc647" />
              )}
            </span>
          </button>
          <p>{coins.market_cap_rank}.</p>
        </div>
        <Link to={`/coin/${coins.id}`}>
          <div className="coins__container__lists__list__name__symbol">
            <img src={coins.image} alt="" />
            <p>
              <strong>{coins.name}</strong>
            </p>
            <span>({coins.symbol})</span>
          </div>
        </Link>
      </div>
      <ul className="coins__container__lists__list__values">
        <li className="coins__container__lists__list__values__detail">
          {coins?.current_price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </li>
        <li
          className={
            coins?.price_change_percentage_24h < 0
              ? `coins__container__lists__list__values__detail down`
              : `coins__container__lists__list__values__detail up`
          }
        >
          {coins?.price_change_percentage_24h?.toFixed(2)}%
        </li>
        <li className="coins__container__lists__list__values__detail">
          {coins?.total_volume?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </li>
        <li className="coins__container__lists__list__values__detail">
          {coins?.market_cap?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </li>
      </ul>
    </li>
  );
};

export default CoinList;
