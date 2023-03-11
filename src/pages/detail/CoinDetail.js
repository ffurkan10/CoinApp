import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinDetail } from "../../api/Api";
import moment from "moment/moment";
import Chart from "../../components/chart/Chart";
import PopularCoins from "../../components/popularCoins/PopularCoins";
import Loading from "../../components/loading/Loading";

const CoinDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.detail.status);
  const error = useSelector((state) => state.detail.error);
  const detail = useSelector((state) => state.detail.detail);

  useEffect(() => {
    dispatch(fetchCoinDetail(id));
  }, [id, dispatch]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div className="detail">
      <div className="detail__container">
        <div className="detail__container__title">
          <div className="detail__container__title__rank">
            <p>Rank #{detail.market_cap_rank}</p>
          </div>
          <div className="detail__container__title__name">
            <img src={detail?.image?.small} alt="" />
            <h2>{detail.name}</h2>
            <span>({detail.symbol})</span>
          </div>
          <div className="detail__container__title__price">
            <h1>
              {detail?.market_data?.current_price.usd?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h1>
          </div>
        </div>

        <div className="detail__container__content">
          <div className="detail__container__content__left">
            <h2>{detail.symbol} PRICE STATISTICS</h2>
            <p>{detail.name} Price Today</p>
            <div className="detail__container__content__left__values">
              <p>{detail.name} Price</p>
              <span>
                {detail?.market_data?.current_price?.usd.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
              </span>
            </div>
            <div className="detail__container__content__left__values">
              <p>24h low / 24h high</p>
              <span>
                {detail?.market_data?.low_24h?.usd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
                /
                {detail?.market_data?.high_24h?.usd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
            <div className="detail__container__content__left__values">
              <p>Market Cap Rank</p>
              <span>Rank #{detail.market_cap_rank}</span>
            </div>
            <div className="detail__container__content__left__values">
              <p>Market Cap</p>
              <span>
                {detail?.market_data?.market_cap?.usd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
            <div className="detail__container__content__left__values">
              <p>All-Time High</p>
              <span>
                {detail?.market_data?.ath?.usd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
                / {detail?.market_data?.ath_change_percentage?.usd.toFixed(2)}%
              </span>
            </div>
            <div className="detail__container__content__left__values">
              <p>All-Time Low</p>
              <span>
                {detail?.market_data?.atl?.usd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
                / {detail?.market_data?.atl_change_percentage?.usd.toFixed(2)}%
              </span>
            </div>
            <div className="detail__container__content__left__values">
              <p>Volume / Market Cap</p>
              <span>
                {(
                  detail?.market_data?.total_volume?.usd /
                  detail?.market_data?.market_cap?.usd
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
          </div>
          <div className="detail__container__content__right">
            <div className="detail__container__content__right__description">
              <h3>
                <span>{detail.symbol}</span> Price Today
              </h3>
              <p>
                <strong>{detail.name}</strong> price today is {""}
                {detail?.market_data?.current_price?.usd.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}{" "}
                with a 24-hour trading volume of {""}
                {detail?.market_data?.current_price?.usd.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
                . <span>{detail.symbol}</span> price is up {""}
                {detail?.market_data?.price_change_percentage_24h_in_currency?.usd.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}{" "}
                in the last 24 hours. It has circulating supply of{" "}
                {detail?.market_data?.circulating_supply.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
                .{" "}
                <span>
                  <strong>{detail.symbol}</strong>
                </span>{" "}
                coins and a total supply of{" "}
                {detail?.market_data?.total_supply.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
                .{" "}
              </p>
            </div>

            <div className="detail__container__content__right__description">
              <h3>What was the highest price for {detail.name}?</h3>
              <p>
                <strong>{detail.name}</strong> hit an all time high of {""}
                {detail?.market_data?.ath?.usd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
                on{" "}
                {moment(detail?.market_data?.ath_date?.usd).format(
                  "DD/MM/YYYY"
                )}
                .
              </p>
            </div>
            <div className="detail__container__content__right__description">
              <h3>What was the lowest price for {detail.name}?</h3>
              <p>
                <strong>{detail.name}</strong> hit an all time low of {""}
                {detail?.market_data?.atl?.usd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
                on{" "}
                {moment(detail?.market_data?.atl_date?.usd).format(
                  "DD/MM/YYYY"
                )}
                .
              </p>
            </div>
          </div>
        </div>

        <Chart />

        <PopularCoins />
      </div>
    </div>
  );
};

export default CoinDetail;
