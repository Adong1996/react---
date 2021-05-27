import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),//构建一个初始化状态的编译器+内容
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };
  //获取富文本编译器内容
  getRichText = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }
  //回显富文本编译器内容
  setRichText = (html) => {
    const contentBlock = htmlToDraft(html);
    if(contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState ({
        editorState,
      })
    }
  }
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          //wrapperClassName="demo-wrapper"//可以自定义控制最外层的样式
          //editorClassName="demo-editor"//可以自定义控制编辑区域的样式
          editorStyle={{
            border:'1px solid black',
            paddingLeft:'10px',
            lineHeight:'10px',
            minHeight:'200px'}}
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}