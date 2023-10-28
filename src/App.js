import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  // we can have as many useEffect as we want.
  useEffect(() => {
    const lastIndex = people.length - 1;
    if(index < 0){
      setIndex(lastIndex);
    }
    if(index > lastIndex){
      setIndex(0);
    }
  }, [index, people]); // it will run in 2 cases (if our index changes or if our people's array changes)

  useEffect(() => {
    // these autochanging slides is also the reason why we require the clean up function as everytime the index is changing we are invoking the setInterval() but we don't want it. We want to clean up the previous one as otherwise, if the user clicks the prev or next buttons multiple times then a bunch of setIntervals are setup and the timer starts for each of them and your functionality breaks
    // setInterval(() => {
    //   setIndex(index + 1);
    // }, 3000)

    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    // clean up
    return () => {
      clearInterval(slider);
    };
  }, [index]); // set the interval once the index changes or while starting the application

  return (
    <section className='section'>
      <div className='title'>
        <h2>
          <span>/</span>Reviews
        </h2>
      </div>
      <div className='section-center'>
        {people.map((person, personIndex) => {
          const {id, image, name, title, quote} = person;
          let position = 'nextSlide';
          // check if the personIndex matches the index of the useState, then this is the slide which has to be made the active slide.
          if(personIndex === index){
            position = 'activeSlide';
          }
          if (
            (personIndex === index - 1) || (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
