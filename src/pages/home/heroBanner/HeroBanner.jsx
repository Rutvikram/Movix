import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../../customHook/useFetch';
import "./style.scss";
import Img from '../../../component/lazyLoadImage/Img';
import ContentWrapper from "../../../component/contentWrapper/ContentWrapper"



const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming")
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg);
  }, [data]);

  const serchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }
  return (
    <div className="heroBanner">
      {!loading && <div className="backdrop-img"><Img src={background} /></div>}
      <div className="opacity-layer"></div>
      <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome.</span>
            <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.</span>
            <div className="serchInput">
              <input type="text" onChange={(e) => setQuery(e.target.value)} onKeyUp={serchQueryHandler} placeholder='Search for a movie and tv show...' />
              <button>Search</button>
            </div>
          </div>  
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner