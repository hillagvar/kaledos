import { Routes } from '@angular/router';
import { ListOfPresentsComponent } from './components/list-of-presents/list-of-presents.component';
import { AddNewPresentComponent } from './components/add-new-present/add-new-present.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

export const routes: Routes = [
    {path: "list", component: ListOfPresentsComponent},
    {path: "addnew", component: AddNewPresentComponent},
    {path: "edit/:id", component: EditProductComponent},
];
