import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']

})

export class ModalComponent implements OnInit{
    @Input() message: string;
    @Input() title: string;
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