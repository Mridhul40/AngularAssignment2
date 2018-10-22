import { Component, OnInit } from '@angular/core';
import {Article} from '../models/article.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from '../services/user.service';
import {User} from '../models/user.model';
import { map, first } from '../../../node_modules/rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': "Token "+localStorage.jwtToken

  })
};

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  articles :any;
  feedArticles: any;
  currentUser: User;
  articleSlug: string = "";
  favArticles = [];
  constructor(private http:HttpClient, private userService: UserService) { }

  ngOnInit() {

    this.userService.getCurrentUser().subscribe(
      (data:any) => {
        this.currentUser = data.user;
        this.getFavoriteArticles();
     }
    );

     this.getArticles().subscribe(
       (data:any)=>this.articles =(Object.values(data.articles)));

     this.getFeedArticles().subscribe(
       (data:any)=> this.feedArticles = (Object.values(data.articles)));
  }

  getArticles(){
        return this.http.get("http://conduit.productionready.io/api/articles");
  }

  getFeedArticles(){

        return this.http.get("http://conduit.productionready.io/api/articles/feed", httpOptions);
  }

  favouriteArticle(slug, favorited){
    const headersConfig = {
      headers: new HttpHeaders({
        'Authorization' : `Token ${this.currentUser.token}`})
    };
    if(favorited == false){
    this.http.post<any>(`http://conduit.productionready.io/api/articles/${slug}/favorite`,JSON.stringify({}),headersConfig).subscribe((data:any) => {this.articles.forEach((item) => {if(item.slug === data.article.slug) item.favorited=true;})});
  }
  else if(favorited == true){
    this.http.delete(`http://conduit.productionready.io/api/articles/${slug}/favorite`,headersConfig).subscribe((data:any) => {this.articles.forEach((item) => {if(item.slug === data.article.slug) item.favorited=false;})});
  }
  }

  favouriteFeedArticle(slug, favorited){
    const headersConfig = {
      headers: new HttpHeaders({
        'Authorization' : `Token ${this.currentUser.token}`})
    };
    if(favorited == false){
    this.http.post<any>(`http://conduit.productionready.io/api/articles/${slug}/favorite`,JSON.stringify({}),headersConfig).subscribe((data:any) => {this.feedArticles.forEach((item) => {if(item.slug === data.article.slug) item.favorited=true;})});
  }
  else if(favorited == true){
    this.http.delete(`http://conduit.productionready.io/api/articles/${slug}/favorite`,headersConfig).subscribe((data:any) => {this.feedArticles.forEach((item) => {if(item.slug === data.article.slug) item.favorited=false;})});
  }
  }

  getFavoriteArticles(){
    this.http.get(`http://conduit.productionready.io/api/articles?favorited=${this.currentUser.username}`).subscribe((data:any) => console.log(data));
  }



}
