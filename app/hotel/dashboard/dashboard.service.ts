import { Injectable } from '@angular/core';

import { HttpClient } from '../shared/http.client';
import { BaseService } from '../shared/base.service';
import { ResponseResult } from '../models/responseresults';
import { CheckedIn } from '../models/checkedin';
import { Customer } from '../models/customer';
import SystemConfig from '../shared/config';

@Injectable()
export class DashboardService extends BaseService {
    private _apiGetRoom: string;
}