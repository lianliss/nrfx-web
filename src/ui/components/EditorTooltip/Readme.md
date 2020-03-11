```js
<EditorTooltip
  onChange={console.log}
  visible={true}
  buttons={[
  {
    button: 'H1',
    block: 'header-one',
  }, {
    button: 'H2',
    block: 'header-two',
  }, {
    button: 'H2',
    block: 'header-two',
  }, {
    button: '“quote”',
    block: 'blockquote'
  }, {
    button: '<code />',
    style: 'code-block',
  }, {
    button: 'Bold',
    style: 'BOLD'
  }, {
    button: 'Italic',
    style: 'ITALIC'
  }, {
    button: "Underline",
    style: "UNDERLINE"
  }, {
    button: "Monospace",
    style: "MONOSPACE"
  }
]} />
```
