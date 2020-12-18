
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Mood } from 'src/app/mood';
import { MoodService } from 'src/app/mood.service';
@Component({
  selector: 'app-mood-pie',
  templateUrl: './mood-pie.component.html',
  styleUrls: ['./mood-pie.component.css']
})
export class MoodPieComponent implements OnInit {
  private data = [
    {"Mood": "Gucci", "Count": "0"},
    {"Mood": "Okay", "Count": "0"},
    {"Mood": "Blah", "Count": "0"},
    {"Mood": "Ugh, terrible", "Count": "0"},
  ];
  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;
  private moods: Mood[];

  constructor(private moodService: MoodService) { this.moods = [] }

  //create framework of pie chart
  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }
  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map(d => d.Count.toString()))
    .range(["#3f51b5", "#FF4081", "#705a8f", "#F44336"]);
  }
  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.Count));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('text')
    .text((d: any) => d.data.Mood)
    .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  }
  countCheck(): void {
    this.data.forEach((moodType, index) => {
      if (moodType.Count === '0') {
        this.data.splice(index, 1);
      }
    })
  }
  ngOnInit(): void {
    this.moodService.getMood()
      .subscribe((moods: Mood[]) => {
        console.log(moods)
        moods.forEach(mood => {
          if (mood.mood === 'gucci') {
            const tempCount = Number(this.data[0].Count) + 1;
            console.log('gucci tempCount', tempCount)
            this.data[0].Count = tempCount.toString();
          } else if (mood.mood === 'okay') {
            const tempCount = Number(this.data[1].Count) + 1;
            this.data[1].Count = tempCount.toString();
          } else if (mood.mood === 'blah') {
            const tempCount = Number(this.data[2].Count) + 1;
            this.data[2].Count = tempCount.toString();
          } else if (mood.mood === 'Ugh, terrible') {
            const tempCount = Number(this.data[3].Count) + 1;
            this.data[3].Count = tempCount.toString();
          }
          console.log(this.data)
        })
        this.countCheck();
        this.createSvg();
        this.createColors();
        this.drawChart();
      },
      (error: ErrorEvent) => {}
    );
    
  }
}
