import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': "Token "+localStorage.jwtToken
   
  })
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  addArticle(title , description , content , tag){
    return this.http.post('http://conduit.productionready.io/api/articles',
    {"article":
       {"title":title,
         "description":description,
         "body": content,
         "tagList":tag
       }
    },httpOptions
);
  }

  editArticle(title , description , content , slug){
    return this.http.put(`http://conduit.productionready.io/api/articles/${slug}`,
    {"article":
       {"title":title,
         "description":description,
         "body": content,
         
       }
    },httpOptions
);
  }

  deleteArticle(slug){
       return this.http.delete(`http://conduit.productionready.io/api/articles/${slug}`,httpOptions);
  }

  getArticle(slug): Observable<any> {
    return this.http.get(`http://conduit.productionready.io/api/articles/${slug}`);
  }
}
