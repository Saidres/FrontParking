import { Component, OnInit } from '@angular/core';
import { ParqueaderoService } from '../../parqueadero.service';
import { Parqueadero } from '../../models/parqueadero.model';

@Component({
  selector: 'app-parqueaderos',
  templateUrl: './parqueaderos.component.html',
  styleUrls: ['./parqueaderos.component.css']
})
export class ParqueaderosComponent implements OnInit {
  parqueaderos: Parqueadero[] = [];
  selectedParqueadero: Parqueadero | null = null;

  constructor(private parqueaderoService: ParqueaderoService) {}

  ngOnInit(): void {
    this.listarParqueaderos();
  }

  // Obtener la lista de parqueaderos
  listarParqueaderos() {
    this.parqueaderoService.getParqueaderos().subscribe(data => {
      this.parqueaderos = data;
    });
  }

  // Guardar un parqueadero (crear o editar)
  guardarParqueadero(parqueadero: Parqueadero) {
    if (parqueadero.id) {
      this.parqueaderoService.updateParqueadero(parqueadero.id, parqueadero).subscribe(() => {
        this.listarParqueaderos();
      });
    } else {
      this.parqueaderoService.createParqueadero(parqueadero).subscribe(() => {
        this.listarParqueaderos();
      });
    }
    this.selectedParqueadero = null; // Cierra el formulario
  }

  // Eliminar un parqueadero
  eliminarParqueadero(id: string) {
    this.parqueaderoService.deleteParqueadero(id).subscribe(() => {
      this.listarParqueaderos();
    });
  }

  // Seleccionar un parqueadero para editar
  seleccionarParqueadero(parqueadero: Parqueadero) {
    this.selectedParqueadero = { ...parqueadero };
  }

  // Limpiar el formulario
  cancelarEdicion() {
    this.selectedParqueadero = null;
  }
}
