import React from 'react';
import BaseScreen from '../BaseScreen';
import UI from '../../ui/index';
import './UIKit.less';

export default class UIKitScreen extends BaseScreen {
  render() {
    return (
      <div>
        <Section title="Buttons">
          <Line>
            <UI.Button>Button</UI.Button>
            <UI.Button rounded>Button</UI.Button>
            <UI.Button disabled>Button</UI.Button>
            <UI.Button type="secondary">Button</UI.Button>
            <UI.Button type="outline">Button</UI.Button>
            <UI.Button rounded type="outline">Button</UI.Button>
            <UI.Button type="negative">Button</UI.Button>
            <UI.Button type="negative_outline">Button</UI.Button>
          </Line>
          <Line>
            <UI.Button size="small">Button</UI.Button>
            <UI.Button rounded size="small">Button</UI.Button>
            <UI.Button size="small" disabled>Button</UI.Button>
            <UI.Button size="small" type="secondary">Button</UI.Button>
            <UI.Button size="small" type="outline">Button</UI.Button>
            <UI.Button size="small" rounded type="outline">Button</UI.Button>
            <UI.Button size="small" type="negative">Button</UI.Button>
            <UI.Button size="small" type="negative_outline">Button</UI.Button>
          </Line>
        </Section>
        <Section title="Inputs">
          <Line style={{width: 300}}>
            <UI.Input placeholder="Placeholder" />
          </Line>
          <Line style={{width: 300}}>
            <UI.Input placeholder="Placeholder" multiLine />
          </Line>
        </Section>
        <Section title="Search">
          <Line style={{width: 500}}>
            <UI.Search placeholder="Search..." />
          </Line>
          <Line style={{width: 500}}>
            <UI.Search placeholder="Search..." lite />
          </Line>
        </Section>
      </div>
    )
  }
}

function Section(props) {
  return (
    <div className="UIKit__section">
      <div className="UIKit__section__title">{props.title}</div>
      <div className="UIKit__section__cont">{props.children}</div>
    </div>
  )
}

function Line(props) {
  return (
    <div className="UIKit__section__line" style={props.style}>
      {props.children}
    </div>
  )
}