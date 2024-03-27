import { Component } from '@angular/core';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [],
  templateUrl: './like-button.component.html',
  styleUrl: './like-button.component.css'
})

export class LikeButtonComponent {
  likesCount: number = 100;

  incrementLikes(): void {
    this.likesCount == 100 ? this.likesCount++ : this.likesCount--;
  }

  isLiked(): boolean {
    return this.likesCount == 101;
  }
}