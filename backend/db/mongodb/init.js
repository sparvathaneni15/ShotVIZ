// DB handle
const db = db.getSiblingDB('shotviz');

// Shots collection (semi-structured events)
db.createCollection("shots");