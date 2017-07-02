import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { RoomComponent } from './room/room.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'room', component: RoomComponent, canActivate: [AuthGuard] },
    { path: '', component: RoomComponent, canActivate: [AuthGuard] },
    // otherwise redirect to room
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);