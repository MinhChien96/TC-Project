import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeClock' })
export class TimeClock implements PipeTransform {
    transform(data: number): string {
        let hienthi: string = ('0' + Math.floor(data / 60)).substr(-2) + ':'
            + ('0' + data % 60).substr(-2);
        return hienthi;
    }
}
