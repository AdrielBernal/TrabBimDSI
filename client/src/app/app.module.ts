import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListarComponent } from './listar/listar.component';
import { DeletarComponent } from './deletar/deletar.component';
import { AtualizarComponent } from './atualizar/atualizar.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    ListarComponent,
    DeletarComponent,
    AtualizarComponent
  ],
  imports: [
    BrowserModule,
     ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
