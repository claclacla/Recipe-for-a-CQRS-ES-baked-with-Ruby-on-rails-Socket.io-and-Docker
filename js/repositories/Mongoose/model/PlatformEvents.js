const mongoose = require('mongoose');
const PlatformEventsSchema = require("../schema/PlatformEvents");

module.exports = mongoose.model('PlatformEvents', PlatformEventsSchema, 'platform_events');