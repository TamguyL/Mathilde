// // npm i framer-motion
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "./card";
import { useFetchData } from '../../data/useFetchData.ts';

interface video {
  id: number,
  titre: string,
  lienvideo: string,
  phrase: string,
}
interface titre {
  titre1: string,
  titre2: string,
  titre3: string,
  titre4: string,
}


export default function GroupCard() {
  const { data, loading, error } = useFetchData<{ 
       videoData: [video],
       grosTitre: titre, 
  }>();
  
    if (loading) {
        console.log('Loading data...');
    }

    if (error) {
        console.log(`Error: ${error}`);
    }
    
  const [order, setOrder] = useState([0, 1, 2]);

  const handleClick = (index: number) => {
    if (index === 0) return; // Ne rien faire si on clique sur la carte déjà au premier plan
    const newOrder = [...order];
    [newOrder[0], newOrder[index]] = [newOrder[index], newOrder[0]]; // Échange de position
    setOrder(newOrder);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  // Met à jour isMobile lors du resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
      <div id="v" className="marginCard anchor">
        <div className="motionCard">
          <div className="relative w-[300px] h-[400px] flex justify-center items-center">
          <h1>{data?.grosTitre.titre1}</h1>
            {order.map((pos, i) => {
              if (data && data?.videoData) {
                const {id, titre, lienvideo, phrase} = data.videoData[pos];
              return (
                  <motion.div 
                      key={id}
                      className="absolute w-full h-full cursor-pointer"
                      style={{position: "absolute"}}
                      initial={{
                        scale: i === 0 ? (isMobile ? 0.8 : 1.2) : i === 1 ? (isMobile ? 0.65 : 0.8) : (isMobile ? 0.5 : 0.6),
                        x: i === 0 ? (isMobile ? -190 : -200) : i === 1 ? (isMobile ? -400 : -550) : (isMobile ? -250 : 150),
                        y: i === 0 ? (isMobile ? 60 : 170) : i === 1 ? (isMobile ? -30 : 120) : (isMobile ? 200 : 90),
                        rotate: i === 0 ? 0 : i === 1 ? (isMobile ? -2 : 10) : (isMobile ? -5 : -10),
                        zIndex: i === 0 ? 20 : i === 1 ? 10 : 5,
                      }}
                      animate={{
                        scale: i === 0 ? (isMobile ? 0.8 : 1.2) : i === 1 ? (isMobile ? 0.65 : 0.8) : (isMobile ? 0.5 : 0.6),
                        x: i === 0 ? (isMobile ? -190 : -200) : i === 1 ? (isMobile ? -400 : -550) : (isMobile ? -250 : 150),
                        y: i === 0 ? (isMobile ? 60 : 170) : i === 1 ? (isMobile ? -30 : 120) : (isMobile ? 200 : 90),
                        rotate: i === 0 ? 0 : i === 1 ? (isMobile ? -2 : 10) : (isMobile ? -5 : -10),
                        zIndex: i === 0 ? 20 : i === 1 ? 10 : 5,
                      }}
                      transition={{type: "spring", stiffness: 300, damping: 20}}
                      onClick={() => handleClick(i)}
                  >
                    <Card id={id} titre={titre} lienvideo={lienvideo} phrase={phrase}/>
                  </motion.div>
              );
            }})}
          </div>
        </div>
      </div>
  );
}