import { Component, OnInit } from '@angular/core';
import {FilmModel} from "../share/film.model";
import {Subscription} from "rxjs";
import {FilmService} from "../share/film.service";
import {DataStorageService} from "../share/data-storage.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddDialogComponent} from "./add-dialog/add-dialog.component";
import {DelFilmConfirmComponent} from "./del-film-confirm/del-film-confirm.component";
import {UpdFilmComponent} from "./upd-film/upd-film.component";

@Component({
  selector: 'app-quan-ly',
  templateUrl: './quan-ly.component.html',
  styleUrls: ['./quan-ly.component.css']
})
export class QuanLyComponent implements OnInit {

  quanlys : FilmModel[] = [];
  subscription: Subscription;
  id : number;
  constructor(private filmService : FilmService,
              private dataStorageService: DataStorageService,
              private matDialog: MatDialog) {

  }

  ngOnInit(): void {
    this.quanlys = this.filmService.getFilms('quanlys');
    if(this.quanlys.length == 0) {
      this.dataStorageService.fetchFilm('quanlys').subscribe();
      this.subscription = this.filmService.filmsChanged
        .subscribe(
          (films: FilmModel[]) => {
            this.quanlys = films
          }
        );
    }
  }

  onAdd(){
    const matDialogConf = new MatDialogConfig();
    matDialogConf.disableClose = true;
    matDialogConf.autoFocus = true;
    const dialogRef = this.matDialog.open(AddDialogComponent, matDialogConf);
    dialogRef.afterClosed().subscribe(() => { this.getAllRecords() } );
  }

  onDel(id: number){
    const matDialogConf = new MatDialogConfig();
    matDialogConf.disableClose = true;
    matDialogConf.autoFocus = true;
    matDialogConf.data = {index: id}
    const dialogRef = this.matDialog.open(DelFilmConfirmComponent, matDialogConf);

    dialogRef.afterClosed().subscribe(() => { this.getAllRecords() } );

  }

  onUpdate(id: number){
    const matDialogConf = new MatDialogConfig();
    matDialogConf.disableClose = true;
    matDialogConf.autoFocus = true;
    matDialogConf.data = {index: id}
    const dialogRef = this.matDialog.open(UpdFilmComponent, matDialogConf);
    dialogRef.afterClosed().subscribe(() => { this.getAllRecords() } );
  }

  getAllRecords(){
    this.quanlys = this.filmService.getFilms("quanlys");
  }


}
