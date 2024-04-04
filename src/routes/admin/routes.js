const express = require('express');
const router = express.Router();
// Corrected the path for admin auth controllers based on the error message
const  register  = require('../../controllers/admin/auth/register');

const  login  = require('../../controllers/admin/auth/register');
const authenticateAdmin = require('../../middleware/authstatus');
const getAllActivities = require('../../controllers/admin/event/activities/getAllActivities');
const updateActivity = require('../../controllers/admin/event/activities/updateActivity');
const deleteActivity = require('../../controllers/admin/event/activities/deleteActivity');
const createEvent = require('../../controllers/admin/event/addEvent');
const updateEvent = require('../../controllers/admin/event/updateEvent');
const deleteEvent = require('../../controllers/admin/event/deleteEvent');
const getAllEvents = require('../../controllers/admin/event/getEvents');

// Admin login route
router.post('/login', login);

// Admin registration route
router.post('/register', register);

// Middleware to authenticate admin routes
router.use(authenticateAdmin);

// Admin event routes
router.post('/events', createEvent);
router.get('/events', getAllEvents);
router.put('/events/:eventId', updateEvent);
router.delete('/events/:eventId', deleteEvent);

// Admin activities routes
router.get('/events/:eventId/activities', getAllActivities);
router.put('/events/:eventId/activities/:activityId', updateActivity);
router.delete('/events/:eventId/activities/:activityId', deleteActivity);

module.exports = router;
