const { response } = require('express');
const Evento = require('../models/eventModel');


const getEvents = async ( req, res = response ) => {
    //Get all data from DB
    const events = await Evento.find()
                                .populate('user', 'name');

    res.status(200).json({
        ok: true,
        events
    });
}

const createEvents = async( req, res = response ) => {

    const event = new Evento(req.body);

    try {
        //take uid from req.
        event.user = req.uid;
        //Save on BD
       const eventDb = await event.save();
        res.json({
            ok: true,
            event: eventDb
        })
        
    } catch (err) {
        console.log( err );
        res.status(500).json({
            ok: false,
            msg: 'Contact to admin.'
        });

    }

}

const updateEvents = async ( req, res = response ) => {

    //get id from url
    const eventId = req.params.id;

    try {

        const event = await Evento.findById( eventId );

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist for that id'
            })
        }

        if ( event.user.toString() !== req.uid ){
            return res.status(401).json({
                ok: false,
                msg: 'You do not have privileges to edit the event'
            })
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }
        //Find and update by id and show the changes with the params new = true.
        const updatedEvent = await Evento.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.json({
            ok: true,
            event: updatedEvent
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact to admin.'
        })
    }

}

const deleteEvents = async ( req, res = response ) => {
    //get id from url
    const eventId = req.params.id;

    try {

        const event = await Evento.findById( eventId );

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist for that id'
            })
        }

        if ( event.user.toString() !== req.uid ){
            return res.status(401).json({
                ok: false,
                msg: 'You do not have privileges to eliminate the event'
            })
        }

        //Find and update by id and show the changes with the params new = true.
        const deletedEvent = await Evento.findByIdAndDelete( eventId );

        res.json({
            ok: true,
            msg: 'Event deleted successfully.'
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact to admin.'
        })
    }
}

module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}