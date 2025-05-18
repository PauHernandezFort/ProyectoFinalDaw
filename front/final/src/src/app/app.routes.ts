import { Routes } from '@angular/router';
import { RegisterViewComponent} from './view/register-view/register-view.component';
import { HomeViewComponent } from './view/home-view/home-view.component';
import { CrearAnuncioViewComponent } from './view/crear-anuncio-view/crear-anuncio-view.component';
import { PerfilViewComponent } from './view/perfil-view/perfil-view.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';

export const routes: Routes = [
{ path: '', redirectTo: 'register', pathMatch: 'full' },
{ path: 'register', component: RegisterViewComponent },
{ path: 'home', component: HomeViewComponent},
{ path: 'crearAnuncio', component: CrearAnuncioViewComponent},
{ path: 'perfil', component: PerfilViewComponent},
{path: 'chats', component: ChatContainerComponent }
];