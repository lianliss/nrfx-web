import React from 'react';
import { useRoute } from 'react-router5';
import router from 'src/router';

import SidebarItem from '../SidebarItem/SidebarItem';
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import ComingSoonItem from '../ComingSoonItem/ComingSoonItem';

// Utils
import { getLang, classNames as cn } from 'utils';
import items from '../../constants/items';
import { Web3Context } from 'src/services/web3Provider';
import { pageIsFine } from 'src/index/containers/dapp/DappCabinet/utils/pageUtils';

function Items({ routeName, chainId }) {
  // Check - current page is exists or empty in pages.
  // @params pages (array or string). Page constant from PAGES.
  const isPage = (pages) => {
    if (Array.isArray(pages)) {
      for (let page of pages) {
        if (page === routeName) {
          return true;
        }
      }
    } else {
      return routeName === pages;
    }

    return false;
  };

  // Check a route of item link.
  const routeIsDisabled = (type, route) =>
    type === 'route' && !pageIsFine(route, chainId);

  const ChildItem = ({ title, link, type, disabled, active }) => {
    const liProps = {
      className: cn({
        active: isPage(active),
        disabled: disabled || routeIsDisabled(type, link),
      }),
    };

    if (type === 'route' && link) {
      liProps.onClick = () => router.navigate(link);
    }

    if (type === 'comingSoon') {
      return <ComingSoonItem text={getLang(title)} />;
    }

    if (type === 'href') {
      return (
        <li {...liProps}>
          <a href={link} target="_blank">
            {getLang(title)}
          </a>
        </li>
      );
    }

    return <li {...liProps}>{getLang(title)}</li>;
  };

  const Item = ({ title, icon, link, disabled, active, type }) => {
    const sidebarItemProps = {
      title: getLang(title),
      active: isPage(active),
      icon,
      disabled: disabled || routeIsDisabled(type, link),
    };

    if (type === 'href') {
      sidebarItemProps.href = link;
    }

    if (type === 'route') {
      sidebarItemProps.onClick = () => router.navigate(link);
    }

    return <SidebarItem {...sidebarItemProps} />;
  };

  const ParentItem = ({ title, icon, items, active }) => (
    <SidebarItem title={getLang(title)} icon={icon} active={active}>
      <ul>
        {items.map((childItem, key) => (
          <ChildItem {...childItem} key={key} />
        ))}
      </ul>
    </SidebarItem>
  );

  const Column = ({ items }) => (
    <CabinetBlock>
      <ul>
        {items.map((item, key) => {
          if (item.type === 'parent') {
            return <ParentItem {...item} key={key} />;
          }

          return <Item {...item} key={key} />;
        })}
      </ul>
    </CabinetBlock>
  );

  return (
    <>
      {items.map((items, key) => (
        <Column items={items} key={key} />
      ))}
    </>
  );
}

const ItemsWrapper = (props) => {
  const { network } = React.useContext(Web3Context);
  const { route } = useRoute();
  const { chainId } = network;
  const routeName = route.name;

  const memoizedItems = React.useMemo(
    () => <Items {...props} chainId={chainId} routeName={routeName} />,
    [routeName, chainId]
  );

  return memoizedItems;
};

export default React.memo(ItemsWrapper);
