import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlightService } from '../services/flight.service';
import { Flight } from '../entities/flight';
import { FormatPipe } from '../pipes/format.pipe';

@Component({
    selector: 'flight-card',
    template: require('./flight-card.component.html'),
    pipes: [FormatPipe]
})
export class FlightCardComponent {

    @Input() item: Flight;
    @Input() selectedItem: Flight;
    @Output() selectedItemChange = new EventEmitter();

    constructor(private flightService: FlightService) {
    }

    select() {
        this.selectedItemChange.emit(/*$event=*/this.item);
    }

}