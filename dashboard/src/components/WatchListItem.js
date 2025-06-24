import {useState} from "react";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material"
import WatchListAction from "./WatchListAction.js";

function WatchListItem({stock, key}) {
    const[showWatchlistActions, setShowWatchlistActions]= useState(false);

    const handleMouseEnter= (e)=>{
        setShowWatchlistActions(true);
    }
    const handleMouseLeave= (e)=>{
        setShowWatchlistActions(false);
    }

    return (
      <li
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        key={key}
      >
        <div className="item">
          <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
          <div className="itemInfo">
            <span className="percent">{stock.percent}</span>
            {stock.isDown ? (
              <KeyboardArrowDown className="down" />
            ) : (
              <KeyboardArrowUp className="up" />
            )}
            <span className="price">{stock.price}</span>
          </div>
        </div>
        {showWatchlistActions && <WatchListAction uid={stock.name}  /> }
      </li>
    );
}

export default WatchListItem;