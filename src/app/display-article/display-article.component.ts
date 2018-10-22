import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import { Article } from '../models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs';
import { first } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { CommentsService} from '../services/comments.service';
import { AuthenticationService } from '../services/authentication.service';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {ArticleService} from '../services/article.service';



@Component({
  selector: 'app-display-article',
  templateUrl: './display-article.component.html',
  styleUrls: ['./display-article.component.css']
})
export class DisplayArticleComponent implements OnInit {

 slug:string;
 article:Article ;
 isAuthenticated :Boolean;
 currentUser: User;
 comments: Array<Comment>;



  constructor(private http:HttpClient,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private commentsService:CommentsService,
    private authenticationService :AuthenticationService,
    private articleService:ArticleService,
    private userService: UserService) {
      this.activatedRoute.params.subscribe(params => {
        this.slug  = params['slug'];

    });
  }

  ngOnInit() {
    this.userService.getCurrentUser()
    .pipe(first())
    .subscribe(
      (data:any)=>{
        this.currentUser =data.user ;
      });

    this.check();

    this.getArticle(this.slug).subscribe(data => this.article = data.article);

    this.populate(this.slug);



   }

   canModifyComment(comAuthor:string):boolean{

      if(this.currentUser.username=== comAuthor){
        return true;
      }
      else{
        return false;
      }
   }

   canModifyArticle(author):boolean{
        if(this.currentUser.username === author){
          return true ;
        }
        else{
          return false ;
        }
   }
   populate(slug){
   this.commentsService.getAllComments(slug).subscribe(
    (data :any ) => {this.comments = data.comments,console.log(this.comments)});

   }

  check(){
    if( window.localStorage['jwtToken']){
      this.isAuthenticated =true ;

    }
    else
    this.isAuthenticated = false;
  }


getArticle(slug): Observable<any> {
  return this.http.get(`http://conduit.productionready.io/api/articles/${this.slug}`);


}
postComment(comment:string){
this.commentsService.addComment(comment,this.slug)
            .pipe(first())
            .subscribe(
                data => {
                   window.location.reload();
                });
    }


    deleteComment(id){
      this.commentsService.deleteComment(this.slug,id).subscribe (data => {
        window.location.reload();
     });
    }

    favouriteArticle(slug, favorited){
      console.log(this.article);
      const headersConfig = {
        headers: new HttpHeaders({
          'Authorization' : `Token ${this.currentUser.token}`})
      };

      if(favorited == false){
      this.http.post<any>(`http://conduit.productionready.io/api/articles/${slug}/favorite`,JSON.stringify({}),headersConfig).subscribe((data:any) => {this.article.favorited=true;});
    }
    else if(favorited == true){
      this.http.delete(`http://conduit.productionready.io/api/articles/${slug}/favorite`, headersConfig).subscribe((data:any) => {this.article.favorited=false;});
    }
    }

    followUser(username){
      const headersConfig = {
        headers: new HttpHeaders({
          'Authorization' : `Token ${this.currentUser.token}`})
      };

      this.http.post<any>(`http://conduit.productionready.io/api/profiles/${username}/follow`,JSON.stringify({}),headersConfig).subscribe((data:any) => {this.article.author.following = true;});

    }

    unfollowUser(username){
      const headersConfig = {
        headers: new HttpHeaders({
          'Authorization' : `Token ${this.currentUser.token}`})
      };

      this.http.delete(`http://conduit.productionready.io/api/profiles/${username}/follow`,headersConfig).subscribe((data:any) => {this.article.author.following = false;});
    }

    deleteArticle(){
      this.articleService.deleteArticle(this.slug).subscribe (data => {
       window.location.href="/";
     });
    }

    edit(){
      window.location.href=`/editArticle/${this.slug}`;
    }
  }
