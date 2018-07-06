import { Component, ViewChild, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-widget-code-editor",
  templateUrl: "./code-editor.component.html"
})
export class CodeEditorComponent implements OnInit {
  @ViewChild("editor") editor;
  text: string = "";

  ngAfterViewInit() {
    this.editor.setTheme("eclipse");

    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true
    });

    this.editor.getEditor().commands.addCommand({
      name: "showOtherCompletions",
      bindKey: "Ctrl-.",
      exec: function(editor) {}
    });
  }
  constructor() {}

  ngOnInit() {}
}
