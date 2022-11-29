import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CustomTranslateService } from '../shared/services/custom-translate.service';

@Component({
  selector: 'app-definitions',
  templateUrl: './definitions.page.html',
  styleUrls: ['./definitions.page.scss'],
})
export class DefinicoesPage implements OnInit {
  language: string = this.customTranslateService.currentLang.value;

  constructor(
    private customTranslateService: CustomTranslateService,
    private router: Router,
    private nativeStorage: NativeStorage
  ) {}

  ngOnInit() {}

  changeLanguage() {
    localStorage.setItem('old-lang', localStorage.getItem('lang')); // GUARDA O IDIOMA ANTERIOR
    localStorage.setItem('lang', this.language);
    this.customTranslateService.currentLang.next(this.language);
  }
}
