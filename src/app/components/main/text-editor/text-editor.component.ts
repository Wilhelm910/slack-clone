import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  editorForm: FormGroup

  editorStyle = {
    height: '200px',
  }

  config = {
    toolbar: [
      ['bold','italic','underline'],
      ['code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['emoji'],
      ['link']
    ]
  }

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }

  onSubmit() {
    console.log(this.editorForm.get('editor').value)
  }

  maxLength(event) {
    console.log(event.editor.getLength())
    if (event.editor.getLength() > 100) {
      event.editor.deleteText(10, event.editor.getLength())
    }
  }

}
