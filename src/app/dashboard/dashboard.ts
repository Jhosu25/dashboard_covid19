import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface ChartItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tag: string;
}

interface RenderChartItem extends ChartItem {
  safeUrl: SafeResourceUrl;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {

  readonly base = 'https://charts.mongodb.com/charts-taller_final-pvdtswx/embed/charts?id=';

  selectedFilter: string = 'all';
  searchTerm: string = '';
  visibleCharts: RenderChartItem[] = [];

  readonly chartsCatalog: ChartItem[] = [
    {
      id: 'c70eb502-7036-4a11-8165-b74784951bfd',
      title: 'Total de casos por continente',
      description: 'Vista comparativa por región para identificar la concentración de casos.',
      category: 'cases',
      tag: 'Continentes'
    },
    {
      id: '2120cc8b-5dc7-4967-a044-36bdf905a187',
      title: 'Evolución temporal de casos',
      description: 'Comportamiento mensual para revisar tendencia y variaciones.',
      category: 'cases',
      tag: 'Tendencia'
    },
    {
      id: '26db2ab3-bdb8-4f89-83f6-ba1eb32cf96a',
      title: 'Índice por continentes',
      description: 'Distribución general para lectura rápida del índice global.',
      category: 'cases',
      tag: 'Índice'
    },
    {
      id: '1bc295bd-8924-4ddc-8199-946d6873fde4',
      title: 'Índice de muerte por continentes',
      description: 'Comparativa mensual de mortalidad por continente.',
      category: 'deaths',
      tag: 'Fallecidos'
    },
    {
      id: 'd13e4139-e068-4d3f-9406-714526969251',
      title: 'Estadísticas por país',
      description: 'Resumen ordenado por país para análisis detallado.',
      category: 'countries',
      tag: 'Países'
    },
    {
      id: '708b8456-230c-48b9-996c-d484d80c46e8',
      title: 'Índice de fallecidos',
      description: 'Indicador hospitalario para seguimiento de fallecimientos.',
      category: 'deaths',
      tag: 'Hospitales'
    },
    {
      id: '803b8802-cc42-4c67-9066-ed0611c6d9bb',
      title: 'Tabla estadística de vacuna',
      description: 'Vista de vacunación por país para seguimiento del avance.',
      category: 'vaccines',
      tag: 'Vacunas'
    }
  ];

  readonly filters = [
    { key: 'all', label: 'Todos' },
    { key: 'cases', label: 'Casos' },
    { key: 'deaths', label: 'Fallecidos' },
    { key: 'countries', label: 'Países' },
    { key: 'vaccines', label: 'Vacunas' }
  ];

  constructor(private sanitizer: DomSanitizer) {
    this.updateCharts();
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.updateCharts();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.updateCharts();
  }

  clearSearch() {
    this.searchTerm = '';
    this.updateCharts();
  }

  private createChartUrl(id: string): SafeResourceUrl {
    const url = `${this.base}${id}&theme=light&autoRefresh=true`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  updateCharts() {
    const term = this.searchTerm.trim().toLowerCase();

    this.visibleCharts = this.chartsCatalog
      .filter((chart) => !!chart.id)
      .filter((chart) => this.selectedFilter === 'all' || chart.category === this.selectedFilter)
      .filter((chart) => {
        if (!term) return true;

        return [chart.title, chart.description, chart.category, chart.tag]
          .join(' ')
          .toLowerCase()
          .includes(term);
      })
      .map((chart) => ({
        ...chart,
        safeUrl: this.createChartUrl(chart.id)
      }));
  }
}
