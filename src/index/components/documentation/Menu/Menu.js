import "./Menu.less";
import React from "react";
import { connect } from "react-redux";
import * as UI from "src/ui";
import { tootleMenu } from "src/actions/documentation";
import router from "../../../../router";
import { classNames as cn } from "src/utils";
import * as PAGES from "../../../constants/pages";

const DocumentationMenu = props => {
  const handleApiMenuClick = (path, item) => () => {
    if (item.key) {
      router.navigate(PAGES.DOCUMENTATION_API_METHOD, {
        key: item.key.replace(/\./g, "-")
      });
    } else {
      router.navigate(PAGES.DOCUMENTATION_API_LIST, { path: path.join("-") });
      props.tootleMenu(path);
    }
  };

  const renderItems = (items, path = []) => {
    return items ? (
      <div className="DocumentationMenu__list">
        {Object.keys(items)
          .filter(i => i !== "opened")
          .map(item => {
            const currentPath = [...path, item];
            return (
              <div className={cn("DocumentationMenu__list__item")}>
                <div
                  className={cn("DocumentationMenu__list__item__title")}
                  onClick={handleApiMenuClick(currentPath, items[item])}
                >
                  {item}
                </div>
                {items[item] &&
                  items[item].path === undefined &&
                  items[item].opened &&
                  renderItems(items[item], currentPath)}
              </div>
            );
          })}
      </div>
    ) : null;
  };

  return (
    <div className="DocumentationMenu">
      {/*<div className="DocumentationMenu__editMode">*/}
      {/*  <span>Edit mode</span>*/}
      {/*  <UI.Switch on={true} />*/}
      {/*</div>*/}
      <div className="DocumentationMenu__list">
        {["Page", "Documentation"].map(item => (
          <div className={cn("DocumentationMenu__list__item")}>
            <div className={cn("DocumentationMenu__list__item__title")}>
              {item}
            </div>
          </div>
        ))}
        <div className={cn("DocumentationMenu__list__item")}>
          <div className={cn("DocumentationMenu__list__item__title")}>API</div>
          {renderItems(props.schema)}
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    items: state.documentation.menu,
    schema: state.documentation.schema
  }),
  {
    tootleMenu
  }
)(DocumentationMenu);
