import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopular } from "../../api/Api";

const PopularCoins = () => {
  const populars = useSelector((state) => state.popular.populars);
  const status = useSelector((state) => state.popular.status);
  const error = useSelector((state) => state.popular.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopular());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div className="popular">
      <div className="popular__container">
        <h2>Trending Coins</h2>
        <ul className="popular__container__list">
          {populars.map((popular) => (
            <li className="popular__container__list__card">
              <div className="popular__container__list__card__img">
                <img src={popular?.item?.small} alt="" />
              </div>
              <div className="popular__container__list__card__detail">
                <div className="popular__container__list__card__detail__name">
                  <p>{popular?.item?.name}</p>
                  <span>({popular?.item?.symbol})</span>
                </div>
                <div className="popular__container__list__card__detail__price">
                  <p>
                    <strong>{popular?.item?.price_btc}</strong>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PopularCoins;
