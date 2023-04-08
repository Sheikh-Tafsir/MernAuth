import React from 'react'
import { Button } from 'react-bootstrap';
import {Link, NavLink} from "react-router-dom";
import "../css pages/Heromain.css"
import logo from "../images/FLogo.png"
const Heromain = () => {
  const imageSlide2 = () => {
    document.querySelector(".heromainslides").style.marginLeft = "0%";
    document.querySelector(".heromainslides").style.transition = "all 1.5s";
  }
  const imageSlide3 = () => {
    document.querySelector(".heromainslides").style.marginLeft = "-100%";
    document.querySelector(".heromainslides").style.transition = "all 1.5s";
  }
  const imageSlide1 = () => {
    document.querySelector(".heromainslides").style.marginLeft = "-200%";
    document.querySelector(".heromainslides").style.transition = "all 1.5s";
  }
  return (
    <>
        <div className="heromainBackground">
          <div className="heromainslider">
            <div className="heromainslides">
              <img src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="heromainSlideImage"/>
              <img src="https://static.toiimg.com/thumb/79531761.cms?width=680&height=512&imgsize=481777" className="heromainSlideImage"/>
              <img src="https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153__340.jpg" className="heromainSlideImage"/>
            </div>
            <div className="heromainSlideBut">
              <img src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="heromainSlideButImage heromainSlideImage1" onClick={imageSlide2}/>
              <img src="https://static.toiimg.com/thumb/79531761.cms?width=680&height=512&imgsize=481777" className="heromainSlideButImage heromainSlideImage2" onClick={imageSlide3}/>
              <img src="https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153__340.jpg" className="heromainSlideButImage heromainSlideImage3" onClick={imageSlide1}/>
            </div>
          </div>
        </div>
        <div className="heromanAbout">
          <h1>Welcome to The Best Cafe in VA!</h1>
          <p>A gathering place in Downtown Farmville! Stop by and enjoy coffee, tea, live music, soups, salad, sandwiches, ice cream and much more!</p>
        </div>
        
        <div className="heromainBackgroundSec" id="products">
          <div className="heromainBackgroundSecParts">
            <div className="heromainBackgroundSecPartsBack">
              <Link to="/fastfood" className="heromainBackgroundSecPartsLink">Fast Food</Link><br/>
            </div>
          </div>
          <div className="heromainBackgroundSecParts">
            <div className="heromainBackgroundSecPartsBack">
              <Link to="/setmenu" className="heromainBackgroundSecPartsLink">Set Menu</Link><br/>
            </div>
          </div>
        </div>
        
        <div className="heromainBackgroundThi">
          <div className="heromainBackgroundThiBack">
            <Link to="/fastfood" className="heromainBackgroundThiLink">Our Specials</Link><br/>
          </div>
        </div>

        <div className="heromainBackgroundFor">
          <div className="heromainBackgroundForParts">
            <div className="heromainBackgroundForPartsBack">
              <Link to="/setmenu" className="heromainBackgroundForPartsLink">Street Food</Link><br/>
            </div>
          </div>
          <div className="heromainBackgroundForParts">
            <div className="heromainBackgroundForPartsBack">
              <Link to="/fastfood" className="heromainBackgroundForPartsLink">Drinks</Link><br/>
            </div>
          </div>
        </div>
    </>
  )
}

export default Heromain