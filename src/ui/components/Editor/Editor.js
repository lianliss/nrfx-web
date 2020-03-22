import "./Editor.less";
import React from "react";
import {
  Editor as DraftEditor,
  EditorState,
  RichUtils,
  convertFromHTML,
  CompositeDecorator,
  convertFromRaw,
  ContentState,
  convertToRaw
} from "draft-js";
import EditorTooltip from "../EditorTooltip/EditorTooltip";
import { Button, Code, Input } from "../../index";
import { isJson } from "src/utils";
import { classNames as cn } from "../../utils/index";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: this.prepareState(this.props.content),
      hide: true,
      focus: false,
      rect: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0
      }
    };

    // console.log(prepareState(this.props.content));
    // debugger;

    this.onChange = editorState => this.setState({ editorState });
    this.update = this.update.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  prepareState = content => {
    if (content) {
      if (isJson(content)) {
        return EditorState.createWithContent(
          convertFromRaw(JSON.parse(this.props.content))
        );
      } else {
        const blocksFromHTML = convertFromHTML(content);
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );

        // const decorator = new CompositeDecorator([]);
        return EditorState.createWithContent(state);
      }
    } else {
      return EditorState.createEmpty();
    }
  };

  blockRendererFn = contentBlock => {
    const type = contentBlock.getType();
    const text = contentBlock.getText();

    if (type === "code") {
      return {
        component: props => <Code>{props.blockProps.text}</Code>,
        editable: false,
        props: {
          text
        }
      };
    }
  };

  update() {
    let selection = document.getSelection();
    this.range = selection && selection.rangeCount && selection.getRangeAt(0);
    this.updateRect(this.range.startOffset === this.range.endOffset);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
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
        left: currentRect.left - editorRect.left
      };
    }

    this.setState({ rect, hide: !!hide });
    // console.log(this.state.rect);
  }

  handleChange = editorState => {
    let selection = editorState.getSelection();

    this.update();
    this.setState({ focus: selection.hasFocus });

    this.onChange(editorState);
    this.props.onChange &&
      this.props.onChange(
        JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      );
  };

  render() {
    const style = {
      transform: `translate(calc(-50% + ${this.state.rect.left +
        this.state.rect.width / 2}px), calc(-100% + ${this.state.rect.top -
        10}px))`
    };

    return (
      <div
        className={cn("Editor", {
          border: this.props.border,
          focus: this.state.focus
        })}
        ref="editor"
      >
        <div className="Editor__wrapper">
          <DraftEditor
            blockRendererFn={this.blockRendererFn}
            handleKeyCommand={this.handleKeyCommand}
            editorState={this.state.editorState}
            onChange={this.handleChange}
          />
          <EditorTooltip
            onChange={button => {
              button.block &&
                this.onChange(
                  RichUtils.toggleBlockType(
                    this.state.editorState,
                    button.block
                  )
                );
              button.style &&
                this.onChange(
                  RichUtils.toggleInlineStyle(
                    this.state.editorState,
                    button.style
                  )
                );
              this.setState({ hide: true });
            }}
            buttons={[
              {
                title: "H1",
                block: "header-one"
              },
              {
                title: "H2",
                block: "header-two"
              },
              {
                title: "“quote”",
                block: "blockquote"
              },
              {
                title: "<code />",
                block: "code"
              },
              {
                title: "Bold",
                style: "BOLD"
              },
              {
                title: "Italic",
                style: "ITALIC"
              },
              {
                title: "Underline",
                style: "UNDERLINE"
              }
              // {
              //   title: "Monospace",
              //   style: "MONOSPACE"
              // }
            ]}
            visible={!this.state.hide}
            style={style}
          />
          {/*<div className="Editor__shape" style={{ ...this.state.rect }} />*/}
        </div>
      </div>
    );
  }
}
