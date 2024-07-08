import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit, AfterViewInit {
  monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  currentDate: Date = new Date();
  currentDay = this.currentDate.getDate();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();

  @ViewChild('dates', { static: true }) dates!: ElementRef<HTMLDivElement>;
  @ViewChild('month', { static: true }) month!: ElementRef;
  @ViewChild('year', { static: true }) year!: ElementRef;
  @ViewChild('prevMonth', { static: true }) preMonthDoom!: ElementRef;
  @ViewChild('nextMonth', { static: true }) nextMonthDoom!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.month.nativeElement.textContent = this.monthNames[this.currentMonth];
    this.year.nativeElement.textContent = this.currentYear;
  }

  ngAfterViewInit(): void {
    this.writeMonth(this.currentMonth);
  }

  writeMonth(month: number) {
    this.dates.nativeElement.innerHTML = '';
    for (let i = this.startDay(); i > 0; i--) {
      const dateElement = document.createElement('div');
      dateElement.classList.add('calendar_date', 'calendar_item');
      dateElement.style.color = 'red';
      dateElement.style.textAlign = 'center';
      dateElement.style.lineHeight = '2';
      const valueLastDays = (
        this.getTotalDays(this.currentMonth - 1) -
        (i - 1)
      ).toString();
      dateElement.textContent = valueLastDays;
      this.dates.nativeElement.appendChild(dateElement);
    }

    for (let i = 1; i <= this.getTotalDays(month); i++) {
      const dateElement = document.createElement('div');
      if (i === this.currentDay) {
        dateElement.classList.add('calendar_date', 'calendar_item', 'today');
        dateElement.style.background = 'black';
        dateElement.style.color = 'white';
        dateElement.style.width = '50%';
        dateElement.style.borderRadius = '50%';
        dateElement.style.margin = 'auto';
      } else {
        dateElement.classList.add('calendar_date', 'calendar_item');
      }
      dateElement.textContent = i.toString();
      dateElement.style.textAlign = 'center';
      dateElement.style.lineHeight = '2';
      this.dates.nativeElement.appendChild(dateElement);
    }
  }

  getTotalDays(month: number): number {
    if (month === -1) month = 11;
    if (
      month === 0 ||
      month === 2 ||
      month === 4 ||
      month === 6 ||
      month === 7 ||
      month === 9 ||
      month === 11
    ) {
      return 31;
    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    } else {
      return this.isLeapYear() ? 29 : 28;
    }
  }

  isLeapYear(): boolean {
    return (
      (this.currentYear % 4 === 0 && this.currentYear % 100 !== 0) ||
      this.currentYear % 400 === 0
    );
  }

  startDay(): number {
    const start = new Date(this.currentYear, this.currentMonth, 1);
    return start.getDate() - 1 === -1 ? 6 : start.getDay() - 1;
  }

  lastMonthChange() {
    if (this.currentMonth !== 0) {
      this.currentMonth--;
    } else {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.setNewDate();
  }

  nextMonthChange() {
    if (this.currentMonth !== 11) {
      this.currentMonth++;
    } else {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.setNewDate();
  }

  setNewDate() {
    this.currentDate.setFullYear(
      this.currentYear,
      this.currentMonth,
      this.currentDay
    );
    this.month.nativeElement.textContent = this.monthNames[this.currentMonth];
    this.year.nativeElement.textContent = this.currentYear;
    this.writeMonth(this.currentMonth);
  }
}
