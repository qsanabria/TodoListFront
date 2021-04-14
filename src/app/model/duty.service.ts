import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Duty } from "./duty.model";

@Injectable()
export class DutyService {
    duty: Duty;
    listDutties: Duty[];
    readonly baseURL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    postDuty(duty: Duty) {
        return this.http.post(this.baseURL + "/duty", duty);
    }

    getDutyList() {
        return this.http.get(this.baseURL + '/allDutties');
    }

    putDuty(duty: Duty) {
        return this.http.put(this.baseURL + '/duty' + `/${duty._id}`, duty);
    }

    deleteDuty(_id: string) {
        return this.http.delete(this.baseURL + '/duty' + `/${_id}`);
    }
}
