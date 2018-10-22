import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ArticleService} from '../services/article.service';
import { Article } from '../models/article.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
 slug:string ;
 article:Article;
 articleForm:FormGroup ;
 submitted:boolean ; 
 loading:boolean ; 
  constructor(private activatedRoute:ActivatedRoute,
    private router :Router,
  private articleService:ArticleService,
  private formbuilder: FormBuilder) {
    this.activatedRoute.params.subscribe(params => {
      this.slug  = params['slug'];
    });
   }

  ngOnInit() {
    this.articleForm = this.formbuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['']
    });
    this.articleService.getArticle(this.slug).subscribe(data => this.article = data.article);
  }

  get f() {

    return this.articleForm.controls; }
    onSubmit() {
      this.submitted = true;
      this.loading = true;
      this.articleService.editArticle(this.f.title.value, this.f.description.value,
        this.f.content.value,this.slug)
        .pipe(first())
        .subscribe(
          data => {
            console.log('done');
            this.router.navigateByUrl('/');
          },
        );
    }

}
