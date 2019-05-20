import React from 'react';
import BaseScreen from '../BaseScreen';
import UI from '../../ui/index';
import './UIKit.less';

export default class UIKitScreen extends BaseScreen {
  constructor(props) {
    super(props);

    this.state = {
      checkbox1: false,
      checkbox2: true,
      radio: 'second',
      switch1: false,
      switch2: true,
    };
  }

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
        <Section title="Checkbox">
          <Line>
            <UI.CheckBox checked={this.state.checkbox1} onChange={() => this.setState({checkbox1: !this.state.checkbox1})}>Checkbox</UI.CheckBox>
          </Line>
          <Line>
            <UI.CheckBox checked={this.state.checkbox2} onChange={() => this.setState({checkbox2: !this.state.checkbox2})}>Checkbox</UI.CheckBox>
          </Line>
          <Line>
            <UI.CheckBox disabled>Checkbox</UI.CheckBox>
          </Line>
          <Line>
            <UI.CheckBox checked disabled>Checkbox</UI.CheckBox>
          </Line>
        </Section>
        <Section title="Radio">
          <Line>
            <UI.RadioGroup selected={this.state.radio} onChange={(radio) => this.setState({radio})}>
              <UI.Radio value="first">Radio</UI.Radio>
              <UI.Radio value="second">Radio</UI.Radio>
              <UI.Radio value="last" disabled>Radio</UI.Radio>
            </UI.RadioGroup>
          </Line>
        </Section>
        <Section title="Switch">
          <Line>
            <UI.Switch on={this.state.switch1} onChange={() => this.setState({switch1: !this.state.switch1})}>Switch</UI.Switch>
          </Line>
          <Line>
            <UI.Switch on={this.state.switch2} onChange={() => this.setState({switch2: !this.state.switch2})}>Switch</UI.Switch>
          </Line>
          <Line>
            <UI.Switch disabled>Switch</UI.Switch>
          </Line>
          <Line>
            <UI.Switch on disabled>Switch</UI.Switch>
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