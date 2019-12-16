import { Component, OnInit } from '@angular/core';
import {Stadium} from '../entities';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrls: ['./add-stadium.component.css']
})
export class AddStadiumComponent implements OnInit {

  title = `Adicionar estádio`;

  new_stadium;

  constructor(private formBuilder: FormBuilder) {
    this.new_stadium = this.formBuilder.group({
      name: '',
      address: '',
      number_seats: 1,
      // picture: 1
    });
  }

  ngOnInit() {
  }

  add(form): void {
    console.log(form);
  }

}
