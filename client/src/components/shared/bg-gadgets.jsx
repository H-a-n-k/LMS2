import MountainBG from '../../resources/imgs/mountain-bg.png';
import HalfCloud from '../gadgets/half-cloud';
import Star from '../gadgets/star';

import useGlobalContext from "../../contexts/GlobalContext";

// require PageBackground component
const BGGadgets = () => { 
    const { lightMode } = useGlobalContext();
    
    return <div className='bg-gadgets'>
        <img src={MountainBG} alt="" className='mountain-bg'/>

        {lightMode ? <>
            <HalfCloud top={310} left={374} time={2.4} dist={160} />
            <HalfCloud top={440} left={20} height={60} time={2} dist={100} />
            <HalfCloud top={250} right={0} height={57} transform='translateX(-100%)' noLine time={2.8} dist={100} />
            <HalfCloud top={227} right={115} height={22} time={2.6} dist={220} />
            <HalfCloud top={300} right={33} height={33} circleTop={100} time={1.8} dist={280} />
            <HalfCloud top={850} right={180} height={75} noLine time={1.5} dist={130} />
            <HalfCloud top={875} right={80} height={50} noLine time={2.4} dist={160} />
            <HalfCloud top={830} right={120} height={35} noLine time={1.9} dist={290} />
            <HalfCloud top={700} right={0} height={75} noLine time={1.7} dist={240} />
            <HalfCloud top={420} left={1100} special time={1.9} dist={120} />
        </> : <>
            <Star top={140} left={180} size={5} time={2.4} dist={160} />
            <Star top={420} left={400} size={4} time={2} dist={100} />
            <Star top={350} left={180} size={5} time={2.8} dist={100} />
            <Star top={280} left={300} size={3} time={2.8} dist={100} />

            <Star top={280} right={140} size={5} time={1.5} dist={130} />
            <Star top={420} right={250} size={2} time={1.5} dist={130} />
            <Star top={350} right={450} size={5} time={1.9} dist={120} />
            <Star top={210} right={300} size={3} time={1.7} dist={240} />
        </>}
    </div>
}

export default BGGadgets