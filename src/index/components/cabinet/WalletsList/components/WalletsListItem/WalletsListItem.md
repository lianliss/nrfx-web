<WalletsListItem
  icon={
    <img /> || <svg />
  }
  startTexts={['little-left-text', 'title-text']}
  endTexts={['little-right-text', 'medium-right-text']}
/>

<WalletsListItem
  icon={
    <img /> || <svg />
  }
  startTexts={['little-left-text', 'title-text']}
  // endTexts vs controls, Controls have a priority.
  controls={<div>your elements</div>} // Instead endTexts
/>

WalletListItem is <li> element. And this need <ul> container.
