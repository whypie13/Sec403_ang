import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { Dataservice } from './data.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { webService } from './web.service';


@Component({
  selector: 'note',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  providers: [Dataservice, webService],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})


export class noteComponent {

  note_list: any;

  notesubForm: any;

  notesub_list: any;

  noteID: any;

  notesubID: any;


  constructor( public dataService: Dataservice,
               private webService: webService,
               private route: ActivatedRoute,
               private formBuilder: FormBuilder,
               public authService: AuthService,
               private router: Router) {}



  ngOnInit() {
    this.notesubForm = this.formBuilder.group( {
      username: ["", Validators.required],
      comment: ["", Validators.required],
      riskscore: ["", Validators.required],
      source: ["", Validators.required]
    });
    this.noteID = this.route.snapshot.paramMap.get('id');
    this.webService.getNote(this.route.snapshot.paramMap.get('id'))
    .subscribe( (response) => {
      this.note_list = [response];
    });

    this.notesubID = this.webService.getNotesubs(this.route.snapshot.paramMap.get('id'))
    this.webService.getNotesubs(this.route.snapshot.paramMap.get('id'))
    .subscribe( (response) => {
      this.notesub_list = response;
    });
  }


  deleteNote(): void {
    if (this.noteID && confirm('Are you sure you want to delete this note?')) {
      this.webService.deleteNote(this.noteID).subscribe(
        () => {
          console.log('Note deleted successfully');
          this.router.navigate(['/notes']);
        },
        (error) => {
          console.error('Error deleting note:', error);
          alert('There was an error deleting the note.');
        }
      );
    }
  }


  deleteNotesub(notesubID:string): void {
    if (this.notesubID && confirm('Are you sure you want to delete this note?')) {
      this.webService.deleteNotesub(this.noteID, notesubID).subscribe(
        () => {
          console.log('Note deleted successfully');
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting note:', error);
          alert('There was an error deleting the note.');
        }
      );
    }
  }


  onSubmit() {
    this.webService.postNotesub(
        this.route.snapshot.paramMap.get('id'),
        this.notesubForm.value)
        .subscribe( (response) => {
          this.notesubForm.reset();
          this.webService.getNotesubs(this.route.snapshot.paramMap.get('id'))
            .subscribe( (response) => {
              this.notesub_list = response;
          });
        });
  }


  isInvalid(control: any) {
    return this.notesubForm.controls[control].invalid && this.notesubForm.controls[control].touched;
  }


  isUntouched() {
    return this.notesubForm.controls.username.pristine ||
           this.notesubForm.controls.category.pristine ||
           this.notesubForm.controls.riskscore.pristine ||
           this.notesubForm.controls.source.pristine;
  }


  isIncomplete() {
    return this.isInvalid('username') ||
           this.isInvalid('category') ||
           this.isInvalid('riskscore') ||
           this.isInvalid('source') ||
           this.isUntouched();
  }
}
