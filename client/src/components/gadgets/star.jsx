
const Star = ({ top, left, right, size, dist, time }) => { 
    const style = { top: `${top}px`, right: `${right}px`, left: `${left}px`, padding: `${size}px`, '--dist': `-${dist}px`, '--time': `${time}s`};

    return <div className="star float-in-reverse" style={style}></div>
}

export default Star