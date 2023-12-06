import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans-section',
  templateUrl: './plans-section.component.html',
  styleUrls: ['./plans-section.component.css'],
})
export class PlansSectionComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
  isMonthly: boolean = true;
  prices: { monthly: string; yearly: string; displayPrice: string }[] = [
    { monthly: '15$', yearly: '130$', displayPrice: '' },
    { monthly: '30$', yearly: '250$', displayPrice: '' },
    { monthly: '50$', yearly: '420$', displayPrice: '' },
  ];
  savings: string[] = ['', '', ''];

  ngOnInit() {
    const savedFrequency = localStorage.getItem('billingFrequency');
    this.isMonthly = savedFrequency === 'monthly';
    this.updatePrices();
  }

  toggleSubscription() {
    this.isMonthly = !this.isMonthly;
    this.updatePrices();
    localStorage.setItem(
      'billingFrequency',
      this.isMonthly ? 'monthly' : 'yearly'
    );
  }

  updatePrices() {
    for (let i = 0; i < this.prices.length; i++) {
      const monthlyPrice = parseFloat(this.prices[i].monthly.replace('$', ''));
      const yearlyPrice = parseFloat(this.prices[i].yearly.replace('$', ''));

      if (this.isMonthly) {
        this.prices[i].displayPrice = this.prices[i].monthly;
      } else {
        this.prices[i].displayPrice = this.prices[i].yearly;
      }
    }

    if (this.isMonthly) {
      this.savings = ['', '', ''];
    } else {
      for (let i = 0; i < this.prices.length; i++) {
        const monthlyPrice = parseFloat(
          this.prices[i].monthly.replace('$', '')
        );
        const yearlyPrice = parseFloat(this.prices[i].yearly.replace('$', ''));

        const monthlyCost = monthlyPrice * 12;
        const yearlyCost = yearlyPrice;

        const savings = monthlyCost - yearlyCost;
        this.savings[i] = savings.toFixed(2);
      }
    }
  }
}
