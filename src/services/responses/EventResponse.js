import ProgressBarTickets from "../../components/ProgressBarTickets";
import {Text, View} from "react-native";
import React from "react";

export default class EventResponse {
    constructor(response) {
        this._response = response
    }

    timeToString(aTime) {
        let hours = aTime.getHours();
        let minutes = aTime.getMinutes();
    
        if (hours < 10) {
            hours = `0${hours}`
        }
    
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
    
        return `${hours}:${minutes}`
    }

    _parseAgendaEvents(agendaEvent, index) {
        return {
            id: 'agendaEvent' + index,
            name: agendaEvent.title,
            start: this.timeToString(new Date(agendaEvent.start)),
            end: this.timeToString(new Date(agendaEvent.end)),
        }
    }

    progress() {
        return this._response.ticket_percentage;
    }

    remainingTicketsToRead() {
        return this._response.remaining_tickets_to_read;
    }

    ticketFraction() {
        return this._response.ticket_fraction;
    }

    _parseEvent() {
        const event = this._response;

        console.log(event);

        return {
            id: event.id,
            name: event.name,
            address: event.address,
            description: event.description,
            hour: event.time + "hs",
            date: event.date,
            labels:  event.types_names,
            imagesUri: event.pictures,
            ticketPercentage: event.ticket_percentage,
            ticketFraction: event.ticket_fraction,
            ticketToRead: event.ticket_to_read,
            organizerName: event.organizerName,
            agendaEntries: event.agenda.map((e, i) => {
                return this._parseAgendaEvents(e, i)
            })
        }
    }

    event() {
        return this._parseEvent();
    }
}