import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from "@angular/core";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']

})

export class ModalComponent implements OnInit{
    @ViewChild('modal') mo:ElementRef;
    @Input() message: string;
    @Input() title: string;
    @Input() isOpen:boolean = false;
    @Output() save = new EventEmitter<void>();
    @Output() close=new EventEmitter<void>();

    ngOnInit(){
    }

    onClose() {
       this.close.emit()
    }

    onSave() {
        this.save.emit();
    }
}