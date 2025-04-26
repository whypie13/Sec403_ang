import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { Dataservice } from './data.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { webService } from './web.service';
import { UserService } from './user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'note',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  providers: [Dataservice, webService, UserService],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class noteComponent implements OnInit {

  note_list: any;
  notesubForm: any;
  notesub_list: any;
  noteID: any;
  notesubID: any;
  username: string = '';

  constructor(
    public dataService: Dataservice,
    private webService: webService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    public UserService: UserService
  ) {}

  ngOnInit() {
    this.notesubForm = this.formBuilder.group({
      username: ['', Validators.required],
      comment: ['', Validators.required],
      riskscore: ['', Validators.required],
      source: ['', Validators.required]
    });


    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.username) {
          this.username = decoded.username;
          this.notesubForm.patchValue({ username: this.username });
        }
      } catch (err) {
        console.error('Invalid token', err);
      }
    }


    const noteId = this.route.snapshot.paramMap.get('id');
    this.noteID = noteId;

    this.webService.getNote(noteId).subscribe((response) => {
      this.note_list = [response];
    });

    this.webService.getNotesubs(noteId).subscribe((response) => {
      this.notesub_list = response || [];
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

  deleteNotesub(notesubID: string): void {
    if (notesubID && confirm('Are you sure you want to delete this note?')) {
      this.webService.deleteNotesub(this.noteID, notesubID).subscribe(
        () => {
          console.log('Note deleted successfully', notesubID, this.noteID);
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
      this.notesubForm.value
    ).subscribe((response) => {
      this.notesubForm.reset();
      this.webService.getNotesubs(this.route.snapshot.paramMap.get('id'))
        .subscribe((response) => {
          this.notesub_list = response;
        });
    });
  }

  isInvalid(control: any) {
    return this.notesubForm.controls[control].invalid && this.notesubForm.controls[control].touched;
  }

  isUntouched() {
    return this.notesubForm.controls.username.pristine ||
      this.notesubForm.controls.comment.pristine ||
      this.notesubForm.controls.riskscore.pristine ||
      this.notesubForm.controls.source.pristine;
  }

  isIncomplete() {
    return this.isInvalid('username') ||
      this.isInvalid('comment') ||
      this.isInvalid('riskscore') ||
      this.isInvalid('source') ||
      this.isUntouched();
  }
}
