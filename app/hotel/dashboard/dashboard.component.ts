import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from "../shared/base.component";
import { ShareModel } from '../shared/share.model';

import { Roomtype } from '../models/roomtype';
import { Room } from "../models/room";
import { ListModel } from "../shared/list.model";

@Component({
    selector: 'dashboard',
    templateUrl: 'app/hotel/dashboard/dashboard.html',
})
export class DashboardComponent extends BaseComponent {   
    lstRoomtype: Roomtype[];
    inactiveColor: string;
    lstFloor: number[];

    constructor(
        private roomModel: ListModel<Room>,
        private sm: ShareModel,
        protected router: Router
    ) {
        super(router);
        this.lstRoomtype = new Array<Roomtype>();
        this.lstFloor = new Array<number>();
    }

    private getRoomColor(roomtypeId: string): string {
        if (roomtypeId) {
            let data = this.lstRoomtype.filter(x => x._id == roomtypeId);

            if (data && data.length > 0) return data[0].color;
        }

        return this.inactiveColor;
    }

    public getStyle(roomtypeId: string, active: boolean): any {
        let color = active ? this.getRoomColor(roomtypeId) : this.inactiveColor;
        return {'background-color': color, 'border-color': color};
    }

    public getRoomByFloor(floor: number): Room[] {
        if (this.roomModel.lstObj) 
            return this.roomModel.lstObj.filter(x => x.floor == floor && x.active == true)
            .sort((a,b) => { 
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });

        return new Array<Room>();
    }

    ngOnInit(): void {
        super.ngOnInit();
        
        this.roomModel.setCollection("Room");
        this.roomModel.loadData();

        this.sm.getSystemSetting("SO_TANG", (result) => {
            this.lstFloor = this.makeArray(result.value);
        });

        this.sm.getRoomTypeActive((result) => {
            this.lstRoomtype = result;
        });

        this.sm.getSystemSetting("INACTIVE_COLOR", (result) => {
            this.inactiveColor = result.value ? result.value : "#c6c3c3";
        });
    }
}