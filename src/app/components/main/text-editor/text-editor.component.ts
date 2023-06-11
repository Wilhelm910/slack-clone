import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/app/core/models/channel.class';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }


  channel = new Channel();
  channelId = '';

  editorForm: FormGroup;
  editorStyle = {
    height: '200px',
  }

  config = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['emoji'],
      ['link']
    ]
  }

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
    this.getChannelId();
  }

  getChannelId() {
    this.route.params.subscribe(params => {
      this.channelId = params['id'];
    })
  }



  onSubmit() {
    console.log(this.editorForm.get('editor').value)
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update(this.channel.toJson())
      .then((result: any) => {
        console.log(result)
      })
  }




  maxLength(event) {
    console.log(event.editor.getLength())
    if (event.editor.getLength() > 100) {
      event.editor.deleteText(10, event.editor.getLength())
    }
  }

}
