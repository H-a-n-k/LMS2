
const CategoriesGrid = ({ nCol, list, onSelect }) => { 

    return <div className="categories-grid" style={{ '--nCol': nCol || 6 }}>
        {list?.map(x =>
            <div className="category pointer" key={x.cate_id} onClick={()=> onSelect(x)}>
                <div className="name">{x.cate_name}</div>
                <div className="number">{x.count}</div>
            </div>
        )}
    </div>
}

export default CategoriesGrid;