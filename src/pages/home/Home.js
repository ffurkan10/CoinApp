import React, { useEffect, useRef, useState } from "react";
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
import * as AiIcons from "react-icons/ai";

const Home = () => {
  const dispatch = useDispatch();
  const coins = useSelector(selectAllCoins);
  const status = useSelector((state) => state.data.status);
  const error = useSelector((state) => state.data.error);
  const filteredCoins = useSelector(selectFilteredCoins);
  const targetRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollHeight(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleClick = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div ref={targetRef}>
        <Input searchTerm={searchTerm} handleChange={handleChange} />
        <Favorites />
      </div>

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
          {scrollHeight > 500 && (
            <button className="coins__container__btn" onClick={handleClick}>
              <AiIcons.AiOutlineArrowUp size={40} fill={"#8dc647"} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
