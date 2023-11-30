import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div className="preloader">
            <div className="loader_overlay"></div>
            <div className="loader_cogs">
                <div className="loader_cogs__top">
                    <div className="top_part"></div>
                    <div className="top_part"></div>
                    <div className="top_part"></div>
                    <div className="top_hole"></div>
                </div>
                <div className="loader_cogs__left">
                    <div className="left_part"></div>
                    <div className="left_part"></div>
                    <div className="left_part"></div>
                    <div className="left_hole"></div>
                </div>
                <div className="loader_cogs__bottom">
                    <div className="bottom_part"></div>
                    <div className="bottom_part"></div>
                    <div className="bottom_part"></div>
                    <div className="bottom_hole"></div>
                </div>
            </div>
        </div>
    );
}

export default Loader;
//This component is get inspired from beautiful website https://www.blastabakers.com

//The loader on https://www.blastabakers.com is a visually pleasing element, seamlessly
// integrating subtle animations for a responsive and distraction-free user experience,
// aligning perfectly with the site's cohesive design.

//Thank you to the developer of https://www.blastabakers.com! Your creativity and attention
// to detail shine through the beautiful design and user-friendly features. It's a fantastic
// website, and your hard work is truly appreciated!


