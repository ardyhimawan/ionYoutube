import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { Youtube } from '../../providers/youtube/youtube';

/*
  Generated class for the PlaylistPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/playlist/playlist.html',
  providers: [Youtube]
})
export class PlaylistPage {
  datas:any;
  nextPageToken:any;
  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private sanitizer: DomSanitizationService,
    private yt: Youtube
  ) {
    yt.playlistList(params.data.id).subscribe(data => {
      this.datas = data.json().items;
      if(data.json().nextPageToken){
        this.nextPageToken = data.json().nextPageToken;
      }
    })
  }

  playVideo(videoId){
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+videoId);
  }

  infiniteScrool(ev){
    if(this.nextPageToken){
      this.yt.playlistList_page(this.params.data.id, this.nextPageToken).subscribe(data=>{
        for(let i of data.json().items){
          this.datas.push(i);
        }
        if(!data.json().nextPageToken){
          this.nextPageToken = null;
        }else{
          this.nextPageToken = data.json().nextPageToken;
        }
        ev.complete();
      });
    }else{
      ev.complete();
    }
  }

}
