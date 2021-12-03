import { CreateAccountForm } from "./CreateAccount/CreateAccount";
import { Dashboard } from "./Dashboard/Dashboard";
import { KendoCalendarTrainee } from "./BookingSessions/KendoCalendarTrainee";
import { KendoCalendarTrainer } from "./BookingSessions/KendoCalendarTrainer";
import { SignInPage } from "./SignIn/signIn";
import { TrainerPage } from "./TrainerPage/TrainerPage"
import { TrainerProfile } from "./TrainerProfilePage/TrainerProfilePage";
import Trainers from "./Trainers/Trainers";

export const ROUTES = [
    { path: '/', exact: true, component: SignInPage },
    { path: '/trainers', component: Trainers },
    { path: '/trainer/:trainerId', component: TrainerProfile },
    { path: '/trainerOld/:trainerId', component: TrainerPage },
    { path: '/sign-up', component: CreateAccountForm },
    //Change this to a sign in component when it is made
    { path: '/dashboard', component: Dashboard },
    //Change this to a contact us component later
    { path: '/sessions', exact: true, component: KendoCalendarTrainer },
    { path: '/sessions/:trainerId', component: KendoCalendarTrainee }
];