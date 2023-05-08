
const DialogWrapper = ({ children, onClickOut, noBG }) => { 

    const clickOut = (e) => { 
        if (e.target === e.currentTarget) onClickOut();
    }

    return <div className={`dialog ${noBG ? 'no-bg':''}`} onClick={(e) => { clickOut(e) }}>
        {children}
    </div>
}

export default DialogWrapper