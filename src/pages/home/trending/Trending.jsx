import React, { useState } from 'react'
import ContentWrapper from '../../../component/contentWrapper/ContentWrapper'
import SwitchTab from '../../../component/switchTabs/SwitchTab'
import Carousel from '../../../component/carousel/Carousel'


import useFetch from '../../../customHook/useFetch'
const Trending = () => {
    const [endpoint, setEndpoint] = useState("day")

    const { data, loadiing } = useFetch(`/trending/movie/${endpoint}`);
    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div className='carouseSection' >
            <ContentWrapper>
                <span className="carouseTitle">Trending</span>
                <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loadiing={loadiing} />
        </div>
    )
}

export default Trending