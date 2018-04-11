import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

  //cái này để hiển thị từng câu hỏi
  cauhoi: number;

  //trước mắt lấy mã câu hỏi từ chung 1 bảng của bảng dapan
  maCauHoi = new Array();

  //lấy từ server về
  tatCaDapAn = new Array();

  //mảng chưa các đáp án của 1 câu hỏi
  dapAnTheoMoiCau = new Array();

  tongThoiGian: number = 0;
  thoiGianBatDau: number = 0;
  thoiGianKetThuc: number = 0;



  constructor(private quizService: QuizService, private cookieService: CookieService) { }

  getDapAn() {
    this.radioSelected = {
      ma: 0,
      noidung: '',
      dung: false,
      maCauhoi: 0
    }
    this.dapAnTheoMoiCau = [];
    for (let j = 0; j < this.tatCaDapAn.length; j++) {
      if (this.tatCaDapAn[j].maCauhoi === this.cauhoi) {
        this.dapAnTheoMoiCau.push(this.tatCaDapAn[j]);
      }
    }
    this.indexCauhoi++;
  }

  getAllQuiz() {
    this.quizService.getQuiz()
      .subscribe(data => {
        this.tatCaDapAn = data;

        // for (let i = 0; i < this.tatCaDapAn.length; i++) {
        //   this.tatCaDapAn[i].dung = true;
        //   this.quizService.updateQuiz(i, this.tatCaDapAn[i])
        //     .subscribe(() => console.log('ok'));
        // }
        // add mã câu hỏi
        for (let i = 0; i < this.tatCaDapAn.length; i++) {
          if (!this.maCauHoi.includes(this.tatCaDapAn[i].maCauhoi)) {
            this.maCauHoi.push(this.tatCaDapAn[i].maCauhoi);
          }
        }
        this.cauhoi = this.maCauHoi[0];
        //add đáp án
        this.getDapAn();

        setInterval(() => {
          this.tongThoiGian++;
        }, 1000);
      });
  }
  radioSelected = {
    ma: 0,
    noidung: '',
    dung: false,
    maCauhoi: 0
  }

  indexCauhoi: number = 0;

  //property object 
  ma = 0;
  dung = false;
  thoiGian = 0;

  traLois = new Array();
  resultC = '';

  nextQuiz(soluongcauhoi: number) {
    //alert(this.maCauHoi);
    this.thoiGianBatDau = this.thoiGianKetThuc
    this.thoiGianKetThuc = this.tongThoiGian;

    //console.log(this.radioSelected);
    //set obj
    this.ma = this.cauhoi;
    this.dung = this.radioSelected.dung;
    this.thoiGian = this.tongThoiGian - this.thoiGianBatDau;

    this.cauhoi = this.maCauHoi[this.indexCauhoi];
    this.getDapAn();

    this.traLois.push(new Object({ maCauhoi: this.ma, dung: this.dung, thoiGian: this.thoiGian }));

    if (this.traLois.length == soluongcauhoi - 1) {
      this.resultC = '/result';
      //hoặc sử dụng router.navigateByUrl('path defined in route config')
    }


    if (this.traLois.length === soluongcauhoi) {
      let setCookie: [number, string] = [this.tongThoiGian, JSON.stringify(this.traLois)];
      this.cookieService.set('result', JSON.stringify(setCookie), Date.now() + 86400000);
    }
  }

  ngOnInit() {
    this.getAllQuiz();
  }
}
