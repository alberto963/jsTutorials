import { Component } from '@angular/core';

@Component({
    selector: 'like-button',
    template: `
        <button class='like-button' [class.liked]='isLiked()' (click)='incrementLikes()'>
           {{'Like |'}}
            <span class='likes-counter'>{{likesCount}}</span>
        </button>
    `,
    styles: [`
       
        .likes-counter {
            font-size: 1rem;
            padding: 5px 10px;
        }

        .like-button {
            font-size: 1rem;
            padding: 5px 10px;
            color:  #585858;
        }

        .liked {
            font-weight: bold;
            color: #1565c0;
        }
    `]
})

export class LikeButtonComponent {
    public likesCount: number = 100;

  incrementLikes(): void {
    this.likesCount == 100 ? this.likesCount++ : this.likesCount--;
  }

  isLiked(): boolean {
    return this.likesCount == 101;
  }
}
