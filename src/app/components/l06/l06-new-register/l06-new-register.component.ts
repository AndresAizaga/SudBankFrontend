import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-l06-new-register',
  standalone: true,
  imports: [],
  templateUrl: './l06-new-register.component.html',
  styleUrl: './l06-new-register.component.css'
})
export class L06NewRegisterComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  showModalForm = false;


  ngOnInit(): void {
    // this.loadCatalogs();
    // this.loadResume();
  }



  onModalClosed(): void {
    this.showModalForm = false;
    // this.loadResume();
  }

}
