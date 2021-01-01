import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AdminService } from '../features/admin/admin.service';
import { environment } from 'src/environments/environment';
import { Post } from '../features/post/post';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  constructor(private http: HttpClient, private adminService: AdminService) { }

  getLastPostsByGraphQlOnClient(): Observable<Post[]> {
    const url = 'https://www.instagram.com/graphql/query/?query_hash=472f257a40c653c64c666ce877d59d2b';
    return this.http.get(`${url}&variables={"id": "${environment.userId}", "first": "50"}`).pipe(
      map((response: any) => this.createPosts(response.data.user.edge_owner_to_timeline_media.edges, response.status)),
    );
  }

  private createPosts(items: any, status: string): Post[] {
    const posts: Post[] = [];
    items.forEach((item: { node: any; }) => {
      const post = this.createPost(item.node, status);
      if (post !== undefined) {
        posts.push(post);
      }
    });
    return posts;
  }

  private createPost(item: any, status: string): Post {
    const extractions = this.extractItems(item.edge_media_to_caption.edges[0].node.text);
    const post = {} as Post;
    post.id = item.id;
    post.picture = item.display_url;
    post.video = item.is_video ? item.video_url : null;
    post.likes = item.edge_media_preview_like.count;
    post.date = new Date(item.taken_at_timestamp * 1000);
    if (status === 'ok' || (status === undefined && item !== undefined)) {
      post.responseCode = 'HTTP/1.1 200 OK';
    }
    post.selected = extractions.selected;
    post.photographer = extractions.photographer;
    return post;
  }

  private extractItems(text: string): any {
    const resultP = text.match(/P H O T O\s+@(.+)/);
    const photographer = resultP ? resultP[1] : '';
    const resultS = text.match(/S E L E C T E D\s+@(.+)/);
    const selected = resultS ? resultS[1] : '';
    return photographer && selected ? {
      selected: selected.trim(),
      photographer: photographer.trim(),
    } : null;
  }
}
