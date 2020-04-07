import "./RoadMap.less";
import React from "react";
import { getLang, dateFormat, classNames as cn } from "src/utils";

export default props => {
  const currentTime = Date.now();
  return (
    <div className="SiteTokenScreen__RoadMap">
      <div className="anchor" id="RoadMap" />
      <h2>{getLang("token_roadMapTitle")}</h2>
      <h3>{getLang("token_roadMapSubTitle")}</h3>

      <div className="SiteTokenScreen__RoadMap__list">
        {props.items.map((item, key) => (
          <div
            key={key}
            className={cn("SiteTokenScreen__RoadMap__list__item", {
              active: currentTime > item.time
            })}
          >
            <div>
              <small>{dateFormat(item.time, "DD MMM YYYY")}</small>
              <strong>{item.title}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
