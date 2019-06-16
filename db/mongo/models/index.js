module.exports = function loadModels() {
    return {
        candidate: require('./candidate'),
        party: require('./party'),
        agenda: require('./agenda'),
        election: require('./election'),
        policy: require('./policy')
    }    
}