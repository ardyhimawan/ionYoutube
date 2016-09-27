import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Youtube provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Youtube {
  key = '';
  constructor(private http: Http) {}

  playlist(channel){
    return this.http.get("https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId="+channel+"&key="+this.key)
  }

  playlist_page(channel, pageToken){
    return this.http.get("https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId="+channel+"&pageToken="+pageToken+"&key="+this.key)
  }

  playlistList(playlistId){
    return this.http.get("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId="+playlistId+"&key="+this.key)
  }

  playlistList_page(playlistId, pageToken){
    return this.http.get("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken="+pageToken+"&playlistId="+playlistId+"&key="+this.key)
  }

}
