
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ArticleService} from '../services/article.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  articleForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute, private formbuilder: FormBuilder,private articleService:ArticleService,
     private router: Router) { }

  ngOnInit() {
    this.articleForm = this.formbuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['']
    });
  }

  get f() {

    return this.articleForm.controls; }

  onSubmit() {
    this.submitted = true;

    // if (this.articleForm.invalid) {
    //   return;
    // }

    this.loading = true;
    this.articleService.addArticle(this.f.title.value, this.f.description.value,
      this.f.content.value, this.f.tags.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('done');
          this.router.navigateByUrl('/');
        },
      );
  }

}


