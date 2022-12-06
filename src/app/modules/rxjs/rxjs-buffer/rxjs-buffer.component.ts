import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rxjs-buffer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-buffer.component.html',
  styleUrls: ['./rxjs-buffer.component.scss']
})
export class RxjsBufferComponent implements OnInit {
  ngOnInit(): void {
    this.initBuffer();
  }

  private initBuffer(): void {
    console.log('XXX');
  }
}
