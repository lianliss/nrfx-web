import './Menu.less';
import React from 'react';
import { connect } from 'react-redux';
import * as UI from 'src/ui';
import { tootleMenu } from 'src/actions/documentation';
import router from "../../../../router";
import { classNames as cn } from "src/utils";
import * as PAGES from "../../../constants/pages";

const DocumentationMenu = props => {
  const renderItems = (items, path = []) => {
    return items ? (
      <div className="DocumentationMenu__list">
        {items.map( item => {
          const currentPath = [...path, item.title];
          return (
            <div className={cn("DocumentationMenu__list__item", {active: item.active})}>
              <div
                onClick={item.items ? () => {
                  props.tootleMenu(currentPath)
                } : () => {
                  // router.navigate(
                  //   PAGES.DOCUMENTATION_API_GROUP_METHOD,{
                  //     group: currentPath[0],
                  //     method: currentPath[1]
                  //   }
                  // );
                }}
                className={cn("DocumentationMenu__list__item__title", { active: item.opened })}
              >{item.title}</div>
              { item.opened && renderItems(item.items, currentPath) }
            </div>
          )
        })}
      </div>
    ) : null;
  };

  return (
    <div className="DocumentationMenu">
      <div className="DocumentationMenu__editMode">
        <span>Edit mode</span>
        <UI.Switch on={true} />
      </div>
      {renderItems(props.items)}
    </div>
  );
}

export default connect(state => ({
  items: state.documentation.menu
}), {
  tootleMenu
})(DocumentationMenu);
