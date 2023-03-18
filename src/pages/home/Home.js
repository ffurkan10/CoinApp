import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../../api/Api";
import CoinList from "../../components/coinList/CoinList";
import Favorites from "../../components/favorites/Favorites";
import Input from "../../components/input/Input";
import Loading from "../../components/loading/Loading";
import {
  filter,
  selectAllCoins,
  selectFilteredCoins,
} from "../../redux/CoinSlice";

const Home = () => {
  const dispatch = useDispatch();
  const coins = useSelector(selectAllCoins);
  const status = useSelector((state) => state.data.status);
  const error = useSelector((state) => state.data.error);
  const filteredCoins = useSelector(selectFilteredCoins);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(filter(e.target.value));
  };

  const coinsToDisplay = searchTerm ? filteredCoins : coins;

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <Input searchTerm={searchTerm} handleChange={handleChange} />
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
            {coinsToDisplay.map((coins) => (
              <CoinList key={coins.id} coins={coins} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
