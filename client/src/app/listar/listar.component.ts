import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let url = 'http://localhost:3000/app/listpessoa';

       fetch(url)
         .then(res => res.json())
         .then((out) => {
           this.read(out)
         })
         .catch(err => console.error(err))
  }
  read(out){
    let table = document.getElementById("table")
    let tableBody = document.createElement('tbody')
    for (let i = 0; i < out.length; i++) {
        let results = out[i]
        let row = document.createElement("tr")

        for (let j = 0; j < 6; j++) {
            let cell = document.createElement("td")
            let txt;
            if (j === 0) {
                txt = document.createTextNode(results["id"])
                cell.appendChild(txt)
                row.appendChild(cell)
            } else if (j === 1) {
                txt = document.createTextNode(results["nome"])
                cell.appendChild(txt)
                row.appendChild(cell)
            } else if (j === 2) {
                txt = document.createTextNode(results["sobrenome"])
                cell.appendChild(txt)
                row.appendChild(cell)
            } else if (j === 3){
                txt = document.createTextNode(results["sexo"])
                cell.appendChild(txt)
                row.appendChild(cell)
            }else if(j === 4){
              txt = document.createTextNode(results["telefone"])
              cell.appendChild(txt)
              row.appendChild(cell)
            }else{
              txt = document.createTextNode(results["endereco"])
              cell.appendChild(txt)
              row.appendChild(cell)
            }
        }
        tableBody.appendChild(row)
        tableBody.setAttribute("id","tbody")
    }
    table.appendChild(tableBody)
  }

}
