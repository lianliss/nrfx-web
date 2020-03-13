import './Editor.less';
import React from 'react';
import {Editor as DraftEditor, EditorState, RichUtils,  } from 'draft-js';
import EditorTooltip from '../EditorTooltip/EditorTooltip';
import Button from '../Button/Button';


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      hide: true,
      rect: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0
      }
    };
    this.onChange = editorState => this.setState({editorState});
    this.update = this.update.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  blockRendererFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'button') {
      return {
        component: Button,
        props: {
          foo: 'bar',
        },
      };
    }
    // if (type === 'button') {
    //   return {
    //     component: ,
    //     props: {
    //       foo: 'bar',
    //     },
    //   };
    // }
  };

  update(hide) {
    let selection = document.getSelection();
    this.range = selection && selection.rangeCount && selection.getRangeAt(0);
    this.updateRect(hide);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  updateRect(hide) {
    let rect = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0
    };

    if (!hide && this.range) {
      const currentRect = this.range.getBoundingClientRect();
      const editorRect = this.refs.editor.getBoundingClientRect();

      rect = {
        ...rect,
        width: currentRect.width,
        height: currentRect.height,
        top: currentRect.top - editorRect.top,
        left: currentRect.left - editorRect.left,
      }
    }

    this.setState({rect, hide});
    console.log(this.state.rect);
  }

  handleChange = (editorState) => {
    let selection = editorState.getSelection();
    const anchorKey = selection.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(anchorKey);

    const start = selection.getStartOffset();
    const end = selection.getEndOffset();
    const selectedText = currentBlock.getText().slice(start, end);

    if (selectedText) {
      this.update();
    } else {
      this.update(true);
    }
    this.onChange(editorState);
  }

  render() {
    const style = {
      transform: `translate(calc(-50% + ${this.state.rect.left + (this.state.rect.width / 2)}px), calc(-100% + ${this.state.rect.top - 10}px))`
    };

    return (
      <div className="Editor" ref="editor">
        <DraftEditor
          blockRendererFn={this.blockRendererFn}
          onBlur={() => this.setState({ hide: true })}
          handleKeyCommand={this.handleKeyCommand}
          editorState={this.state.editorState}
          onChange={this.handleChange}
        />
        <EditorTooltip
          onChange={button => {
            button.block && this.onChange(RichUtils.toggleBlockType(this.state.editorState, button.block));
            button.style && this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, button.style));
            this.setState({ hide: true });
          }}
          buttons={[
            {
              title: 'H1',
              block: 'header-one',
            }, {
              title: 'H2',
              block: 'header-two',
            }, {
              title: '“quote”',
              block: 'blockquote'
            }, {
              title: '<code />',
              style: 'code-block',
            }, {
              title: 'Bold',
              style: 'BOLD'
            }, {
              title: 'Italic',
              style: 'ITALIC'
            }, {
              title: "Underline",
              style: "UNDERLINE"
            }
            // {
            //   title: "Monospace",
            //   style: "MONOSPACE"
            // }
          ]}
          visible={!this.state.hide} style={style} />
        {/*<div className="Editor__shape" style={{ ...this.state.rect }} />*/}
      </div>
    );
  }
}