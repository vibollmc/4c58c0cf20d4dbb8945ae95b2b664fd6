import {Component, OnInit} from "@angular/core";

import { RoomtypeModel } from "./roomtype.model";

@Component({
    selector: 'roomtype',
    templateUrl: 'app/hotel/roomtype/roomtype.html'
})

export class RoomtypeComponent implements OnInit {

    constructor(
        public vm : RoomtypeModel
    ) {}

    ngOnInit(): void {
        this.vm.loadData();
    }
}