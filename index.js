const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const bodyParser = require('body-parser')
const app = express()
app.set('view engine', 'ejs')


MongoClient.connect('mongodb+srv://rashdanrazak:dan641021@cluster0.1m89j.mongodb.net/create-order?retryWrites=true&w=majority',{ useUnifiedTopology:true }, (err, client) => {
    if (err) return console.error(err)
    const db = client.db('create-order')
    const hotels = db.collection('hotels')
    const rooms = db.collection('rooms')
    const booking = db.collection('booking')
    
    app.get('/', async (req, res) => {
        let books = null
        let hotel = null
        let room = null
        try {
            books = await booking.find().toArray()
            hotel = await hotels.find().toArray()
            room  = await rooms.find().toArray()
               console.log(hotel)
        } catch (error) {
            console.log(err)
        } finally {
            res.render('index.ejs', {booking:books, hotels:hotel, rooms:room})
        }
    })

    app.get('/rooms', async (req, res) => {
        let room = null
        try {
            room  = await rooms.find().toArray()
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({result: room})
        }

    })
    
    app.get('/room/:id', async (req, res) => {
        let roomId = req.params.id
        let ifroom = null
        try {
            ifroom  = await rooms.findOne({"_id":ObjectId(roomId)} )
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({result: ifroom})
        }
    })

    app.delete('/room/:id', async (req, res) => {
        let roomId = req.params.id
        try {
            await rooms.deleteOne({"_id":ObjectId(roomId)} )
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({msg: 'Room Deleted'})
        }
    })

    app.post('/room', async (req, res) => {

        let hotelId     = req.body.hotelId
        let name        = req.body.name
        let type        = req.body.type
        let status      = req.body.statusRoom
        let hotelName   = req.body.hotelName

        dateCreated = new Date()

        let param = {
            name,
            hotelId,
            type,
            status,
            hotelName,
            dateCreated
        }

        try {
            await rooms.insertOne(param)
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({msg: 'Room Created'})
        }
    })

    app.put('/room', async (req, res) => {

        let roomId      = req.body.roomId
        let hotelId     = req.body.hotelId
        let name        = req.body.name
        let type        = req.body.type
        let status      = req.body.statusRoom
        let hotelName   = req.body.hotelName

        dateUpdated = new Date()

        let param = {
            name,
            hotelId,
            type,
            status,
            hotelName,
            dateUpdated
        }
        console.log(param)
        try {
            await rooms.findOneAndUpdate({_id: ObjectId(roomId)},
            {
                $set:param},
            {
              upsert: true
            })
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({msg: 'Room Updated'})
        }
    })

    app.get('/hotels', async (req, res) => {
        let hotel = null
        try {
            hotel = await hotels.find().toArray()
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({result: hotel})
        }

    })
    
    app.get('/hotel/:id', async (req, res) => {
        let hotelId = req.params.id
        let ifhotel = null
        try {
            ifhotel  = await hotels.find(ObjectId(hotelId) )
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({result: ifhotel})
        }

    })

    app.delete('/hotel/:id', async (req, res) => {
        let hotelId = req.params.id
        try {
            await hotels.deleteOne({"_id":ObjectId(hotelId)} )
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({msg: 'Hotel Deleted'})
        }
    })

    app.post('/hotel', async (req, res) => {
        let name    = req.body.name
        let city    = req.body.city
        let state   = req.body.state

        let dateCreated = new Date()

        let param = {
            name,
            city,
            state,
            dateCreated
        }
        try {
            await hotels.insertOne(param)
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({msg: 'Hotel Created'})
        }
    })

    app.put('/hotel', async (req, res) => {

        let hotelId = req.body.hotelId
        let name    = req.body.name
        let city    = req.body.city
        let state   = req.body.state
        
        let dateUpdated = new Date()

        let param = {
            name,
            city,
            state,
            dateUpdated
        }
        console.log(param)
        try {
            await hotels.findOneAndUpdate({_id: ObjectId(hotelId)},
            {
                $set:param
            },
            {
              upsert: true
            })
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({msg: 'Hotel Updated'})
        }
    })

    app.get('/bookings', async (req, res) => {
        let books = null
        try {
            books = await booking.find().toArray()
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({result: books})
        }
    })
    
    app.get('/booking/:id', async (req, res) => {
        let bookingId = req.params.id
        let ifbooking = null
        try {
            ifbooking  = await bookings.find(ObjectId(bookingId) )
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({result: ifbooking})
        }
    })

    app.delete('/booking/:id', async (req, res) => {
        let bookingId = req.params.id
        try {
            await bookings.deleteOne({"_id":ObjectId(bookingId)} )
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({msg: 'Booking Deleted'})
        }
    })

    app.post('/booking', async (req, res) =>{

        let data    = req.body
        let hotelId = data.hotelId
        let roomId  = data.roomId
        let name    = data.name
        let email   = data.email
        let phone   = data.phone
        let ic      = data.ic
        let guest   = data.guest
        let amount  = data.amount
        let dateIn  = data.dateIn
        let dateOut = data.dateOut
        let remarks = data.remarks

        hotelId                 = hotelId.replace(/\s/g, '');
        email                   = email.replace(/\s/g, '');
        roomId                  = roomId.replace(/\s/g, '');
        phone                   = phone.replace(/\s/g, '');
        ic                      = ic.replace(/\s/g, '');
        amount                  = amount.replace(/\s/g, '');
        guest                   = guest.replace(/\s/g, '');
        name                    = name.trim();
        dateIn                  = new Date( dateIn.replace(/\s/g, '') )
        dateOut                 = new Date( dateOut.replace(/\s/g, '' ))

        let dateCreated = new Date()

        let param = {
            name,
            hotelId,
            email,
            roomId,
            phone,
            amount,
            guest,
            dateIn,
            dateOut,
            ic,
            dateCreated,
            remarks
        }
        try {
            await booking.insertOne(param)
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({msg: 'Booking Created'})
        }
        
    })


    app.put('/booking', async (req, res) =>{

        let data        = req.body
        let bookingId   = data.bookingId
        let hotelId     = data.hotelId
        let roomId      = data.roomId
        let name        = data.name
        let email       = data.email
        let phone       = data.phone
        let ic          = data.ic
        let guest       = data.guest
        let amount      = data.amount
        let dateIn      = data.dateIn
        let dateOut     = data.dateOut
        let remarks     = data.remarks

        hotelId                 = hotelId.replace(/\s/g, '');
        email                   = email.replace(/\s/g, '');
        roomId                  = roomId.replace(/\s/g, '');
        phone                   = phone.replace(/\s/g, '');
        ic                      = ic.replace(/\s/g, '');
        amount                  = amount.replace(/\s/g, '');
        guest                   = guest.replace(/\s/g, '');
        name                    = name.trim();
        dateIn                  = new Date( dateIn.replace(/\s/g, '') )
        dateOut                 = new Date( dateOut.replace(/\s/g, '' ))

        let dateUpdated = new Date()

        let param = {
            name,
            hotelId,
            email,
            roomId,
            phone,
            amount,
            guest,
            dateIn,
            dateOut,
            ic,
            dateUpdated,
            remarks
        }
        try {
            await booking.findOneAndUpdate({_id: ObjectId(bookingId)},
            {
                $set:param
            },
            {
              upsert: true
            })
        } catch (error) {
            res.status(400).send(error)
        } finally {
            res.json({msg: 'Booking Updated'})
        }
        
    })

})

app.use(express.static('public'))
app.use(bodyParser.json());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.listen(5000, function () {
    console.log('nodejs started')
})