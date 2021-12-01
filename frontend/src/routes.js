import { CreateAccountForm } from "./CreateAccount/CreateAccount";
import { Dashboard } from "./Dashboard/Dashboard";
import DefaultApp from "./defaultApp/defaultApp";
import { KendoCalendarTrainee } from "./BookingSessions/KendoCalendarTrainee";
import { KendoCalendarTrainer } from "./BookingSessions/KendoCalendarTrainer";
import { TrainerPage } from "./TrainerPage/TrainerPage"
import { TrainerProfile } from "./TrainerProfilePage/TrainerProfilePage";
import Trainers from "./Trainers/Trainers";

export const ROUTES = [
    { path: '/', exact: true, component: Dashboard },
    { path: '/trainers', component: Trainers },
    { path: '/trainer/:trainerId', component: TrainerProfile },
    { path: '/trainerOld/:trainerId', component: TrainerPage },
    { path: '/sign-up', component: CreateAccountForm },
    //Change this to a sign in component when it is made
    { path: '/sign-in', component: CreateAccountForm },
    //Change this to a contact us component later
    { path: '/contact-us', component: DefaultApp },
    { path: '/default-app', component: DefaultApp },
    { path: '/sessions/:trainerId', component: KendoCalendarTrainer },
    { path: '/sessions', component: KendoCalendarTrainee }
];