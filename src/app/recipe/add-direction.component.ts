import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'add-direction',
    templateUrl: 'add-direction.component.html'
})
export class AddDirectionComponent {
    @Input('group')
    public directionForm: FormGroup;
}