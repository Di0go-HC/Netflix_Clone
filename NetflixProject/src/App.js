import React, {useEffect, useState} from 'react';
import tmbd from './tmbd';
import './App.css';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './FeaturedMovie';
import Header from './components/Header';
import load from './Netflix_LoadTime.gif';

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData]= useState(null);
  const [blackHeader, setBlackHeader] = useState (false);
  useEffect(()=>{
    const loadAll = async ()=>{
      //Pegando a lista total
      let list = await tmbd.getHomeList();


      setMovieList(list);


      //pegando o filme featured (em destque)
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals [0].items.results[randomChosen];
      let chosenInfo= await tmbd.getMovieInfo(chosen.id, 'tv');
     
     
        setFeaturedData(chosenInfo);
    
    
    }
    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener =( ) => {
      if(window.scrollY > 10) {
        setBlackHeader(true); 
      }else
          setBlackHeader(false); 
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return(
    <div className="page">
      <Header black ={blackHeader} />

      {featuredData &&
      <FeaturedMovie item = {featuredData}/>
      }
      
    <section className="lists">
      {movieList.map((item, key)=>(
          <MovieRow key={key}  title={item.title} items={item.items} />
  
      ))}
      </section> 

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> por Diogo Henrique <br/>
        Direitos de imagem para Netflix <br/>
        Dados pegos do site Themoviedb.org
      </footer>
      {movieList.length <= 0 &&
        <div className ="loading">
          <img src={load} alt="carregando" />
        </div>
      }
    </div>
  );
}