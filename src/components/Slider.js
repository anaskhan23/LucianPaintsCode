import React from 'react';
import { Slide } from 'react-slideshow-image';
import styled from "styled-components";
 

const slideImages = [
    "img/slideimg.jpg",
    "img/slideimg.jpg",
    "img/slideimg.jpg"

];
 
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}
 
 const Slideshow = () => {
    return (
      <Slide {...properties}>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[0]})`,'height':`500px`}}>
            <span>Slide 1</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[1]})`,'height':`500px`}}>
            <span>Slide 2</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]})`,'height':`500px`}}>
            <span>Slide 3</span>
          </div>
        </div>
      </Slide>
    )
}
export default Slideshow;