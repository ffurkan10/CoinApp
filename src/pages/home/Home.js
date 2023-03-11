import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../../api/Api";
import CoinList from "../../components/coinList/CoinList";
import Favorites from "../../components/favorites/Favorites";
import Loading from "../../components/loading/Loading";
import { selectAllCoins } from "../../redux/CoinSlice";

const Home = () => {
  const dispatch = useDispatch();
  const coins = useSelector(selectAllCoins);
  const status = useSelector((state) => state.data.status);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <Favorites />

      <div className="coins">
        <div className="coins__headers">
          <div className="coins__headers__name">
            <span>#</span>
            <p>Coins</p>
          </div>
          <ul className="coins__headers__values">
            <li>
              <p>Price</p>
            </li>
            <li>
              <p>24h</p>
            </li>
            <li>
              <p>Total Volume</p>
            </li>
            <li>
              <p>Mkt Cap</p>
            </li>
          </ul>
        </div>
        <div className="coins__container">
          <ul className="coins__container__lists">
            {coins.map((coins) => (
              <CoinList key={coins.id} coins={coins} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
