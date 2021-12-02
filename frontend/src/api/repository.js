import axios from 'axios';

export class Repository {

    url = "localhost";

    //Not sure if we need a config for the api calls

    /**
     * Returns trainer name, email, city, and bio
     */
    getTrainer(trainerId) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${this.url}:8000/trainer/${trainerId}`)
                .then(x => resolve(x.data.data[0]))
                .catch(err => {
                    alert(err);
                    reject(err);
                })
        });
    }

    /**
     * Returns rating
     */
    getTrainerRating(trainerId) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${this.url}:8000/trainerRating?trainer_id=${trainerId}`)
                .then(x => resolve(x.data))
                .catch(err => {
                    alert(err);
                    reject(err);
                })
        });
    }

    /**
     * Returns a list of trainer certifications
     */
    getTrainerCertifications(trainerId) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${this.url}:8000/getTrainerCertifications?trainer_id=${trainerId}`)
                .then(x => resolve(x.data.data.map(cert => cert.amenity_name)))
                .catch(err => {
                    alert(err);
                    reject(err);
                })
        });
    }

    /**
     * The routes for this have not been impemented on the backend yet
     * 
     * 
     * This information could possibly just be returned with getTrainer
     */
    getBadges(trainerId) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${this.url}:8000/badges/${trainerId}`)
                .then(x => resolve(x.data))
                .catch(err => {
                    alert(err);
                    reject(err);
                })
        });
    }

    /**
     * Returns if a user has favorited a trainer
     * 
     * 
     * will probably be 1 if true 0 if false but no promises
     */
    getFavorite(userId, trainerId) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${this.url}:8000/favoriteTrainer/${userId}/${trainerId}`)
                .then(x => resolve(x.data))
                .catch(err => {
                    alert(err);
                    reject(err);
                })
        });
    }

    /**
     * should toggle a favorite on a trainer but I don't know how to make this function work as an api call
     * 
     * 
     * *see setFavorite*
     */
    toggleFavorite = (favorited, userId, trainerId) => {
        if (favorited) {
            axios.delete(`http://${this.url}:8000/favoriteTrainer/${userId}/${trainerId}`).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err)
            });
        } else {
            axios.post(`http://${this.url}:8000/favoriteTrainer`, {
                    "user_id": userId,
                    "trainer_id": trainerId
                 }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err)
            });
        }
        return favorited;
    }

    /**
     * Sets if a user has favorited a trainer
     * 
     * 
     * NEEDS TO BE IMPLIMENTED IN THE BACKEND
     * 
     * @param favorite true or false
     */
    setFavorite(userId, trainerId, favorite) {
        return new Promise((resolve, reject) => {
            //fav will be 1 or 0 because mySQL doesnt have a boolian data type
            let fav = favorite ? 1 : 0;
            axios.post(`http://${this.url}:8000/favoriteTrainer/${userId}/${trainerId}`, fav)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    /**
     * Creates a trainee Account
     */
    createTraineeAccount(userData) {
        return new Promise((resolve, reject) => {
            axios.post(`http://${this.url}:8000/createTraineeAccount`, userData, {headers: {'Content-Type': 'application/json'}})
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    /**
     * Creates a trainer Account
     */
    createTrainerAccount(userData) {
        return new Promise((resolve, reject) => {
            axios.post(`http://${this.url}:8000/createTrainerAccount`, userData, {headers: {'Content-Type': 'application/json'}})
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    addASession(newSession) {
        console.log(newSession);
        return new Promise((resolve, reject) => {
            axios.post(`http://${this.url}:8000/createAppointment`, newSession)
            .then(x => resolve(x.data))
            .catch(x => {
                console.log(x.response);
                alert(x);
                reject(x);
            })
        });
    }

    getSessionsForTrainer(trainerId) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${this.url}:8000/getTrainerAppointments`,{ params: {trainerId}})
            .then(x => resolve(x.data))
            .catch(x => {
                alert(x);
                reject(x);
            })
        });
    }

    getSessionsForTrainee(userId) {
        return new Promise((resolve, reject) => {
            axios.get(`htpp://${this.url}:8000/getTraineeAppointments/${userId}`)
            .then(x => resolve(x.data))
            .catch(x => {
                alert(x);
                reject(x);
            })
        });
    }
}