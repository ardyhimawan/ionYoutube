import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlaylistPage } from '../playlist/playlist';
import { Youtube } from '../../providers/youtube/youtube';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ Youtube ]
})
export class HomePage {
  channel = 'UCTYMypBGG2oKCSmr8zwzv5w';
  datas:any;
  nextPageToken:any;
  constructor(public navCtrl: NavController, private yt: Youtube) {
    yt.playlist(this.channel).subscribe(data => {
      this.datas = data.json().items;
      if(data.json().nextPageToken){
        this.nextPageToken = data.json().nextPageToken;
      }
    });
  }

  openPlaylist(id){
    this.navCtrl.push(PlaylistPage, {id:id});
  }

  infiniteScroll(ev){
    if(this.nextPageToken){
      this.yt.playlist_page(this.channel,this.nextPageToken).subscribe(data=>{
        for(let i of data.json().items){
          this.datas.push(i);
        }
        ev.complete();
        if(!data.json().nextPageToken){
          this.nextPageToken = null;
        }else{
          this.nextPageToken = data.json().nextPageToken;
        }
      })
    }else{
      ev.complete();
    }
  }

}
