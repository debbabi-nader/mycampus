import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Slides } from 'ionic-angular';

import { Chart } from 'chart.js';

import { FeedbackModalComponent } from './../../../components/feedback-modal/feedback-modal.component';
import { EventDetailsModalComponent } from './../../../components/event-details-modal/event-details-modal.component';


@IonicPage()
@Component({
    selector: 'page-past-events',
    templateUrl: 'past-events.html',
})
export class PastEventsPage implements OnInit {

    @ViewChild('statSlider') statSlider: Slides;

    rateChart = [];
    attendeesChart = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController
    ) { }

    ngOnInit() {
        
    }

    ionViewDidLoad() {
        let rateChartCanvas = <HTMLCanvasElement>document.getElementById('rate-chart');
        let rateChartCanvasCtx = rateChartCanvas.getContext('2d');

        var gradientFill = rateChartCanvasCtx.createLinearGradient(0, 0, 0, 150);
        gradientFill.addColorStop(0, "rgba(255, 171, 0, 0.6)");
        gradientFill.addColorStop(1, "rgba(255, 171, 0, 0)");

        this.rateChart = new Chart(rateChartCanvasCtx, {
            type: 'line',
            data: {
                labels: ["", "", "", "", ""],
                datasets: [
                    {
                        data: [4.6, 2.8, 3.1, 4.8, 3.8],
                        borderColor: '#FFAB00',
                        borderWidth: 3,
                        pointRadius: 3,
                        fill: true,
                        backgroundColor: gradientFill,
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            maxTicksLimit: 5,
                            max: 5,
                            min: 0,
                            stepSize: 1,
                            beginAtZero: true,
                            fontColor: "#FFFFFF",
                            fontStyle: "bold",
                            padding: 10
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false
                        }

                    }],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            fontColor: "#FFFFFF",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        });

        let attendeesChartCanvas = <HTMLCanvasElement>document.getElementById('attendee-chart');
        let attendeesChartCanvasCtx = attendeesChartCanvas.getContext('2d');

        this.attendeesChart = new Chart(attendeesChartCanvasCtx, {
            type: 'line',
            data: {
                labels: ["", "", "", "", ""],
                datasets: [
                    {
                        data: [46, 74, 59, 38, 82],
                        borderColor: '#FFAB00',
                        borderWidth: 3,
                        pointRadius: 3,
                        fill: true,
                        backgroundColor: gradientFill,
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            maxTicksLimit: 5,
                            beginAtZero: true,
                            fontColor: "#FFFFFF",
                            fontStyle: "bold",
                            padding: 10
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false
                        }

                    }],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            fontColor: "#FFFFFF",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        });
    }

    presentFeedbackModal(event: any) {
        event.stopPropagation();
        let feedbackModal = this.modalCtrl.create(FeedbackModalComponent,  { userId: 8675309 });
        feedbackModal.present();
    }

    presentDetailsModal() {
        let detailsModal = this.modalCtrl.create(EventDetailsModalComponent);
        detailsModal.present();
    }

}
