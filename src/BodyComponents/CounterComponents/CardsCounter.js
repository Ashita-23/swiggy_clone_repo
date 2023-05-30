import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import "./CardsCounter.css";
import "./CardsCounterMedia.css";
import RestaurantsCards from "./RestaurantsCards";
import { Swiggy_API_URL } from "../../Util/ApiConfig";
import {getFilterList,getFastDelivery,getTopRatedcards} from "../../helper/HelperFunction"
// import ErrorInSearch from "../../ErrorCompos/Errors";
import CounterShimmer from "../ShimmerComponents/CounterShimmer";
import CardsShimmer from "../ShimmerComponents/CardsShimmer";

const RestaurantCounter = () => {
  const [allRestaurant, setAllRestaurant] = useState([]);
  //  console.log(allRestaurant,"all")
  const [resturantList, setResturantList] = useState([]);
  //  console.log(resturantList,"copy")
  const [inputText, setInputText] = useState(" ");


  useEffect(() => {
    getSwiggyData();
  }, [inputText]);

  async function getSwiggyData() {
    const Swiggy_API = await fetch(Swiggy_API_URL);
    const JsonData = await Swiggy_API.json();
    //    console.log(JsonData?.data?.cards)
    setAllRestaurant(JsonData?.data?.cards);
    setResturantList(JsonData?.data?.cards);
  }
//early return
  if(!allRestaurant) return null;
  return  (resturantList.length===0) ? <CounterShimmer/> : (
    <>
      <div className="Counter-outer">
        <div className="search-outer">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
            />
            <button type="submit" className="input-btn" onClick={()=>{const filterList = getFilterList(inputText,allRestaurant);
                setResturantList(filterList);}}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" onClick={()=>{
                setResturantList(allRestaurant)
            }} >Relevance</button>
            <button
              className="btn"
              onClick={() => {
                const fastDeliveryCards = getFastDelivery(allRestaurant);
                ( fastDeliveryCards.length === 0)? setResturantList(allRestaurant): setResturantList( fastDeliveryCards);}} >
              Delivery Time
            </button>
            <button
              className="btn"
              onClick={() => {
                const topRatedCards = getTopRatedcards(allRestaurant);
                ( topRatedCards.length === 0)? setResturantList(allRestaurant): setResturantList(topRatedCards); }}>
              Top Rating
            </button>
          </div>
        </div>
        <div className="card-display-outer">
        <div className="card-display-inner">
        {resturantList?.map((cards)=>{
            return resturantList.length === 0 ? ( <CardsShimmer/> ) : ( <Link to={"/restaurant/"+ cards?.data?.data?.id} ><RestaurantsCards resturantLists={cards} key={cards?.data?.data?.id}/> </Link>);
          })}

        </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantCounter;
