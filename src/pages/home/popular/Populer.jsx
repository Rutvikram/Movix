import React, { useState } from 'react'
import ContentWrapper from '../../../component/contentWrapper/ContentWrapper'
import SwitchTab from '../../../component/switchTabs/SwitchTab'
import Carousel from '../../../component/carousel/Carousel'


import useFetch from '../../../customHook/useFetch'
const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie")

    const { data, loadiing } = useFetch(`/${endpoint}/popular`);
    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div className='carouseSection' >
            <ContentWrapper>
                <span className="carouseTitle">What's Popular</span>
                <SwitchTab data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loadiing={loadiing} endpoint={endpoint} />
        </div>
    )
}

export default Popular;