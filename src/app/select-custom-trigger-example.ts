import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface StateGroup {
  letter: string;
  checked: boolean;
  names: string[];
}

/** @title Select with custom trigger text */
@Component({
  selector: 'select-custom-trigger-example',
  templateUrl: 'select-custom-trigger-example.html',
  styleUrls: ['select-custom-trigger-example.css'],
})
export class SelectCustomTriggerExample {
  constructor(private _formBuilder: FormBuilder) {}

  stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });
  toppings = new FormControl();
  isExpandCategory: boolean[] = [];
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  stateRecord: any = [];
  states = new FormControl();

  expandDocumentTypes(group: any) {
    console.log('expanding dropdown', group);
    this.isExpandCategory[group.letter] = !this.isExpandCategory[group.letter];
    // expand only selected parent dropdown category with that childs
  }

  toggleSelection(event: any, name: any, group: any) {
    debugger;
    console.log('toggleSelection', name, event.checked, group);
    if (event.checked) {
      console.log('stastateRecordtelist', this.stateRecord);
      this.stateRecord.push(name);
      this.states.setValue(this.stateRecord);
      console.log('toggleselection ', this.states.value);
    } else {
      this.stateRecord = this.stateRecord.filter((x: any) => x !== name);
      console.log('else toggleselection', name, group, this.states.value);
      this.states.setValue(this.states.value.filter((x: any) => x !== name));
      console.log('after filter ', this.states.value);
      //this.states.setValue([]);
    }
  }

  toggleParent(event: any, group: any) {
    debugger;
    group.checked = event.checked;
    console.log(
      'event',
      event.checked,
      'group',
      group,
      'states value',
      this.states.value
    );
    let states = this.states.value;
    states = states ? states : [];
    if (event.checked) {
      states.push(...group.names);
    } else {
      console.log('else', states);
      group.names.forEach((x: string) => {
        if (states.indexOf(x) > -1) {
          states.splice(states.indexOf(x), 1);
        }
      });
    }
    this.states.setValue(states);
    console.log('statesvalue', this.states.value);
    if (!event.checked) {
      this.states.setValue(
        this.states.value.filter((x: any) => !x.includes(group.names))
      );
      //this.states.setValue([]);
    }
    this.stateRecord = this.states.value;
    console.log('final statesvalue', this.states.value);
  }

  stateList: StateGroup[] = [
    {
      letter: 'A',
      checked: false,
      names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas'],
    },
    {
      letter: 'C',
      checked: false,
      names: ['California', 'Colorado', 'Connecticut'],
    },
    {
      letter: 'D',
      checked: false,
      names: ['Delaware'],
    },
    {
      letter: 'F',
      checked: false,
      names: ['Florida'],
    },
  ];

  openOrClosePanel(event: any, trigger: any) {
    console.log(event, trigger);
    event.stopPropagation();
    if (trigger.panelOpen) {
      trigger.closePanel();
    } else {
      trigger.openPanel();
    }
  }
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
