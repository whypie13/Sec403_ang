import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, ActivatedRoute, Router} from '@angular/router';
import { Dataservice } from './data.service';
import { webService } from './web.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'notes',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, ReactiveFormsModule],
  providers: [Dataservice, webService],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})


export class NotesComponent {

  note_list: any;

  page: number = 1;

  noteForm: any;


  note: any = {
    title: '',
    category: ''
  };


  constructor(public dataService: Dataservice,
              private webService: webService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public authService: AuthService) {}



  ngOnInit() {
    this.noteForm = this.formBuilder.group( {
      title: ["", Validators.required],
      category: ["", Validators.required]
    });


    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }

    this.webService.getNotes(this.page).subscribe( (response) => { this.note_list = response; })
  }


  onSubmit() {
    this.webService.addNote(this.noteForm.value).subscribe(
      (response) => {
        console.log('Note was added successfully:', response);
        this.router.navigate(['/notes']);
      },
      (error) => {
        console.error('Error adding note:', error);
        alert('There was an error adding the note.');
      }
    );
  }


  previousPage() {
    if (this.page > 1) {
        this.page = this.page - 1;
        sessionStorage['page'] = this.page;
        this.webService.getNotes(this.page).subscribe( (response) => { this.note_list = response; })
    }
  }


  nextPage() {
    if (this.page < this.dataService.getLastPageNumber())  {
        this.page = this.page + 1;
        sessionStorage['page'] = this.page;
        this.webService.getNotes(this.page).subscribe( (response) => { this.note_list = response; })
    }
  }


  isInvalid(control: any) {
    return this.noteForm.controls[control].invalid && this.noteForm.controls[control].touched;
  }


  isUntouched() {
    return this.noteForm.controls.title.pristine ||
           this.noteForm.controls.category.pristine;
  }


  isIncomplete() {
    return this.isInvalid('title') ||
           this.isInvalid('category') ||
           this.isUntouched();
  }

 }
