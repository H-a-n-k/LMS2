import useGlobalContext from "../../contexts/GlobalContext";

const Background = () => { 
    const { lightMode } = useGlobalContext();

    return <div className={`page-bg ${lightMode ? '' : 'night-mode'}`}>
        <div className={`page-night-bg ${lightMode ? 'opacity-0' : ''}`}></div>
        <div className={`page-light-bg ${lightMode ? '' : 'opacity-0'}`}></div>
    </div>
}

export default Background;