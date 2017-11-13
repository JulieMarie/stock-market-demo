import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: MainComponent,
        children: [
            {
                component: DashboardComponent,
                path: '',
            },
            {
                path: 'form',
                component: FormComponent
            },
            { path: '', loadChildren: './news/news.module#NewsModule' }
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }
export const routedComponents: any[] = [
    MainComponent, 
    LoginComponent,
    DashboardComponent,
    FormComponent
];
