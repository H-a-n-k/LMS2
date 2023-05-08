import { PlayIcon } from "../../utils/icons";

const HalfCloud = ({ top, left, right, height, transform, noLine, circleTop, special, time, dist }) => { 
    
    const style = { top: `${top}px`, right: `${right}px`, left: `${left}px`, '--time': `${time}s`, '--dist': `${dist}px` };

    if (special) return <div className="half-cloud half-cloud-special float-in" style={style}>
        <div className="line"></div>
        <div className="cloud">
            <PlayIcon />
        </div>
        <div className="circle"></div>
    </div>

    return <div className='half-cloud float-in' style={style}>
        {!noLine && 
            <>
                <div className="line"></div>
                <div className="circle" style={{top: `${circleTop}px`}}></div>
            </>
        }
        <div className="cloud" style={{ height: `${height}px`, width: `${height * 2}px`, transform }}></div>
    </div>
}

export default HalfCloud;