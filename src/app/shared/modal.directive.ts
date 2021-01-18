import {  Directive, HostBinding, HostListener ,ElementRef} from "@angular/core";

@Directive({
    selector:'[appModal]'
})

export class DropdownDirective{
@HostBinding('class.show') isOpen = false;

@HostListener('document:click',['$event']) toggleOpen(event:Event){
    this.isOpen = this.elRef.nativeElement.contains(event.target)? !this.isOpen:false
}
constructor(private elRef: ElementRef) {}
}

